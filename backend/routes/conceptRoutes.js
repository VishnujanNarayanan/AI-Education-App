const express = require('express');
const router = express.Router();

const { getConceptsByVideoId } = require('../controllers/conceptController');

router.get('/:videoId', getConceptsByVideoId);

module.exports = router;
