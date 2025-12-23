// ============================================
// APP CONSTANTS
// ============================================

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ============================================
// PRIORITY LEVELS
// ============================================
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High',
};

export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: 'bg-priority-low',
  [PRIORITY.MEDIUM]: 'bg-priority-medium',
  [PRIORITY.HIGH]: 'bg-priority-high',
};

// Alias for backward compatibility
export const TASK_PRIORITY = PRIORITY;

// ============================================
// TASK STATUS
// ============================================
export const TASK_STATUS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.ALL]: 'All Tasks',
  [TASK_STATUS.PENDING]: 'Pending',
  [TASK_STATUS.COMPLETED]: 'Completed',
};

// ============================================
// SORT OPTIONS
// ============================================
export const SORT_BY = {
  DUE_DATE_ASC: 'dueDate',
  DUE_DATE_DESC: '-dueDate',
  PRIORITY_ASC: 'priority',
  PRIORITY_DESC: '-priority',
  CREATED_ASC: 'createdAt',
  CREATED_DESC: '-createdAt',
};

export const SORT_LABELS = {
  [SORT_BY.DUE_DATE_ASC]: 'Due Date (Oldest First)',
  [SORT_BY.DUE_DATE_DESC]: 'Due Date (Newest First)',
  [SORT_BY.PRIORITY_ASC]: 'Priority (Low to High)',
  [SORT_BY.PRIORITY_DESC]: 'Priority (High to Low)',
  [SORT_BY.CREATED_ASC]: 'Created (Oldest First)',
  [SORT_BY.CREATED_DESC]: 'Created (Newest First)',
};

// ============================================
// PAGINATION
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 30, 50],
};

// ============================================
// TOAST TYPES
// ============================================
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// ============================================
// NOTIFICATION CATEGORIES
// ============================================
export const NOTIFICATION_CATEGORIES = {
  URGENT_30MIN: 'within30Min',
  URGENT_1HOUR: 'within1Hour',
  OVERDUE: 'overdue',
  DUE_TODAY: 'dueToday',
  DUE_TOMORROW: 'dueTomorrow',
  UPCOMING: 'upcoming',
};

// ============================================
// LOCAL STORAGE KEYS
// ============================================
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  ITEMS_PER_PAGE: 'itemsPerPage',
};

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
};

// ============================================
// VALIDATION RULES
// ============================================
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  NAME_MIN_LENGTH: 2,
  TIME_FORMAT_REGEX: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
};

// ============================================
// DEBOUNCE DELAYS
// ============================================
export const DEBOUNCE = {
  SEARCH: 300,
  INPUT: 200,
  API_CALL: 500,
};

// ============================================
// AUTO REFRESH INTERVALS (in milliseconds)
// ============================================
export const REFRESH_INTERVALS = {
  NOTIFICATIONS: 30000, // 30 seconds
  TASKS: 60000, // 1 minute
};

// ============================================
// ANIMATION DURATIONS
// ============================================
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
};

// ============================================
// TOAST DURATION
// ============================================
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
};

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_NO_NUMBER: 'Password must contain at least one number',
  TITLE_TOO_LONG: `Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`,
  DESCRIPTION_TOO_LONG: `Description cannot exceed ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`,
  INVALID_DATE: 'Please select a valid date',
  DATE_IN_PAST: 'Due date cannot be in the past',
  INVALID_TIME_FORMAT: 'Time must be in HH:MM format (e.g., 14:30)',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TASK_NOT_FOUND: 'Task not found',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this task?',
};

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully! 🎉',
  TASK_UPDATED: 'Task updated successfully! ✅',
  TASK_DELETED: 'Task deleted successfully! 🗑️',
  TASK_COMPLETED: 'Task completed! Great job! 🎊',
  TASK_UNCOMPLETED: 'Task marked as pending',
  LOGIN_SUCCESS: 'Welcome back! 👋',
  SIGNUP_SUCCESS: 'Account created successfully! 🎉',
  LOGOUT_SUCCESS: 'Logged out successfully',
};

// ============================================
// EMPTY STATE MESSAGES
// ============================================
export const EMPTY_STATES = {
  NO_TASKS: 'No tasks yet. Add your first task to get started! 🚀',
  NO_PENDING_TASKS: 'All caught up! No pending tasks. 🎉',
  NO_COMPLETED_TASKS: 'No completed tasks yet. Keep going! 💪',
  NO_SEARCH_RESULTS: 'No tasks found matching your search.',
  NO_NOTIFICATIONS: 'No notifications at this time. 📭',
};

// ============================================
// FORM STEP TITLES (for multi-step form)
// ============================================
export const FORM_STEPS = {
  BASIC_INFO: {
    title: 'Basic Information',
    description: 'What do you need to do?',
    step: 1,
  },
  SCHEDULING: {
    title: 'Schedule',
    description: 'When is it due?',
    step: 2,
  },
  PRIORITY_REVIEW: {
    title: 'Priority & Review',
    description: 'How important is it?',
    step: 3,
  },
};

export const TOTAL_FORM_STEPS = 3;
