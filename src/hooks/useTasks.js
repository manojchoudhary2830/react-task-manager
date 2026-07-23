import { useEffect, useState } from 'react';
import { STARTER_TASKS } from '../data/starterTasks';
import { createTask } from '../utils/taskUtils';

export const STORAGE_KEY = 'momentum-react-tasks-v1';

const readStoredTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return STARTER_TASKS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : STARTER_TASKS;
  } catch (error) {
    console.warn('Saved tasks could not be loaded. Starter tasks were used.', error);
    return STARTER_TASKS;
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(readStoredTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Tasks could not be saved to Local Storage.', error);
    }
  }, [tasks]);

  const addTask = (values) => setTasks((current) => [createTask(values), ...current]);

  const updateTask = (taskId, values) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...values,
              title: values.title.trim(),
              description: values.description.trim(),
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  };

  const toggleTask = (taskId) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => setTasks((current) => current.filter((task) => !task.completed));

  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted };
};
