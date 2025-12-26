import axios from './axios';

/**
 * Todo API functions for Daily Planner
 */

/**
 * Get all todos for current user
 * @returns {Promise} Response with todos array
 */
export const getTodos = async () => {
  const response = await axios.get('/todos');
  return response.data;
};

/**
 * Create new todo
 * @param {Object} todoData - { text, completed, order }
 * @returns {Promise} Response with created todo
 */
export const createTodo = async (todoData) => {
  const response = await axios.post('/todos', todoData);
  return response.data;
};

/**
 * Update todo
 * @param {string} id - Todo ID
 * @param {Object} updates - { text, completed, order }
 * @returns {Promise} Response with updated todo
 */
export const updateTodo = async (id, updates) => {
  const response = await axios.patch(`/todos/${id}`, updates);
  return response.data;
};

/**
 * Delete todo
 * @param {string} id - Todo ID
 * @returns {Promise} Response
 */
export const deleteTodo = async (id) => {
  const response = await axios.delete(`/todos/${id}`);
  return response.data;
};

/**
 * Bulk update todos
 * @param {Array} todos - Array of todos with updates
 * @returns {Promise} Response with updated todos
 */
export const bulkUpdateTodos = async (todos) => {
  const response = await axios.patch('/todos/bulk', { todos });
  return response.data;
};
