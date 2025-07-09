const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  subject: String
});

module.exports = mongoose.model('Video', videoSchema);
