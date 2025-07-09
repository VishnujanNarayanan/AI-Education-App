const Video = require('../models/Video');

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getVideos };
