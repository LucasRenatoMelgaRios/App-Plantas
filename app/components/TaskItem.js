// app/components/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <Button title="Complete" onPress={onComplete} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
});

export default TaskItem;
