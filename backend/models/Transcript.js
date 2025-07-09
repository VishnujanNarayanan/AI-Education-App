const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Transcript', transcriptSchema);
