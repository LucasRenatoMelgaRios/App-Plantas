import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TaskProvider } from '../context/TaskContext';

export default function TabLayout() {
  return (
    <TaskProvider>
      <Tabs
        screenOptions={{
          // Establecer el fondo de la barra de navegación de las pestañas
          tabBarStyle: {
            backgroundColor: '#e3ffe3', // Color verde suave para la barra de pestañas
          },
          // Establecer el fondo del header para cada pantalla
          headerStyle: {
            backgroundColor: '#e3ffe3', // Color verde suave para el header de cada pantalla
          },
          // Opcional: cambiar el color del texto en los headers
          headerTintColor: '#000', // Color del texto del header (puedes cambiarlo a blanco si lo prefieres)
          // Establecer color de los iconos activos
          tabBarActiveTintColor: '#008000', // Verde fuerte para los iconos activos
          // Establecer color de los iconos inactivos
          tabBarInactiveTintColor: '#7f7f7f', // Color gris para los iconos inactivos
        }}
      >
        <Tabs.Screen
          name="new-tasks"
          options={{
            title: 'Agregar tarea general',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="today-tasks"
          options={{
            title: 'Tareas de hoy',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="completed-tasks"
          options={{
            title: 'Tareas generales Completadas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-done-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="all-tasks"
          options={{
            title: 'Todas las tareas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
