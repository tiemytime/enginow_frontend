import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth.api';
import { STORAGE_KEYS, SUCCESS_MESSAGES } from '../utils/constants';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    // Clear state
    setUser(null);
    setToken(null);
    setError(null);
    
    // Clear localStorage
    authApi.logout();
    
    // Redirect to login
    navigate('/login');
    
    return {
      success: true,
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
    };
  }, [navigate]);

  /**
   * Check authentication status
   */
  const checkAuth = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Verify token is still valid by fetching current user
        try {
          const response = await authApi.getCurrentUser();
          if (response.status === 'success') {
            setUser(response.data);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
          }
        } catch {
          // Token invalid, clear auth data
          logout();
        }
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Login user
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.login(credentials);

      if (response.status === 'success') {
        const { token: newToken, ...userData } = response.data;
        
        // Store in state
        setToken(newToken);
        setUser(userData);
        
        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        
        return {
          success: true,
          message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        };
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errors: err.errors || null,
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Signup new user
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.signup(userData);

      if (response.status === 'success') {
        const { token: newToken, ...user } = response.data;
        
        // Store in state
        setToken(newToken);
        setUser(user);
        
        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        
        return {
          success: true,
          message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
        };
      }
    } catch (err) {
      const errorMessage = err.message || 'Signup failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errors: err.errors || null,
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user data
   */
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token && !!user,
    login,
    signup,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
