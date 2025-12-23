import { useContext } from 'react';
import ToastContext from '../context/ToastContext';

/**
 * Custom hook to use toast context
 * Extracted to separate file for better Fast Refresh support
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
