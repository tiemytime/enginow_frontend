import { useState, useCallback } from 'react';

/**
 * Custom hook for managing bulk task selection and actions
 */
export const useBulkActions = () => {
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Toggle selection mode
  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode(prev => !prev);
    if (isSelectionMode) {
      setSelectedTasks(new Set());
    }
  }, [isSelectionMode]);

  // Select/deselect a task
  const toggleTaskSelection = useCallback((taskId) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  // Select all tasks
  const selectAll = useCallback((taskIds) => {
    setSelectedTasks(new Set(taskIds));
  }, []);

  // Deselect all tasks
  const deselectAll = useCallback(() => {
    setSelectedTasks(new Set());
  }, []);

  // Check if task is selected
  const isSelected = useCallback((taskId) => {
    return selectedTasks.has(taskId);
  }, [selectedTasks]);

  // Get selected task IDs as array
  const getSelectedTaskIds = useCallback(() => {
    return Array.from(selectedTasks);
  }, [selectedTasks]);

  // Get selected count
  const selectedCount = selectedTasks.size;

  // Has any selection
  const hasSelection = selectedCount > 0;

  return {
    selectedTasks,
    selectedCount,
    hasSelection,
    isSelectionMode,
    toggleSelectionMode,
    toggleTaskSelection,
    selectAll,
    deselectAll,
    isSelected,
    getSelectedTaskIds,
  };
};

export default useBulkActions;
