const express = require('express');
const router = express.Router();
const { exportAnalysis } = require('../controllers/exportController');

router.post('/analysis', exportAnalysis);

module.exports = router;

