import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

/**
 * FilterSidebar - Sliding filter panel from right
 */
const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = 
    filters.search || 
    filters.status !== 'all' || 
    filters.priority !== 'all' ||
    filters.sortBy !== 'dueDate';

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[1200]
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-800 shadow-2xl 
          transform transition-transform duration-300 ease-out z-[1201]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/20 rounded-lg">
                <FunnelIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Filters</h2>
                <p className="text-sm text-slate-400">Refine your task view</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close filters"
            >
              <XMarkIcon className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search Field */}
            <div>
              <label htmlFor="filter-search" className="block text-sm font-semibold text-slate-300 mb-3">
                Search Tasks
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="filter-search"
                  value={filters.search}
                  onChange={(e) => handleChange('search', e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full pl-11 pr-10 py-3 bg-slate-900 border border-slate-700 
                           rounded-lg text-slate-100 placeholder-slate-500
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                           transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                {filters.search && (
                  <button
                    onClick={() => handleChange('search', '')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700 
                             rounded transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="filter-status" className="block text-sm font-semibold text-slate-300 mb-3">
                Status
              </label>
              <select
                id="filter-status"
                value={filters.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg 
                         text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label htmlFor="filter-priority" className="block text-sm font-semibold text-slate-300 mb-3">
                Priority
              </label>
              <select
                id="filter-priority"
                value={filters.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg 
                         text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="filter-sort" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-4 h-4" />
                Sort By
              </label>
              <select
                id="filter-sort"
                value={filters.sortBy}
                onChange={(e) => handleChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg 
                         text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         transition-all duration-200 cursor-pointer"
              >
                <option value="dueDate">📅 Due Date</option>
                <option value="priority">⚡ Priority</option>
                <option value="createdAt">🕐 Created Date</option>
                <option value="title">🔤 Title (A-Z)</option>
              </select>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-slate-700">
                <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-indigo-300 mb-2">Active Filters</h3>
                  <div className="space-y-1 text-sm text-slate-300">
                    {filters.search && (
                      <div>• Search: <span className="text-indigo-400">"{filters.search}"</span></div>
                    )}
                    {filters.status !== 'all' && (
                      <div>• Status: <span className="text-indigo-400 capitalize">{filters.status}</span></div>
                    )}
                    {filters.priority !== 'all' && (
                      <div>• Priority: <span className="text-indigo-400 capitalize">{filters.priority}</span></div>
                    )}
                    {filters.sortBy !== 'dueDate' && (
                      <div>• Sort: <span className="text-indigo-400">{filters.sortBy}</span></div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Action Buttons */}
          <div className="p-6 border-t border-slate-700 bg-slate-900/50">
            <div className="flex gap-3">
              <button
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
                className="flex-1 px-4 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium
                         hover:bg-slate-600 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium
                         hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/50"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FilterSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;
