import { useMemo, useState, useCallback } from 'react';
import {
  filterTasksByStatus,
  filterTasksByPriority,
  filterTasksBySearch,
  sortTasks,
  getTaskStats,
} from '../utils/taskHelpers';

/**
 * Custom hook for task filtering and sorting
 */
export const useTaskFilters = (tasks = []) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'dueDate',
  });

  // Apply filters and sorting
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filters.status !== 'all') {
      result = filterTasksByStatus(result, filters.status);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      result = filterTasksByPriority(result, filters.priority);
    }

    // Filter by search
    if (filters.search) {
      result = filterTasksBySearch(result, filters.search);
    }

    // Sort
    result = sortTasks(result, filters.sortBy);

    return result;
  }, [tasks, filters]);

  // Get task statistics
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      priority: 'all',
      search: '',
      sortBy: 'dueDate',
    });
  }, []);

  return {
    filters,
    filteredTasks,
    stats,
    setFilters,
    clearFilters,
    hasFilters: filters.status !== 'all' || filters.priority !== 'all' || filters.search !== '',
  };
};
