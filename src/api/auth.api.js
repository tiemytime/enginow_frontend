import axios from './axios';

/**
 * Auth API functions
 */

/**
 * User signup
 * @param {Object} userData - { name, email, password }
 * @returns {Promise} Response with user data and token
 */
export const signup = async (userData) => {
  const response = await axios.post('/auth/signup', userData);
  return response.data;
};

/**
 * User login
 * @param {Object} credentials - { email, password }
 * @returns {Promise} Response with user data and token
 */
export const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

/**
 * Get current user
 * @returns {Promise} Response with user data
 */
export const getCurrentUser = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};

/**
 * Logout (client-side only - clear local storage)
 * @returns {void}
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
