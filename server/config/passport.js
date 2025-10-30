const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Initialize GoogleStrategy only if credentials are available
const initializeGoogleStrategy = () => {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
              user = await User.findOne({ email: profile.emails[0].value });

              if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.provider = 'google';
                user.avatar = profile.photos[0]?.value || null;
                await user.save();
              } else {
                // Create new user
                user = await User.create({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  googleId: profile.id,
                  avatar: profile.photos[0]?.value || null,
                  provider: 'google',
                });
              }
            }

            return done(null, {
              id: profile.id,
              displayName: user.name,
              emails: [{ value: user.email }],
              photos: [{ value: user.avatar }],
              _id: user._id,
            });
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  } else {
    console.warn('⚠️  Google OAuth credentials not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file.');
  }
};

initializeGoogleStrategy();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
