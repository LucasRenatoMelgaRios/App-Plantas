import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../context/TaskContext';

export default function CompletedTasksScreen() {
  const { tasks } = useContext(TaskContext); // Accede a las tareas desde el contexto

  // Filtra las tareas que están completadas
  const completedTasks = tasks.filter(task => task.completed); // Solo las tareas completadas

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.checkbox}>
        <Ionicons name="checkbox-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con ícono de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Go back')}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Completed Tasks</Text>
      </View>

      {/* Lista de tareas completadas */}
      <FlatList
        data={completedTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3ffe3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  taskList: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTitle: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    marginRight: 10,
  },
});