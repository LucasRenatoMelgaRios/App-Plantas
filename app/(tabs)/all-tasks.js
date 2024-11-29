import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../context/TaskContext';

export default function AllTasksScreen() {
  const { tasks, toggleTaskCompletion, deleteTask } = useContext(TaskContext);
  const [selectedCategory, setSelectedCategory] = useState(''); // Nuevo estado para la categoría seleccionada

  // Ordenar las tareas según la prioridad
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Filtrar tareas por categoría seleccionada
  const filteredTasks = selectedCategory
    ? sortedTasks.filter(task => task.category === selectedCategory)
    : sortedTasks;

  const renderTask = ({ item }) => {
    const priorityColor = item.priority === 'Alta' 
      ? '#ffcccc'  // Rojo suave
      : item.priority === 'Media' 
      ? '#fff3b0'  // Amarillo suave
      : 'white';  // Para baja prioridad

    const textColor = item.priority === 'Alta' || item.priority === 'Media' 
      ? 'black' 
      : 'black'; 

    return (
      <View style={[styles.taskItem, { backgroundColor: priorityColor }]}>
        <TouchableOpacity 
          style={[styles.checkbox, item.completed && styles.checkboxCompleted]} 
          onPress={() => toggleTaskCompletion(item.id)} 
        >
          {item.completed ? (
            <Ionicons name="checkmark" size={20} color="white" />
          ) : (
            <Ionicons name="square-outline" size={20} color="gray" />
          )}
        </TouchableOpacity>

        <Text style={[styles.taskTitle, { color: textColor }, item.completed && styles.taskTitleCompleted]}>
          {item.title}
        </Text>

        {item.description && (
          <Text style={[styles.taskDescription, { color: textColor }]}>{item.description}</Text>
        )}

        {item.dueDate && (
          <Text style={[styles.taskDate, { color: textColor }]}>Due: {item.dueDate}</Text>
        )}

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => deleteTask(item.id)} 
        >
          <Ionicons name="trash-outline" size={20} color={item.priority === 'Alta' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filtro de categorías */}
      <View style={styles.filterContainer}>
        {['Hortalizas', 'Frutas', 'Plantines', 'Animales', 'Semillas'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryFilterButton, selectedCategory === cat && styles.categoryFilterButtonSelected]}
            onPress={() => setSelectedCategory(cat === selectedCategory ? '' : cat)} // Alternar categoría seleccionada
          >
            <Text style={selectedCategory === cat ? styles.categoryFilterTextSelected : styles.categoryFilterText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}  
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.tasksList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#e3ffe3',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryFilterButton: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryFilterButtonSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  categoryFilterText: {
    color: '#333',
    fontSize: 16,
  },
  categoryFilterTextSelected: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  taskDate: {
    fontSize: 12,
    marginTop: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
