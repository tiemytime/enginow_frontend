import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as taskApi from '../api/task.api';

// Create Task Context
const TaskContext = createContext(null);

// Task Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    sort: 'dueDate',
    sortOrder: 'asc',
  });

  /**
   * Fetch all tasks
   */
  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await taskApi.getTasks(params);

      if (response.status === 'success') {
        setTasks(response.data.tasks || response.data);
        return { success: true, data: response.data };
      }

      return { success: false, message: 'Failed to fetch tasks' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch tasks';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new task
   */
  const createTask = useCallback(async (taskData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await taskApi.createTask(taskData);

      if (response.status === 'success') {
        setTasks((prev) => [response.data, ...prev]);
        return { success: true, data: response.data, message: 'Task created successfully' };
      }

      return { success: false, message: 'Failed to create task' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to create task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update existing task
   */
  const updateTask = useCallback(async (id, taskData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await taskApi.updateTask(id, taskData);

      if (response.status === 'success') {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? response.data : task))
        );
        return { success: true, data: response.data, message: 'Task updated successfully' };
      }

      return { success: false, message: 'Failed to update task' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete task
   */
  const deleteTask = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await taskApi.deleteTask(id);

      if (response.status === 'success') {
        setTasks((prev) => prev.filter((task) => task._id !== id));
        return { success: true, message: 'Task deleted successfully' };
      }

      return { success: false, message: 'Failed to delete task' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Toggle task completion
   */
  const toggleTaskCompletion = useCallback(async (id, completed) => {
    try {
      setError(null);

      const response = await taskApi.toggleTaskCompletion(id, completed);

      if (response.status === 'success') {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, completed } : task))
        );
        return { success: true, data: response.data, completed };
      }

      return { success: false, message: 'Failed to update task' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  /**
   * Reorder tasks (for drag and drop)
   */
  const reorderTasks = useCallback((reorderedTasks) => {
    setTasks(reorderedTasks);
    return { success: true };
  }, []);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      priority: 'all',
      search: '',
      sort: 'dueDate',
      sortOrder: 'asc',
    });
  }, []);

  /**
   * Refresh tasks on mount
   */
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const value = {
    tasks,
    loading,
    error,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    reorderTasks,
    updateFilters,
    clearFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
