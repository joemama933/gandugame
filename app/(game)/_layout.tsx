import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="farming" />
      <Stack.Screen name="profile" /> {/* Add this line */}
    </Stack>
  );
}