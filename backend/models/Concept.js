// backend/models/Concept.js
const mongoose = require('mongoose');

const conceptSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subject: String,
  description: String,
  chapter: String,    // optional but useful for NCERT mapping
  section: String,
  page: Number
}, { timestamps: true });

module.exports = mongoose.model('Concept', conceptSchema);
