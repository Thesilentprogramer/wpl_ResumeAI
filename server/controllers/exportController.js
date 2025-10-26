const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');

const exportAnalysis = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const analysis = await Analysis.findOne({ resumeId });
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      data: {
        fileName: resume.fileName,
        uploadedAt: resume.uploadedAt,
        analysis: {
          summary: analysis.summary,
          atsScore: analysis.atsScore,
          skills: analysis.skills,
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          missingKeywords: analysis.missingKeywords,
          suggestions: analysis.suggestions
        }
      }
    });
  } catch (error) {
    console.error('Error exporting analysis:', error);
    res.status(500).json({ error: 'Failed to export analysis' });
  }
};

module.exports = { exportAnalysis };

