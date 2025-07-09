const express = require('express');
const router = express.Router();
const Concept = require('../models/Concept');

// GET /api/concepts - Get all concepts
router.get('/', async (req, res) => {
  try {
    const concepts = await Concept.find();
    res.json(concepts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
