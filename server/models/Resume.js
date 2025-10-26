const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileSize: Number,
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['uploaded', 'analyzing', 'completed', 'failed'], default: 'uploaded' }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);

