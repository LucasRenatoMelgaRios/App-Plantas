import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../context/TaskContext';
import { useNavigation } from '@react-navigation/native';

export default function NewTaskScreen() {
  const navigation = useNavigation();
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Hortalizas');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTask = () => {
    if (title.trim() === '') {
      alert('Por favor introduce un titulo');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');
    setCategory('Hortalizas');
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('All Tasks');
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Task</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Campo para el título */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Campo para la descripción */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      {/* Campo para la fecha */}
      <View style={styles.dateContainer}>
        <TextInput
          placeholder="Due date"
          value={dueDate}
          onChangeText={setDueDate}
          style={[styles.input, { flex: 1 }]}
        />
        <Ionicons name="calendar-outline" size={24} color="gray" style={styles.calendarIcon} />
      </View>

      {/* Selección de prioridad */}
      <Text>Selecciona la prioridad de esta tarea:</Text>
      <View style={styles.priorityContainer}>
        {['Baja', 'Media', 'Alta'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && styles.priorityButtonSelected]}
            onPress={() => setPriority(level)}
          >
            <Text style={priority === level ? styles.priorityTextSelected : styles.priorityText}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selección de categoría */}
      <Text>Selecciona la categoría:</Text>
      <View style={styles.categoryContainer}>
        {['Hortalizas', 'Frutas', 'Plantines', 'Animales', 'Semillas'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonSelected]}
            onPress={() => setCategory(cat)}
          >
            <Text style={category === cat ? styles.categoryTextSelected : styles.categoryText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón para agregar la tarea */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Agregar tarea</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadido</Text>
            <Text style={styles.modalMessage}>Tarea agregada con éxito!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#e3ffe3',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flex: 1,
    alignItems: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: '#127812',
    borderColor: '#007BFF',
  },
  priorityText: {
    color: '#333',
    fontSize: 16,
  },
  priorityTextSelected: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flex: 1,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#289c28',
    borderColor: '#007BFF',
  },
  categoryText: {
    color: '#333',
    fontSize: 16,
  },
  categoryTextSelected: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    height: 50,
    backgroundColor: '#127812',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
