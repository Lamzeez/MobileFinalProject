import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

// IMPORTANT: Replace with your computer's local IP address
const API_URL = 'https://unascendent-underfoot-tessa.ngrok-free.dev';

export default function HomeScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams(); // Get userId from navigation params
  const [history, setHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchHistory();
      fetchTemplates();
    } else {
      // If userId is not available, maybe redirect to login or show an error
      Alert.alert("Error", "User not logged in. Please log in again.");
      router.replace('/LoginScreen');
    }
  }, [userId]);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch(`${API_URL}/api/plans/history?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
      Alert.alert("Error", "Failed to load history.");
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const response = await fetch(`${API_URL}/api/templates`);
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      Alert.alert("Error", "Failed to load templates.");
    } finally {
      setLoadingTemplates(false);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', 'Lesson plan content copied to clipboard.');
  };

  const renderHistoryItem = ({ item }) => (
    <Pressable
      style={styles.historyItem}
      onPress={() => router.push({ pathname: '/plan', params: { planId: item.id, userId: userId } })}
    >
      <ThemedText type="subtitle">{item.topic}</ThemedText>
      <Text>Grade: {item.grade}, Subject: {item.subject}</Text>
      <Text style={styles.dateText}>{new Date(item.created_at).toLocaleDateString()}</Text>
    </Pressable>
  );

  const renderTemplateItem = ({ item }) => (
    <Pressable
      style={styles.templateItem}
      onPress={() => Alert.alert(item.name, item.description)} // For now, just show description
    >
      <ThemedText type="subtitle">{item.name}</ThemedText>
      <Text>Grade: {item.grade}, Subject: {item.subject}</Text>
      <Text>{item.description}</Text>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.headerTitle}>Dashboard</ThemedText>

      <Pressable
        style={styles.createPlanButton}
        onPress={() => router.push({ pathname: '/FormScreen', params: { userId: userId } })}
      >
        <Text style={styles.createPlanButtonText}>Create New Lesson Plan</Text>
      </Pressable>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Your Generated Plans</ThemedText>
        {loadingHistory ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        ) : (
          <Text>No plans generated yet.</Text>
        )}
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Lesson Plan Templates</ThemedText>
        {loadingTemplates ? (
          <ActivityIndicator size="large" color="#28A745" />
        ) : templates.length > 0 ? (
          <FlatList
            data={templates}
            renderItem={renderTemplateItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        ) : (
          <Text>No templates available.</Text>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  createPlanButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  createPlanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  list: {
    maxHeight: 200, // Limit height for scrollability
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
  },
  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  templateItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#E6F7FF', // Light blue for templates
    borderRadius: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
