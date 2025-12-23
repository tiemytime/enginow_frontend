import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject({
        message: ERROR_MESSAGES.NETWORK_ERROR,
        type: 'network_error',
      });
    }
    
    // Handle 401 Unauthorized - Auto logout
    if (error.response.status === 401) {
      console.log('Unauthorized - clearing auth data');
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      return Promise.reject({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        type: 'unauthorized',
        status: 401,
      });
    }
    
    // Handle 403 Forbidden
    if (error.response.status === 403) {
      return Promise.reject({
        message: error.response.data?.message || 'Access denied',
        type: 'forbidden',
        status: 403,
      });
    }
    
    // Handle 404 Not Found
    if (error.response.status === 404) {
      return Promise.reject({
        message: error.response.data?.message || ERROR_MESSAGES.TASK_NOT_FOUND,
        type: 'not_found',
        status: 404,
      });
    }
    
    // Handle 429 Too Many Requests (Rate Limit)
    if (error.response.status === 429) {
      return Promise.reject({
        message: 'Too many requests. Please try again later.',
        type: 'rate_limit',
        status: 429,
      });
    }
    
    // Handle 500 Server Error
    if (error.response.status >= 500) {
      return Promise.reject({
        message: ERROR_MESSAGES.SERVER_ERROR,
        type: 'server_error',
        status: error.response.status,
      });
    }
    
    // Handle validation errors (400)
    if (error.response.status === 400 && error.response.data?.errors) {
      return Promise.reject({
        message: error.response.data.message || 'Validation failed',
        type: 'validation_error',
        status: 400,
        errors: error.response.data.errors,
      });
    }
    
    // Generic error
    return Promise.reject({
      message: error.response.data?.message || 'An error occurred',
      type: 'error',
      status: error.response.status,
    });
  }
);

export default axiosInstance;
