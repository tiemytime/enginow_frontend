import { format, formatDistance, isPast, isToday, isTomorrow, parseISO } from 'date-fns';

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format time to readable string (12-hour format)
 * @param {string} time - Time in HH:MM format
 * @returns {string} Formatted time (e.g., "2:30 PM")
 */
export const formatTime = (time) => {
  if (!time) return '';
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return time;
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};

/**
 * Check if date is in the past
 * @param {string|Date} date - Date to check
 * @returns {boolean}
 */
export const isDatePast = (date) => {
  if (!date) return false;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isPast(dateObj);
  } catch {
    return false;
  }
};

/**
 * Check if date is today
 * @param {string|Date} date - Date to check
 * @returns {boolean}
 */
export const isDateToday = (date) => {
  if (!date) return false;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isToday(dateObj);
  } catch {
    return false;
  }
};

/**
 * Check if date is tomorrow
 * @param {string|Date} date - Date to check
 * @returns {boolean}
 */
export const isDateTomorrow = (date) => {
  if (!date) return false;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isTomorrow(dateObj);
  } catch {
    return false;
  }
};

/**
 * Get countdown text (e.g., "Due in 2 hours", "Overdue by 1 day")
 * @param {string|Date} dueDate - Due date
 * @param {string} dueTime - Due time (optional)
 * @returns {string} Countdown text
 */
export const getCountdownText = (dueDate, dueTime) => {
  if (!dueDate) return '';
  
  try {
    let dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    
    // If time is provided, combine date and time
    if (dueTime) {
      const [hours, minutes] = dueTime.split(':');
      dateObj = new Date(dateObj);
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    }
    
    const now = new Date();
    const diffMs = dateObj - now;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Overdue
    if (diffMs < 0) {
      const absDays = Math.abs(diffDays);
      const absHours = Math.abs(diffHours);
      const absMinutes = Math.abs(diffMinutes);
      
      if (absDays > 0) {
        return `Overdue by ${absDays} day${absDays > 1 ? 's' : ''}`;
      } else if (absHours > 0) {
        return `Overdue by ${absHours} hour${absHours > 1 ? 's' : ''}`;
      } else {
        return `Overdue by ${absMinutes} minute${absMinutes > 1 ? 's' : ''}`;
      }
    }
    
    // Due soon
    if (diffMinutes < 60) {
      return `Due in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      return `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Error getting countdown:', error);
    return '';
  }
};

/**
 * Get input value for date input (YYYY-MM-DD format)
 * @param {string|Date} date - Date
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getDateInputValue = (date) => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  } catch {
    return '';
  }
};

/**
 * Combine date and time into ISO string
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {string} time - Time string (HH:MM)
 * @returns {string} ISO date-time string
 */
export const combineDateAndTime = (date, time) => {
  if (!date) return null;
  
  try {
    const dateObj = new Date(date);
    
    if (time) {
      const [hours, minutes] = time.split(':');
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    } else {
      dateObj.setHours(23, 59, 59, 999);
    }
    
    return dateObj.toISOString();
  } catch (error) {
    console.error('Error combining date and time:', error);
    return null;
  }
};

/**
 * Get minimum date for date input (today)
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getMinDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
