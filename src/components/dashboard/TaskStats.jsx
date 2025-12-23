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
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
      iconBg: 'bg-white',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      bgColor: 'bg-gradient-to-br from-green-500/20 to-green-600/20',
      iconBg: 'bg-white',
      iconColor: 'text-green-600',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      subtitle: `${completionRate}% completion rate`,
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      bgColor: 'bg-gradient-to-br from-amber-500/20 to-amber-600/20',
      iconBg: 'bg-white',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-gradient-to-br from-red-500/20 to-red-600/20',
      iconBg: 'bg-white',
      iconColor: 'text-red-600',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} backdrop-blur-sm rounded-3xl p-6 border ${stat.borderColor}
                       hover:scale-105 hover:shadow-2xl hover:shadow-${stat.textColor}/20
                       transition-all duration-300 group relative overflow-hidden
                       aspect-square flex flex-col justify-between`}
          >
            {/* Decorative dots in top right */}
            <div className="absolute top-4 right-4 flex gap-1 opacity-30">
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>

            {/* Icon at top */}
            <div className="flex justify-start">
              <div className={`p-3 rounded-full ${stat.iconBg} shadow-lg
                            group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>

            {/* Content at bottom */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-300 tracking-wide">
                {stat.label}
              </h3>
              
              {/* Progress bar */}
              <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full ${stat.iconColor.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                  style={{ 
                    width: stat.label === 'Completed' 
                      ? `${completionRate}%` 
                      : `${stats.total > 0 ? (stat.value / stats.total) * 100 : 0}%` 
                  }}
                ></div>
              </div>

              {/* Value and percentage */}
              <div className="flex items-end justify-between">
                <div className={`text-xs font-semibold ${stat.textColor}`}>
                  Progress
                </div>
                <div className={`text-2xl font-bold ${stat.textColor}
                              group-hover:scale-110 transition-transform duration-300`}>
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
