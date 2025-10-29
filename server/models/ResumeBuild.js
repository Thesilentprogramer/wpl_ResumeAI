const mongoose = require('mongoose');

const ResumeBuildSchema = new mongoose.Schema({
  templateId: {
    type: String,
    required: true,
  },
  resumeData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  userId: {
    type: String,
    default: null,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.ResumeBuild || mongoose.model('ResumeBuild', ResumeBuildSchema);

