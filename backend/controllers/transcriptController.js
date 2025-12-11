// controllers/transcriptController.js
const Transcript = require('../models/Transcript');
const Video = require('../models/Video');
const fetchTranscriptFromYouTube = require('../utils/fetchTranscript');

const fetchTranscript = async (req, res) => {
  try {
    let { videoId } = req.body;
    if (!videoId) {
      console.warn('⚠️ No videoId in request body');
      return res.status(400).json({ error: 'Missing videoId in request body' });
    }

    videoId = videoId.trim();

    const video = await Video.findById(videoId);
    if (!video) {
      console.warn(`❌ Video not found in DB for ID: ${videoId}`);
      return res.status(404).json({ error: 'Video not found in database' });
    }

    console.log(`🎬 Found video in DB: "${video.title}"`);
    const transcriptText = await fetchTranscriptFromYouTube(video.url);

    if (!transcriptText) {
      console.warn('📭 Transcript text is null or empty');
      return res.status(404).json({ error: 'Transcript unavailable' });
    }

    const saved = await Transcript.create({
      videoId: video._id,
      content: transcriptText,
    });

    console.log(`✅ Transcript saved: ${saved._id}`);
    return res.status(201).json({ message: 'Transcript saved', transcript: saved });

  } catch (err) {
    console.error('💥 ERROR in fetchTranscript:', err);
    return res.status(500).json({ error: 'Server error', message: err.message, stack: err.stack });
  }
};

const getTranscriptByVideoId = async (req, res) => {
  try {
    const videoId = req.params.videoId.trim();
    const transcript = await Transcript.findOne({ videoId });
    if (!transcript) return res.status(404).json({ error: 'Transcript not found' });
    res.json(transcript);
  } catch (err) {
    console.error('💥 ERROR in getTranscriptByVideoId:', err);
    res.status(500).json({ error: 'Server error', message: err.message, stack: err.stack });
  }
};

module.exports = {
  fetchTranscript,
  getTranscriptByVideoId,
};
