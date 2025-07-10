import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import YouTubeIframe from 'react-native-youtube-iframe';
import API from '../../utils/api';

export default function VideoScreen() {
  const { videoId } = useLocalSearchParams();
  const [video, setVideo] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("🛰️ Fetching video and concepts for:", videoId);

      try {
        const videoRes = await API.get(`/api/videos/${videoId}`);
        console.log("📹 Video data:", videoRes.data);
        setVideo(videoRes.data);

        const conceptRes = await API.get(`/api/concepts/${videoId}`);
        setConcepts(conceptRes.data);
      } catch (err) {
        console.error('❌ Error fetching video screen data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) fetchData();
  }, [videoId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!video) {
    return <Text style={{ padding: 20 }}>❌ Video not found</Text>;
  }

  // Handle URL parsing safely
  let youtubeId = '';
  if (video.url.includes('v=')) {
    youtubeId = video.url.split('v=')[1];
    if (youtubeId.includes('&')) {
      youtubeId = youtubeId.split('&')[0];
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.subject}>{video.subject}</Text>
      <YouTubeIframe height={200} videoId={youtubeId} />
      <Text style={styles.sectionTitle}>📘 NCERT Concepts:</Text>

      {concepts.length === 0 ? (
        <Text style={styles.noConcepts}>No concepts found.</Text>
      ) : (
        <FlatList
          data={concepts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.conceptCard}>
              <Text style={styles.conceptTitle}>{item.title}</Text>
              <Text style={styles.conceptDesc}>{item.description}</Text>
              <Text style={styles.meta}>
                Chapter: {item.chapter} | Section: {item.section} | Page: {item.page}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subject: { fontSize: 14, color: '#777', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  noConcepts: { fontStyle: 'italic' },
  conceptCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  conceptTitle: { fontWeight: 'bold', fontSize: 15 },
  conceptDesc: { color: '#333', marginVertical: 4 },
  meta: { fontSize: 12, color: '#555' },
});
