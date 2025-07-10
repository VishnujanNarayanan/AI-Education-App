const express = require('express');
const router = express.Router();

const { getTranscriptByVideoId } = require('../controllers/transcriptController');

router.get('/:videoId', getTranscriptByVideoId);

module.exports = router;
