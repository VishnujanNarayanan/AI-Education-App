// routes/transcriptRoutes.js
const express = require('express');
const router = express.Router();

const {
  fetchTranscript,
  getTranscriptByVideoId,
} = require('../controllers/transcriptController');

router.get('/:videoId', getTranscriptByVideoId);
router.post('/fetch', fetchTranscript);

module.exports = router;
