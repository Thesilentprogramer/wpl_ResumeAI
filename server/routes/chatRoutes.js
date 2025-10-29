const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chatController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, sendMessage);

module.exports = router;

