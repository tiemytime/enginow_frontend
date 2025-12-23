import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  PlusIcon, 
  RectangleStackIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

/**
 * QuickActionsMenu - Floating action button with menu
 */
const QuickActionsMenu = ({ 
  onCreateTask, 
  onTemplates, 
  onBulkSelect,
  onExport 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: 'Create Task',
      icon: PlusIcon,
      onClick: () => {
        onCreateTask();
        setIsOpen(false);
      },
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
    {
      label: 'Templates',
      icon: RectangleStackIcon,
      onClick: () => {
        onTemplates();
        setIsOpen(false);
      },
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      label: 'Bulk Select',
      icon: Squares2X2Icon,
      onClick: () => {
        onBulkSelect();
        setIsOpen(false);
      },
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Export All',
      icon: ArrowDownTrayIcon,
      onClick: () => {
        onExport();
        setIsOpen(false);
      },
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Menu Items */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-slide-up">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className="flex items-center gap-3 justify-end animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-gray-900/90 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-gray-700/50">
                  {action.label}
                </span>
                <button
                  onClick={action.onClick}
                  className={`${action.color} text-white p-4 rounded-full shadow-lg
                           transition-all duration-200 hover:scale-110 active:scale-95
                           border border-white/20`}
                  title={action.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-5 
                   rounded-full shadow-2xl transition-all duration-300 border-2 border-white/20
                   hover:scale-110 active:scale-95 backdrop-blur-xl
                   ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        title="Quick Actions"
      >
        {isOpen ? (
          <PlusIcon className="w-6 h-6" />
        ) : (
          <CheckCircleIcon className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

QuickActionsMenu.propTypes = {
  onCreateTask: PropTypes.func.isRequired,
  onTemplates: PropTypes.func.isRequired,
  onBulkSelect: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default QuickActionsMenu;
