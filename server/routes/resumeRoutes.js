const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/resumeController');
const { getAISuggestion, saveResume, getResume, listMyResumes } = require('../controllers/resumeBuildController');
const { downloadResumePDF, downloadResumePNG } = require('../controllers/resumeDownloadController');
const requireAuth = require('../middleware/requireAuth');

router.post('/upload', requireAuth, uploadResume);
router.post('/ai-suggest', requireAuth, getAISuggestion);
router.post('/save', requireAuth, saveResume);
router.get('/list/my', requireAuth, listMyResumes);
router.get('/:resumeId', requireAuth, getResume);
router.post('/download/pdf', downloadResumePDF);
router.post('/download/png', downloadResumePNG);

module.exports = router;

