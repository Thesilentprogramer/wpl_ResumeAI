const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParser = require('../utils/pdfParser');
const geminiClient = require('../utils/geminiClient');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

const uploadResume = async (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const filePath = req.file.path;
      const fileName = req.file.originalname;
      let resumeText = '';

      if (req.file.mimetype === 'application/pdf') {
        const pdfBuffer = fs.readFileSync(filePath);
        resumeText = await pdfParser.parsePDF(pdfBuffer);
      } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        resumeText = await pdfParser.parseDOCX(filePath);
      } else {
        resumeText = await pdfParser.readTextFile(filePath);
      }

      if (!resumeText || resumeText.trim().length < 50) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Could not extract text from resume' });
      }

      // Analyze resume with Gemini AI
      const analysis = await geminiClient.analyzeResume(resumeText);

      // Try to save to database (with fallback if connection fails)
      try {
        const resume = await Resume.create({
          fileName: fileName,
          fileSize: req.file.size,
          status: 'analyzing'
        });

        await Analysis.create({
          resumeId: resume._id,
          summary: analysis.summary,
          skills: analysis.skills || [],
          atsScore: analysis.atsScore,
          missingKeywords: analysis.missingKeywords || [],
          suggestions: analysis.suggestions || [],
          strengths: analysis.strengths || [],
          weaknesses: analysis.weaknesses || [],
          rawResponse: analysis
        });

        resume.status = 'completed';
        await resume.save();
      } catch (dbError) {
        console.warn('⚠️  Database save failed, continuing without persistence');
      }

      fs.unlinkSync(filePath);

      res.json({
        success: true,
        data: analysis,
        fileName: fileName,
        resumeId: null, // Will be null in fallback mode
        resumeText: resumeText, // Add the raw resume text for chat
        message: 'Resume analyzed successfully'
      });
    } catch (error) {
      console.error('Error processing resume:', error);
      
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({ error: 'Failed to process resume: ' + error.message });
    }
  });
};

module.exports = { uploadResume };

