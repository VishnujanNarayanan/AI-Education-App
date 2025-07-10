const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  subject: String,
  // add thumbnail, duration later if needed
});

module.exports = mongoose.model('Video', videoSchema);
