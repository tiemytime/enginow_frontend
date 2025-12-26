import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  RectangleStackIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

/**
 * RightSidebar Component - Black Theme
 * Features: Quick Actions, Time Clock, Calendar, Overall Progress
 */
const RightSidebar = ({ 
  tasks = [],
  onTemplates,
  onFilterToggle,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // Update time every second for the flip clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  // Quick action buttons - Templates and Filters
  const quickActions = [
    {
      label: 'Templates',
      icon: RectangleStackIcon,
      onClick: onTemplates,
      color: 'bg-purple-600/90',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      label: 'Filters',
      icon: FunnelIcon,
      onClick: onFilterToggle,
      color: 'bg-indigo-600/90',
      hoverColor: 'hover:bg-indigo-600',
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
                     rounded-lg transition-all duration-200 cursor-pointer text-sm
                     ${isToday 
                       ? 'bg-indigo-600 text-white shadow-lg' 
                       : 'hover:bg-white/5'
                     }`}
        >
          <span className={`font-medium ${isToday ? 'text-white' : 'text-gray-300'}`}>
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
    <aside className="w-96 bg-black/95 backdrop-blur-xl border-l border-white/5 
                      flex flex-col h-screen sticky top-0">
      {/* Quick Actions Section */}
      <div className="p-6 border-b border-white/5">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`${action.color} ${action.hoverColor}
                         p-4 rounded-xl text-white text-left
                         transition-all duration-200 shadow-lg
                         hover:scale-105 active:scale-95 group`}
              >
                <Icon className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Clock Section */}
      <div className="p-6 border-b border-white/5">
        <div className="bg-zinc-950 rounded-lg p-4 backdrop-blur-sm border border-white/5">
          {/* Date */}
          <div className="text-center mb-3">
            <p className="text-xs text-gray-500 font-medium">
              {time.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Flip Clock Display */}
          <div className="flex justify-center items-center space-x-3">
            {/* Hours */}
            <div className="flex space-x-1.5">
              <FlipDigit value={time.getHours().toString().padStart(2, '0')[0]} />
              <FlipDigit value={time.getHours().toString().padStart(2, '0')[1]} />
            </div>
            
            {/* Separator */}
            <div className="flex flex-col space-y-2 px-1">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
            
            {/* Minutes */}
            <div className="flex space-x-1.5">
              <FlipDigit value={time.getMinutes().toString().padStart(2, '0')[0]} />
              <FlipDigit value={time.getMinutes().toString().padStart(2, '0')[1]} />
            </div>
          </div>
          
          {/* Time Labels */}
          <div className="flex justify-center items-center space-x-12 mt-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide font-medium">HOUR</span>
            <span className="text-xs text-gray-600 uppercase tracking-wide font-medium">MIN</span>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="p-6 border-b border-white/5 flex-1 overflow-y-auto">
        <div className="bg-zinc-950 rounded-xl p-4 backdrop-blur-sm border border-white/5">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 
                       hover:text-gray-200 transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-200">{monthName}</h3>
              <p className="text-xs text-gray-500">{year}</p>
            </div>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 
                       hover:text-gray-200 transition-all"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center">
                  <span className="text-xs text-gray-600 font-medium">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-zinc-950 rounded-xl p-3 backdrop-blur-sm border border-white/5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <span className="text-gray-500">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-500">Done</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-gray-500">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Section */}
      <div className="p-6 border-t border-white/5">
        <div className="bg-zinc-950 rounded-xl p-4 backdrop-blur-sm border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">Overall Progress</h3>
            <span className="text-2xl font-bold text-indigo-500">
              {progress}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-indigo-600 
                         rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-gray-500">
              {tasks.filter(t => t.completed).length} / {tasks.length} tasks
            </span>
            <span className="text-green-500 font-medium">
              {tasks.filter(t => t.completed).length} completed
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

/**
 * FlipDigit Component
 * Individual flip clock digit with gradient background
 */
const FlipDigit = ({ value }) => {
  return (
    <div className="relative">
      <div className="w-16 h-20 bg-gradient-to-br from-zinc-900 to-black 
                      rounded-lg border border-white/10 shadow-lg
                      flex items-center justify-center">
        <span className="text-5xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-br from-indigo-400 to-indigo-500">
          {value}
        </span>
      </div>
      {/* Flip effect line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-white/10"></div>
      </div>
    </div>
  );
};

RightSidebar.propTypes = {
  tasks: PropTypes.array,
  onTemplates: PropTypes.func.isRequired,
  onFilterToggle: PropTypes.func.isRequired,
};

export default RightSidebar;
