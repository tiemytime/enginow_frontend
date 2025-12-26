import PropTypes from 'prop-types';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed === true).length,
    pending: tasks.filter(t => t.completed === false).length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ClipboardDocumentListIcon,
      bgColor: 'bg-zinc-950/80',
      iconBg: 'bg-blue-600/10',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-500',
      borderColor: 'border-white/10',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      bgColor: 'bg-zinc-950/80',
      iconBg: 'bg-green-600/10',
      iconColor: 'text-green-500',
      textColor: 'text-green-500',
      borderColor: 'border-white/10',
      subtitle: `${completionRate}% completion rate`,
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      bgColor: 'bg-zinc-950/80',
      iconBg: 'bg-amber-600/10',
      iconColor: 'text-amber-500',
      textColor: 'text-amber-500',
      borderColor: 'border-white/10',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-zinc-950/80',
      iconBg: 'bg-red-600/10',
      iconColor: 'text-red-500',
      textColor: 'text-red-500',
      borderColor: 'border-white/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border ${stat.borderColor}
                       hover:border-white/20 hover:shadow-xl
                       transition-all duration-300 group relative overflow-hidden
                       aspect-square flex flex-col justify-between`}
          >
            {/* Icon at top */}
            <div className="flex justify-start">
              <div className={`p-2 sm:p-3 rounded-xl ${stat.iconBg} 
                            group-hover:scale-105 transition-transform duration-300`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
            </div>

            {/* Content at bottom */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 tracking-wide">
                {stat.label}
              </h3>
              
              {/* Progress bar - subtle */}
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full ${stat.iconColor.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                  style={{ 
                    width: stat.label === 'Completed' 
                      ? `${completionRate}%` 
                      : `${stats.total > 0 ? (stat.value / stats.total) * 100 : 0}%` 
                  }}
                ></div>
              </div>

              {/* Value */}
              <div className="flex items-end justify-between">
                <div className="text-[10px] sm:text-xs font-medium text-gray-600">
                  {stat.label === 'Completed' ? `${completionRate}%` : 'Tasks'}
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${stat.textColor}
                              group-hover:scale-105 transition-transform duration-300`}>
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TaskStats.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      dueDate: PropTypes.string,
    })
  ).isRequired,
};

export default TaskStats;
