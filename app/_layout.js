import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// This is the main layout of the app
// It wraps your stack navigator with the AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the auth group if not signed in and not already in auth group
      router.replace('/(auth)');
    } else if (user && inAuthGroup) {
      // Redirect to the tabs group if signed in and in auth group
      router.replace('/(tabs)/');
    }
  }, [user, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="plan" options={{ title: 'Generated Lesson Plan' }} />
    </Stack>
  );
}
