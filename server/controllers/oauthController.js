const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d',
  });
};

// Google OAuth callback
const googleCallback = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const avatar = photos[0]?.value || null;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        googleId: id,
        avatar,
        provider: 'google',
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = id;
      user.provider = 'google';
      user.avatar = avatar;
      await user.save();
    }

    const token = signToken(user);

    // Redirect to frontend with token
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(
      `${frontendUrl}/auth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user._id, name: user.name, email: user.email }))}`
    );
  } catch (error) {
    console.error('Google OAuth error:', error);
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
};

// Logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out' });
  });
};

module.exports = { googleCallback, logout };
