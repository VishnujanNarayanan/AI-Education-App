const Transcript = require('../models/Transcript');

const getTranscriptByVideoId = async (req, res) => {
  const transcript = await Transcript.findOne({ videoId: req.params.videoId }).populate('videoId');
  if (!transcript) return res.status(404).json({ error: 'Transcript not found' });
  res.json(transcript);
};

module.exports = { getTranscriptByVideoId };
