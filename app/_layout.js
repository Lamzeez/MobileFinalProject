import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
      <Stack.Screen name="RegisterScreen" options={{ title: 'Register' }} />
      <Stack.Screen name="HomeScreen" options={{ title: 'Home' }} />
      <Stack.Screen name="FormScreen" options={{ title: 'Create Lesson Plan' }} />
      <Stack.Screen name="plan" options={{ title: 'Generated Lesson Plan' }} />
    </Stack>
  );
}
