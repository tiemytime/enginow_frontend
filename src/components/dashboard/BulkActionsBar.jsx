import PropTypes from 'prop-types';
import { 
  XMarkIcon, 
  CheckIcon, 
  TrashIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

/**
 * BulkActionsBar - Action bar shown when tasks are selected
 */
const BulkActionsBar = ({ 
  selectedCount, 
  onCompleteSelected, 
  onDeleteSelected, 
  onExportSelected,
  onCancel 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-6 py-4">
          {/* Selected Count */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
              {selectedCount}
            </div>
            <span className="font-medium">
              {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'} selected
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/20" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Complete Selected */}
            <button
              onClick={onCompleteSelected}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                       transition-all duration-200 flex items-center gap-2 font-medium
                       hover:scale-105 active:scale-95"
              title="Mark selected as complete"
            >
              <CheckIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Complete</span>
            </button>

            {/* Delete Selected */}
            <button
              onClick={onDeleteSelected}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-red-500/50 
                       transition-all duration-200 flex items-center gap-2 font-medium
                       hover:scale-105 active:scale-95"
              title="Delete selected tasks"
            >
              <TrashIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>

            {/* Export Selected */}
            <button
              onClick={onExportSelected}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                       transition-all duration-200 flex items-center gap-2 font-medium
                       hover:scale-105 active:scale-95"
              title="Export selected tasks"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/20" />

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200
                     hover:scale-110 active:scale-95"
            title="Cancel selection"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

BulkActionsBar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onCompleteSelected: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
  onExportSelected: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BulkActionsBar;
