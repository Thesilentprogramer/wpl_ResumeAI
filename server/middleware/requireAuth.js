const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const user = await User.findById(payload.id).select('_id email name');
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = { id: user._id.toString(), email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


