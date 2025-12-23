import { VALIDATION, ERROR_MESSAGES } from './constants';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  return null;
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  if (!/\d/.test(password)) {
    return ERROR_MESSAGES.PASSWORD_NO_NUMBER;
  }
  return null;
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateName = (name) => {
  if (!name) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  return null;
};

/**
 * Validate task title
 * @param {string} title - Title to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateTitle = (title) => {
  if (!title) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (title.trim().length === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (title.length > VALIDATION.TITLE_MAX_LENGTH) {
    return ERROR_MESSAGES.TITLE_TOO_LONG;
  }
  return null;
};

/**
 * Validate task description
 * @param {string} description - Description to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateDescription = (description) => {
  if (description && description.length > VALIDATION.DESCRIPTION_MAX_LENGTH) {
    return ERROR_MESSAGES.DESCRIPTION_TOO_LONG;
  }
  return null;
};

/**
 * Validate due date
 * @param {string} date - Date to validate (YYYY-MM-DD format)
 * @returns {string|null} Error message or null if valid
 */
export const validateDueDate = (date) => {
  if (!date) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return ERROR_MESSAGES.DATE_IN_PAST;
  }
  
  return null;
};

/**
 * Validate time format
 * @param {string} time - Time to validate (HH:MM format)
 * @returns {string|null} Error message or null if valid
 */
export const validateTime = (time) => {
  if (!time) {
    return null; // Time is optional
  }
  
  if (!VALIDATION.TIME_FORMAT_REGEX.test(time)) {
    return ERROR_MESSAGES.INVALID_TIME_FORMAT;
  }
  
  return null;
};

/**
 * Validate priority
 * @param {string} priority - Priority to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePriority = (priority) => {
  if (!priority) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
    return 'Priority must be low, medium, or high';
  }
  
  return null;
};

/**
 * Validate entire login form
 * @param {Object} formData - Form data { email, password }
 * @returns {Object} Errors object
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

/**
 * Validate entire signup form
 * @param {Object} formData - Form data { name, email, password }
 * @returns {Object} Errors object
 */
export const validateSignupForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

/**
 * Validate task form
 * @param {Object} formData - Form data
 * @returns {Object} Errors object
 */
export const validateTaskForm = (formData) => {
  const errors = {};
  
  const titleError = validateTitle(formData.title);
  if (titleError) errors.title = titleError;
  
  const descriptionError = validateDescription(formData.description);
  if (descriptionError) errors.description = descriptionError;
  
  const dueDateError = validateDueDate(formData.dueDate);
  if (dueDateError) errors.dueDate = dueDateError;
  
  const timeError = validateTime(formData.dueTime);
  if (timeError) errors.dueTime = timeError;
  
  const priorityError = validatePriority(formData.priority);
  if (priorityError) errors.priority = priorityError;
  
  return errors;
};

/**
 * Check if errors object is empty
 * @param {Object} errors - Errors object
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
