import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Agregamos un pequeño retardo para esperar que el layout monte completamente.
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 100); // 100ms para dar tiempo al layout de montarse.

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta.
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
