const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const videoRoutes = require('./routes/videoRoutes');
app.use('/api/videos', videoRoutes);

const conceptRoutes = require('./routes/conceptRoutes');
app.use('/api/concepts', conceptRoutes);

const transcriptRoutes = require('./routes/transcriptRoutes');
app.use('/api/transcripts', transcriptRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 API Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});