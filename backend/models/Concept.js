const mongoose = require('mongoose');

const conceptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Concept', conceptSchema);
