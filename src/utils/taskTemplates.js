/**
 * Task Templates for Quick Creation
 */

export const TASK_TEMPLATES = [
  {
    id: 'meeting',
    name: 'Meeting',
    icon: '👥',
    color: 'blue',
    template: {
      title: 'Team Meeting',
      description: 'Discuss project progress and next steps',
      priority: 'medium',
      dueDate: getTodayDate(),
    },
  },
  {
    id: 'assignment',
    name: 'Assignment',
    icon: '📝',
    color: 'purple',
    template: {
      title: 'Complete Assignment',
      description: 'Review requirements and submit before deadline',
      priority: 'high',
      dueDate: getNextWeekDate(),
    },
  },
  {
    id: 'study',
    name: 'Study',
    icon: '📚',
    color: 'green',
    template: {
      title: 'Study Session',
      description: 'Review lecture notes and practice problems',
      priority: 'medium',
      dueDate: getTomorrowDate(),
    },
  },
  {
    id: 'project',
    name: 'Project',
    icon: '🚀',
    color: 'orange',
    template: {
      title: 'Project Milestone',
      description: 'Complete next phase of the project',
      priority: 'high',
      dueDate: getNextWeekDate(),
    },
  },
  {
    id: 'review',
    name: 'Review',
    icon: '🔍',
    color: 'indigo',
    template: {
      title: 'Review Material',
      description: 'Go through notes and practice questions',
      priority: 'medium',
      dueDate: getTomorrowDate(),
    },
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: '🎯',
    color: 'pink',
    template: {
      title: 'Personal Task',
      description: 'Add your personal task details here',
      priority: 'low',
      dueDate: getTodayDate(),
    },
  },
];

/**
 * Get task template by ID
 * @param {string} templateId - Template ID
 * @returns {Object} Template data
 */
export const getTemplate = (templateId) => {
  const template = TASK_TEMPLATES.find(t => t.id === templateId);
  return template ? { ...template.template } : null;
};

/**
 * Create task from template
 * @param {string} templateId - Template ID
 * @param {Object} overrides - Fields to override
 * @returns {Object} Task data
 */
export const createFromTemplate = (templateId, overrides = {}) => {
  const template = getTemplate(templateId);
  if (!template) return null;

  return {
    ...template,
    ...overrides,
    // Ensure date is fresh
    dueDate: overrides.dueDate || template.dueDate,
  };
};

/**
 * Helper: Get today's date as YYYY-MM-DD
 */
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Helper: Get tomorrow's date as YYYY-MM-DD
 */
function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Helper: Get next week's date as YYYY-MM-DD
 */
function getNextWeekDate() {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return nextWeek.toISOString().split('T')[0];
}

/**
 * Get template color classes
 * @param {string} color - Color name
 * @returns {Object} Tailwind classes
 */
export const getTemplateColors = (color) => {
  const colors = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      hover: 'hover:bg-blue-500/20',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      hover: 'hover:bg-purple-500/20',
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-400',
      hover: 'hover:bg-green-500/20',
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      text: 'text-orange-400',
      hover: 'hover:bg-orange-500/20',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      hover: 'hover:bg-indigo-500/20',
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      text: 'text-pink-400',
      hover: 'hover:bg-pink-500/20',
    },
  };

  return colors[color] || colors.blue;
};
