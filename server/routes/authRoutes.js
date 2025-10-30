const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, me } = require('../controllers/authController');
const { googleCallback, logout } = require('../controllers/oauthController');
const requireAuth = require('../middleware/requireAuth');

// Local auth routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', requireAuth, me);
router.post('/logout', logout);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=oauth_failed' }),
  googleCallback
);

module.exports = router;


