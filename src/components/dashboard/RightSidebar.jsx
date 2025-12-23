import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PlusIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

/**
 * RightSidebar Component
 * Features: Quick Actions, Progress Bar, Calendar Widget
 */
const RightSidebar = ({ 
  tasks = [],
  onCreateTask,
  onTemplates,
  onBulkSelect,
  onExport,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calculate progress
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  }, [tasks]);

  // Get calendar data
  const { year, month, monthName, daysInMonth, firstDayOfMonth, today } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date().getDate();
    const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

    return { year, month, monthName, daysInMonth, firstDayOfMonth, today: isCurrentMonth ? today : -1 };
  }, [currentDate]);

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Get tasks for a specific day
  const getTasksForDay = (day) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === day &&
             taskDate.getMonth() === month &&
             taskDate.getFullYear() === year;
    });
  };

  // Quick action buttons
  const quickActions = [
    {
      label: 'Create Task',
      icon: PlusIcon,
      onClick: onCreateTask,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700',
    },
    {
      label: 'Templates',
      icon: RectangleStackIcon,
      onClick: onTemplates,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    },
    {
      label: 'Bulk Select',
      icon: Squares2X2Icon,
      onClick: onBulkSelect,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      label: 'Export All',
      icon: ArrowDownTrayIcon,
      onClick: onExport,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
    },
  ];

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }
    
    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const dayTasks = getTasksForDay(day);
      const hasCompletedTask = dayTasks.some(t => t.completed);
      const hasPendingTask = dayTasks.some(t => !t.completed);
      
      days.push(
        <div
          key={day}
          className={`aspect-square flex flex-col items-center justify-center
                     rounded-lg transition-all duration-200 cursor-pointer
                     ${isToday 
                       ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/50' 
                       : 'hover:bg-slate-700/50'
                     }`}
        >
          <span className={`text-sm font-medium ${isToday ? 'text-white' : 'text-slate-300'}`}>
            {day}
          </span>
          {dayTasks.length > 0 && (
            <div className="flex space-x-1 mt-1">
              {hasCompletedTask && (
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
              )}
              {hasPendingTask && (
                <div className="w-1 h-1 rounded-full bg-amber-500"></div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <aside className="w-80 bg-slate-800/50 backdrop-blur-xl border-l border-slate-700/50 
                      flex flex-col h-screen sticky top-0">
      {/* Quick Actions Section */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`w-full flex items-center justify-between px-4 py-3 
                           bg-gradient-to-r ${action.color} ${action.hoverColor}
                           text-white rounded-lg font-medium shadow-lg
                           transition-all duration-200 transform hover:scale-105
                           hover:shadow-xl group`}
              >
                <span className="text-sm font-semibold">{action.label}</span>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center
                              group-hover:bg-white/30 transition-all duration-200">
                  <Icon className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="bg-slate-900/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-200">Overall Progress</h3>
            <span className="text-2xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-indigo-400 to-purple-400">
              {progress}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 
                         rounded-full transition-all duration-500 shadow-lg shadow-indigo-900/50"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                            animate-shimmer"></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-slate-400">
              {tasks.filter(t => t.completed).length} / {tasks.length} tasks
            </span>
            <span className="text-green-400 font-medium">
              {tasks.filter(t => t.completed).length} completed
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-slate-900/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 
                       hover:text-slate-200 transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-200">{monthName}</h3>
              <p className="text-xs text-slate-500">{year}</p>
            </div>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 
                       hover:text-slate-200 transition-all"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center">
                <span className="text-xs font-semibold text-slate-500">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-slate-900/50 rounded-xl p-3 backdrop-blur-sm border border-slate-700/50">
          <h4 className="text-xs font-semibold text-slate-300 mb-2">Legend</h4>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-indigo-600 to-purple-600"></div>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-400">Completed tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-xs text-slate-400">Pending tasks</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

RightSidebar.propTypes = {
  tasks: PropTypes.array,
  onCreateTask: PropTypes.func.isRequired,
  onTemplates: PropTypes.func.isRequired,
  onBulkSelect: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default RightSidebar;
