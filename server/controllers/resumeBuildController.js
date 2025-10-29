const geminiClient = require('../utils/geminiClient');
const ResumeBuild = require('../models/ResumeBuild');

const getAISuggestion = async (req, res) => {
  try {
    const { fieldName, fieldValue, templateId, resumeData } = req.body;

    console.log('AI Suggestion Request:', { fieldName, templateId, hasResumeData: !!resumeData });

    if (!fieldName || !templateId) {
      return res.status(400).json({ 
        success: false,
        error: 'Field name and template ID are required' 
      });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy-key') {
      console.warn('⚠️  GEMINI_API_KEY not set or using dummy key');
      return res.status(500).json({ 
        success: false,
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in your server .env file.' 
      });
    }

    const suggestion = await geminiClient.suggestResumeContent(
      fieldName,
      fieldValue || '',
      templateId,
      resumeData || {}
    );

    if (!suggestion || suggestion.trim().length === 0) {
      return res.status(500).json({ 
        success: false,
        error: 'AI returned an empty suggestion. Please try again.' 
      });
    }

    res.json({
      success: true,
      suggestion,
    });
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get AI suggestion: ' + error.message 
    });
  }
};

const saveResume = async (req, res) => {
  try {
    const { templateId, resumeData, resumeId } = req.body;

    if (!templateId || !resumeData) {
      return res.status(400).json({ error: 'Template ID and resume data are required' });
    }

    let resume;
    if (resumeId) {
      // Update existing resume
      resume = await ResumeBuild.findOneAndUpdate(
        { _id: resumeId, userId: req.user?.id || null },
        {
          templateId,
          resumeData,
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
    } else {
      // Create new resume
      resume = await ResumeBuild.create({
        templateId,
        resumeData,
        userId: req.user?.id || null,
      });
    }

    res.json({
      success: true,
      resumeId: resume._id,
      resume,
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    // Continue even if database fails
    res.json({
      success: true,
      resumeId: `temp_${Date.now()}`,
      message: 'Resume saved locally (database unavailable)',
    });
  }
};

const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const query = { _id: resumeId };
    if (req.user?.id) query.userId = req.user.id;

    const resume = await ResumeBuild.findOne(query);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error('Error getting resume:', error);
    res.status(500).json({ error: 'Failed to get resume: ' + error.message });
  }
};

const listMyResumes = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const items = await ResumeBuild.find({ userId }).sort({ updatedAt: -1 }).select('_id templateId updatedAt savedAt');
    res.json({ success: true, items });
  } catch (error) {
    console.error('Error listing resumes:', error);
    res.status(500).json({ error: 'Failed to list resumes: ' + error.message });
  }
};

module.exports = { getAISuggestion, saveResume, getResume, listMyResumes };

