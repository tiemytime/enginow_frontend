import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * CalendarWidget Component
 * Features: Monthly calendar view with task progress bar
 */
const CalendarWidget = ({ tasks = [] }) => {
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
      {/* Progress Section */}
      <div className="p-6 border-b border-slate-700/50">
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
      <div className="p-6 flex-1 overflow-y-auto">
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
        <div className="mt-4 bg-slate-900/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
          <h4 className="text-xs font-semibold text-slate-300 mb-3">Legend</h4>
          <div className="space-y-2">
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

export default CalendarWidget;
