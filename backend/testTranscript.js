const { YoutubeTranscript } = require('youtube-transcript');

(async () => {
  const ytId = 'WUvTyaaNkzM'; // Change this to any YouTube ID
  console.log(`🎬 Fetching transcript for ${ytId}...`);

  try {
    const chunks = await YoutubeTranscript.fetchTranscript(ytId);
    const fullTranscript = chunks.map(c => c.text).join(' ');
    console.log(`✅ Success: Transcript is ${fullTranscript.length} characters\n`);
    console.log(fullTranscript);
  } catch (err) {
    console.error('❌ Error fetching transcript:', err.message);
  }
})();
