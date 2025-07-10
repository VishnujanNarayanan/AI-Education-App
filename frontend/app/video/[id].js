import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import API from '../../utils/api';

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fix: added /api prefix
        const res = await API.get(`/api/videos/${id}`);
        setVideo(res.data);

        const transcriptRes = await API.get(`/api/transcripts/${id}`);
        setTranscript(transcriptRes.data.content);

        const conceptRes = await API.get(`/api/concepts/${id}`);
        setConcepts(conceptRes.data);
      } catch (err) {
        console.error('❌ Error fetching video screen data:', err.message);
      }
    };

    fetchData();
  }, [id]);

  if (!video) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const youtubeId = video.url.split('v=')[1];

  return (
    <ScrollView style={styles.container}>
      <WebView
        style={styles.player}
        source={{ uri: `https://www.youtube.com/embed/${youtubeId}` }}
      />

      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.sub}>{video.subject}</Text>

      <Text style={styles.sectionTitle}>📜 Transcript</Text>
      <Text style={styles.block}>{transcript || 'No transcript found.'}</Text>

      <Text style={styles.sectionTitle}>📘 Mapped NCERT Concepts</Text>
      {concepts.length ? (
        concepts.map((c, i) => (
          <Text key={i} style={styles.block}>
            Chapter {c.chapter}, Section {c.section} (Page {c.page}): {c.topic}
          </Text>
        ))
      ) : (
        <Text>No concepts found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  player: { height: 200, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  sub: { fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
  block: { fontSize: 15, lineHeight: 22, marginBottom: 10 },
});
