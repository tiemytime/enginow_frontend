import { TASK_PRIORITY, TASK_STATUS } from './constants';

/**
 * Task Helper Functions
 */

/**
 * Get priority badge variant
 * @param {string} priority - Task priority
 * @returns {string} Badge variant
 */
export const getPriorityVariant = (priority) => {
  const variants = {
    [TASK_PRIORITY.HIGH]: 'high',
    [TASK_PRIORITY.MEDIUM]: 'medium',
    [TASK_PRIORITY.LOW]: 'low',
  };
  return variants[priority] || 'default';
};

/**
 * Get priority label
 * @param {string} priority - Task priority
 * @returns {string} Display label
 */
export const getPriorityLabel = (priority) => {
  const labels = {
    [TASK_PRIORITY.HIGH]: 'High',
    [TASK_PRIORITY.MEDIUM]: 'Medium',
    [TASK_PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || priority;
};

/**
 * Get status label
 * @param {boolean} completed - Task completion status
 * @returns {string} Display label
 */
export const getStatusLabel = (completed) => {
  return completed ? 'Completed' : 'Pending';
};

/**
 * Get status variant
 * @param {boolean} completed - Task completion status
 * @returns {string} Badge variant
 */
export const getStatusVariant = (completed) => {
  return completed ? 'success' : 'default';
};

/**
 * Check if task is overdue
 * @param {string} dueDate - Task due date
 * @param {boolean} completed - Task completion status
 * @returns {boolean}
 */
export const isTaskOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date();
};

/**
 * Check if task is due soon (within 24 hours)
 * @param {string} dueDate - Task due date
 * @param {boolean} completed - Task completion status
 * @returns {boolean}
 */
export const isTaskDueSoon = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  const due = new Date(dueDate);
  const now = new Date();
  const diff = due - now;
  const hours = diff / (1000 * 60 * 60);
  return hours > 0 && hours <= 24;
};

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of tasks
 * @param {string} status - Status filter ('all', 'completed', 'pending')
 * @returns {Array} Filtered tasks
 */
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'all') return tasks;
  if (status === 'completed') return tasks.filter((task) => task.completed === true);
  if (status === 'pending') return tasks.filter((task) => task.completed === false);
  return tasks;
};

/**
 * Filter tasks by priority
 * @param {Array} tasks - Array of tasks
 * @param {string} priority - Priority filter ('all', 'high', 'medium', 'low')
 * @returns {Array} Filtered tasks
 */
export const filterTasksByPriority = (tasks, priority) => {
  if (priority === 'all') return tasks;
  return tasks.filter((task) => task.priority === priority);
};

/**
 * Filter tasks by search query
 * @param {Array} tasks - Array of tasks
 * @param {string} query - Search query
 * @returns {Array} Filtered tasks
 */
export const filterTasksBySearch = (tasks, query) => {
  if (!query.trim()) return tasks;
  const lowerQuery = query.toLowerCase();
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(lowerQuery) ||
    (task.description && task.description.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Sort tasks
 * @param {Array} tasks - Array of tasks
 * @param {string} sortBy - Sort criteria ('dueDate', 'priority', 'title', 'createdAt')
 * @param {string} sortOrder - Sort order ('asc', 'desc')
 * @returns {Array} Sorted tasks
 */
export const sortTasks = (tasks, sortBy = 'dueDate', sortOrder = 'asc') => {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;

      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        break;
      }

      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;

      case 'createdAt':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;

      default:
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * Get task statistics
 * @param {Array} tasks - Array of tasks
 * @returns {Object} Task statistics
 */
export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = tasks.filter((task) => task.completed === false).length;
  const overdue = tasks.filter((task) => 
    isTaskOverdue(task.dueDate, task.completed)
  ).length;
  const dueSoon = tasks.filter((task) => 
    isTaskDueSoon(task.dueDate, task.completed)
  ).length;
  const highPriority = tasks.filter((task) => 
    task.priority === TASK_PRIORITY.HIGH && !task.completed
  ).length;

  return {
    total,
    completed,
    pending,
    overdue,
    dueSoon,
    highPriority,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

/**
 * Group tasks by status
 * @param {Array} tasks - Array of tasks
 * @returns {Object} Grouped tasks
 */
export const groupTasksByStatus = (tasks) => {
  return {
    pending: tasks.filter((task) => !task.completed),
    completed: tasks.filter((task) => task.completed),
  };
};

/**
 * Group tasks by priority
 * @param {Array} tasks - Array of tasks
 * @returns {Object} Grouped tasks
 */
export const groupTasksByPriority = (tasks) => {
  return {
    high: tasks.filter((task) => task.priority === TASK_PRIORITY.HIGH),
    medium: tasks.filter((task) => task.priority === TASK_PRIORITY.MEDIUM),
    low: tasks.filter((task) => task.priority === TASK_PRIORITY.LOW),
  };
};
