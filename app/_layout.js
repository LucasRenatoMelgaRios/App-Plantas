import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Pantalla de login */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Layout de pestañas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
