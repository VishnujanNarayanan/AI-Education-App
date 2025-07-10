const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  content: String,
});

module.exports = mongoose.model('Transcript', transcriptSchema);
