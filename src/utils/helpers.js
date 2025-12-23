/**
 * Helper utility functions
 */

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get priority order for sorting
 * @param {string} priority - Priority level
 * @returns {number} Priority order (higher = more important)
 */
export const getPriorityOrder = (priority) => {
  const order = {
    high: 3,
    medium: 2,
    low: 1,
  };
  return order[priority] || 0;
};

/**
 * Sort tasks by priority
 * @param {Array} tasks - Array of tasks
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted tasks
 */
export const sortByPriority = (tasks, order = 'desc') => {
  return [...tasks].sort((a, b) => {
    const orderA = getPriorityOrder(a.priority);
    const orderB = getPriorityOrder(b.priority);
    return order === 'desc' ? orderB - orderA : orderA - orderB;
  });
};

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of tasks
 * @param {string} status - 'all', 'pending', or 'completed'
 * @returns {Array} Filtered tasks
 */
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'all') return tasks;
  if (status === 'pending') return tasks.filter((task) => !task.completed);
  if (status === 'completed') return tasks.filter((task) => task.completed);
  return tasks;
};

/**
 * Search tasks by query
 * @param {Array} tasks - Array of tasks
 * @param {string} query - Search query
 * @returns {Array} Filtered tasks
 */
export const searchTasks = (tasks, query) => {
  if (!query || query.trim() === '') return tasks;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return tasks.filter((task) => {
    const title = task.title?.toLowerCase() || '';
    const description = task.description?.toLowerCase() || '';
    return title.includes(lowerQuery) || description.includes(lowerQuery);
  });
};

/**
 * Get contrast color (black or white) based on background color
 * @param {string} bgColor - Background color in hex format
 * @returns {string} 'black' or 'white'
 */
export const getContrastColor = (bgColor) => {
  // Convert hex to RGB
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? 'black' : 'white';
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Get percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const getPercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

/**
 * Check if browser supports a feature
 * @param {string} feature - Feature name
 * @returns {boolean}
 */
export const supportsFeature = (feature) => {
  switch (feature) {
    case 'clipboard':
      return !!navigator.clipboard;
    case 'notification':
      return 'Notification' in window;
    case 'serviceWorker':
      return 'serviceWorker' in navigator;
    default:
      return false;
  }
};
