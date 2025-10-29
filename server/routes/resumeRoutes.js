const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/resumeController');
const { getAISuggestion, saveResume, getResume } = require('../controllers/resumeBuildController');
const { downloadResumePDF, downloadResumePNG } = require('../controllers/resumeDownloadController');

router.post('/upload', uploadResume);
router.post('/ai-suggest', getAISuggestion);
router.post('/save', saveResume);
router.get('/:resumeId', getResume);
router.post('/download/pdf', downloadResumePDF);
router.post('/download/png', downloadResumePNG);

module.exports = router;

