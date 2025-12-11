const { YoutubeTranscript } = require('youtube-transcript');

function parseYouTubeId(url) {
  const idMatch =
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/);

  return idMatch ? idMatch[1] : null;
}

async function fetchTranscript(url) {
  const ytId = parseYouTubeId(url);
  if (!ytId) {
    console.error('❌ Invalid YouTube URL:', url);
    return null;
  }

  try {
    console.log(`🌐 Trying to fetch English transcript for ID: ${ytId}`);
    const chunks = await YoutubeTranscript.fetchTranscript(ytId, { lang: 'en' });

    const text = chunks.map(c => c.text).join(' ').trim();
    return text.length > 0 ? text : null;
  } catch (err) {
    console.error('❌ Fetch failed:', err.message);
    return null;
  }
}

module.exports = fetchTranscript;
