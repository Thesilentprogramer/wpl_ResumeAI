const express = require('express');
const router = express.Router();
const { exportAnalysis } = require('../controllers/exportController');

router.get('/analysis/:resumeId', exportAnalysis);

module.exports = router;

