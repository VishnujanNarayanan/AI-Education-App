import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import API from '../utils/api';

export default function HomeScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get('/api/videos');
        console.log('✅ Data:', res.data);
        setVideos(res.data);
      } catch (err) {
        console.error('❌ Error fetching videos:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        console.log('🔗 Navigating to video:', item._id);
        router.push(`/video/${item._id}`);
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.url}>{item.url}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading videos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎥 Video List</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subject: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  url: {
    fontSize: 12,
    color: '#2a7ae2',
    marginTop: 6,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
