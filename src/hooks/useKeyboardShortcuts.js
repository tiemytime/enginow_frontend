import { useEffect, useCallback } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to callbacks
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export const useKeyboardShortcuts = (shortcuts = {}, enabled = true) => {
  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in input fields
    const isInputField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
      event.target.tagName
    );
    
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // Build key combination string
    let combination = '';
    if (ctrl) combination += 'ctrl+';
    if (shift) combination += 'shift+';
    if (alt) combination += 'alt+';
    combination += key;

    // Execute callback if shortcut matches
    if (shortcuts[combination]) {
      // Allow shortcuts even in input fields for certain keys (like Escape)
      if (key === 'escape' || !isInputField) {
        event.preventDefault();
        shortcuts[combination](event);
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

/**
 * Common keyboard shortcuts configuration
 */
export const SHORTCUTS = {
  NEW_TASK: 'ctrl+n',
  SEARCH: 'ctrl+f',
  CLOSE: 'escape',
  SAVE: 'ctrl+s',
  DELETE: 'delete',
  SELECT_ALL: 'ctrl+a',
  REFRESH: 'ctrl+r',
  HELP: 'shift+?',
};

export default useKeyboardShortcuts;
