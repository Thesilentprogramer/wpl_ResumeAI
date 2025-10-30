const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, default: null },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: null },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


