import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>Welcome to the Lesson Plan Generator</ThemedText>
        <ThemedText style={styles.subtitle}>
          Create complete, high-quality daily lesson logs in minutes using the power of AI.
        </ThemedText>
        <View style={styles.buttonContainer}>
          <Link href="/LoginScreen" asChild>
            <Pressable style={styles.loginPressable}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </Link>
          <Link href="/RegisterScreen" asChild>
            <Pressable style={styles.registerPressable}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loginPressable: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  registerPressable: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
