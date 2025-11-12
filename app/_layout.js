import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Lesson Plan Generator' }} />
      <Stack.Screen name="plan" options={{ title: 'Generated Lesson Plan' }} />
    </Stack>
  );
}
