import axios from './axios';

/**
 * Task API functions
 */

/**
 * Get all tasks with pagination and filters
 * @param {Object} params - { page, limit, status, sort }
 * @returns {Promise} Response with tasks array and pagination data
 */
export const getTasks = async (params = {}) => {
  const response = await axios.get('/tasks', { params });
  return response.data;
};

/**
 * Get single task by ID
 * @param {string} id - Task ID
 * @returns {Promise} Response with task data
 */
export const getTask = async (id) => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create new task
 * @param {Object} taskData - { title, description, priority, dueDate, dueTime }
 * @returns {Promise} Response with created task
 */
export const createTask = async (taskData) => {
  const response = await axios.post('/tasks', taskData);
  return response.data;
};

/**
 * Update task
 * @param {string} id - Task ID
 * @param {Object} taskData - Updated fields
 * @returns {Promise} Response with updated task
 */
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`/tasks/${id}`, taskData);
  return response.data;
};

/**
 * Delete task
 * @param {string} id - Task ID
 * @returns {Promise} Response
 */
export const deleteTask = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};

/**
 * Toggle task completion
 * @param {string} id - Task ID
 * @param {boolean} completed - Completion status
 * @returns {Promise} Response with updated task
 */
export const toggleTaskCompletion = async (id, completed) => {
  const response = await axios.put(`/tasks/${id}`, { completed });
  return response.data;
};

/**
 * Get all notifications
 * @returns {Promise} Response with categorized notifications
 */
export const getNotifications = async () => {
  const response = await axios.get('/tasks/notifications');
  return response.data;
};

/**
 * Get urgent notifications (within 30 min or 1 hour)
 * @returns {Promise} Response with urgent notifications
 */
export const getUrgentNotifications = async () => {
  const response = await axios.get('/tasks/notifications/urgent');
  return response.data;
};

/**
 * Get overdue count
 * @returns {Promise} Response with overdue count
 */
export const getOverdueCount = async () => {
  const response = await axios.get('/tasks/overdue-count');
  return response.data;
};

/**
 * Get tasks due soon
 * @param {number} hours - Hours to look ahead (default: 24)
 * @returns {Promise} Response with tasks due soon
 */
export const getTasksDueSoon = async (hours = 24) => {
  const response = await axios.get('/tasks/due-soon', {
    params: { hours },
  });
  return response.data;
};
