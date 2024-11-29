import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import logo from "../app/assets/logo.png"; // Importa el logo

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Animación para mover el título y el botón
  const titleMoveAnim = new Animated.Value(-30); // Empieza fuera de la pantalla
  const buttonMoveAnim = new Animated.Value(30); // Empieza fuera de la pantalla

  React.useEffect(() => {
    // Animar la entrada al cargar la pantalla
    Animated.sequence([
      Animated.timing(titleMoveAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonMoveAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    // Redirige a la pestaña de "Tareas Completadas"
    router.replace('/(tabs)/completed-tasks');
  };

  return (
    <View style={styles.container}>
      {/* Mostrar el logo arriba del título */}
      <Image source={logo} style={styles.logo} />

      {/* Animación solo al Título con translateY */}
      <Animated.Text style={[styles.title, { transform: [{ translateY: titleMoveAnim }] }]}>
        Sign in to your account
      </Animated.Text>
      
      {/* Los inputs no se animan, solo el título y botón */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      
      {/* Animación solo al Botón con translateY */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonMoveAnim }] }]}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <TouchableOpacity>
        <Text style={styles.signUpText}>New user? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#e3ffe3', // Fondo verde claro
  },
  logo: {
    width: 150, // Ancho del logo
    height: 220, // Alto del logo
    alignSelf: 'center', // Centra el logo horizontalmente
    marginBottom: 40, // Espacio entre el logo y el título
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#4caf50', // Verde fuerte para el título
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  button: {
    height: 50,
    backgroundColor: '#388e3c', // Verde fuerte para el botón
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
