const { Types } = require('mongoose');
const Video = require('../models/Video'); // ✅ Make sure this path is correct

// 🧠 Get a video by its ID
const getVideoById = async (req, res) => {
  const id = req.params.id;
  console.log("🎯 API hit: /api/videos/:id =", id);

  if (!Types.ObjectId.isValid(id)) {
    console.log("❌ Invalid ObjectId format");
    return res.status(400).json({ error: 'Invalid ObjectId format' });
  }

  try {
    const objectId = new Types.ObjectId(id);
    const video = await Video.findById(objectId);

    if (!video) {
      console.log("❌ Video not found");
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json(video);
  } catch (err) {
    console.error("❌ Server error:", err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// 🧠 Dummy list for now — replace with real DB query if needed
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error("❌ Error fetching videos:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Export both
module.exports = {
  getVideoById,
  getVideos,
};
