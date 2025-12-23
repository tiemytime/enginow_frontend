/**
 * Template Index - Export all task templates
 */

import { meetingTemplate } from './meetingTemplate';
import { studyTemplate } from './studyTemplate';
import { personalTemplate } from './personalTemplate';

export const ALL_TEMPLATES = [
  meetingTemplate,
  studyTemplate,
  personalTemplate,
];

/**
 * Get template by ID
 * @param {string} templateId - Template ID
 * @returns {Object|null} Template object
 */
export const getTemplateById = (templateId) => {
  return ALL_TEMPLATES.find(t => t.id === templateId) || null;
};

/**
 * Get template colors for styling
 * @param {string} color - Color name
 * @returns {Object} Tailwind classes
 */
export const getTemplateColors = (color) => {
  const colors = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      hover: 'hover:bg-blue-500/20',
      accent: 'bg-blue-500',
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      hover: 'hover:bg-green-500/20',
      accent: 'bg-green-500',
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      hover: 'hover:bg-pink-500/20',
      accent: 'bg-pink-500',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      hover: 'hover:bg-purple-500/20',
      accent: 'bg-purple-500',
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      hover: 'hover:bg-orange-500/20',
      accent: 'bg-orange-500',
    },
  };

  return colors[color] || colors.blue;
};

/**
 * Helper: Get today's date as YYYY-MM-DD
 */
export function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Helper: Get tomorrow's date as YYYY-MM-DD
 */
export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Helper: Get next week's date as YYYY-MM-DD
 */
export function getNextWeekDate() {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return nextWeek.toISOString().split('T')[0];
}
