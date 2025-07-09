// frontend/app/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import API from '../utils/api';  // ✅ fixed path (just one dot)

export default function HomeScreen() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get('/api/videos');  // ✅ fixed route
        console.log('✅ Data:', res.data);
        setVideos(res.data);
      } catch (err) {
        console.error('❌ Error fetching videos:', err.message);
        console.log('📄 Full error:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Video List</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.title}</Text>
            <Text>{item.url}</Text>
            <Text>{item.subject}</Text>
          </View>
        )}
      />
    </View>
  );
}
