// controllers/conceptController.js
const Concept = require('../models/Concept');
const mongoose = require('mongoose');

const getConceptsByVideoId = async (req, res) => {
  try {
    const videoId = new mongoose.Types.ObjectId(req.params.videoId);
    const concepts = await Concept.find({ videoId });

    if (!concepts.length) {
      return res.status(404).json({ error: 'Concepts not found' });
    }

    res.json(concepts);
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getConceptsByVideoId };
