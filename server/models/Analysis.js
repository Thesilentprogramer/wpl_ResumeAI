const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  summary: String,
  skills: [String],
  atsScore: Number,
  missingKeywords: [String],
  suggestions: [String],
  strengths: [String],
  weaknesses: [String],
  analyzedAt: { type: Date, default: Date.now },
  rawResponse: Object
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);

