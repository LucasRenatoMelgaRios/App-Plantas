import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem task={item} onComplete={() => onComplete(item.id)} onDelete={() => onDelete(item.id)} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default TaskList;