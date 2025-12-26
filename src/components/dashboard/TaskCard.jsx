import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Badge from '../common/Badge';
import TaskActions from './TaskActions';
import { formatDate } from '../../utils/dateUtils';
import { getPriorityVariant, getPriorityLabel, isTaskOverdue, isTaskDueSoon } from '../../utils/taskHelpers';

/**
 * TaskCard Component - Modern dark mode task card with enhanced styling
 */
const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isDraggable = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const overdue = isTaskOverdue(task.dueDate, task.completed);
  const dueSoon = isTaskDueSoon(task.dueDate, task.completed);

  // Get blur background gradient based on priority
  const getBlurBackground = () => {
    if (task.completed) return 'bg-gradient-to-br from-emerald-600/25 via-green-600/20 to-teal-600/25';
    
    switch (getPriorityVariant(task.priority)) {
      case 'high':
        return 'bg-gradient-to-br from-red-600/40 via-orange-600/30 to-pink-600/40';
      case 'medium':
        return 'bg-gradient-to-br from-amber-600/40 via-yellow-600/30 to-orange-500/40';
      case 'low':
        return 'bg-gradient-to-br from-green-600/40 via-emerald-600/30 to-teal-600/40';
      default:
        return 'bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-blue-600/40';
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative">
        {/* Main Card with Glass Effect */}
        <div
          className={`
            group relative overflow-hidden rounded-xl p-6
            transition-all duration-300
            ${!task.completed ? 'hover:shadow-xl hover:-translate-y-0.5' : 'hover:shadow-lg'}
            ${isDragging ? 'shadow-2xl ring-2 ring-indigo-500 scale-105' : ''}
          `}
          style={{
            background: task.completed ? 'rgba(20, 25, 20, 0.7)' : 'rgba(20, 20, 25, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: task.completed ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Warm Blur Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${getBlurBackground()} rounded-full blur-3xl opacity-60 transition-all duration-300`}></div>
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 ${getBlurBackground()} rounded-full blur-3xl opacity-40 transition-all duration-300`}></div>
          </div>

          {/* Accent Bar - Left side colored indicator */}
          <div className={`
            absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 z-10
            ${task.completed ? 'bg-emerald-500' : ''}
            ${!task.completed && getPriorityVariant(task.priority) === 'high' ? 'bg-red-500' : ''}
            ${!task.completed && getPriorityVariant(task.priority) === 'medium' ? 'bg-amber-500' : ''}
            ${!task.completed && getPriorityVariant(task.priority) === 'low' ? 'bg-green-500' : ''}
          `} />

          {/* Content Container */}
          <div className="relative z-10">

        {/* Drag Handle */}
        {isDraggable && !task.completed && (
          <div
            {...attributes}
            {...listeners}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing 
                     opacity-0 group-hover:opacity-100 transition-opacity z-10 pl-1"
          >
            <DragIcon className="w-4 h-4 text-slate-500 hover:text-indigo-400 transition-colors" />
          </div>
        )}

        {/* Content */}
        <div className={isDraggable ? 'pl-7' : ''}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3
                className={`
                  text-lg font-semibold mb-2 transition-all duration-300 text-slate-100
                `}
              >
                {task.title}
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={getPriorityVariant(task.priority)} size="sm">
                  {getPriorityLabel(task.priority)}
                </Badge>

                {task.completed && (
                  <Badge variant="success" size="sm">
                    ✓ Completed
                  </Badge>
                )}

                {overdue && !task.completed && (
                  <Badge variant="danger" size="sm">
                    ⚠ Overdue
                  </Badge>
                )}

                {dueSoon && !task.completed && (
                  <Badge variant="warning" size="sm">
                    ⏰ Due Soon
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <TaskActions
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              isCompleted={task.completed}
            />
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm mb-4 line-clamp-2 transition-all duration-300 text-slate-400">
              {task.description}
            </p>
          )}

          {/* Footer - Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
              <ClockIcon className="w-4 h-4 text-slate-500" />
              <span className={`text-sm ${
                overdue && !task.completed 
                  ? 'text-red-400 font-semibold' 
                  : dueSoon && !task.completed
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-500'
              }`}>
                {formatDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} 
          d="M5 13l4 4L19 7" />
  </svg>
);
const DragIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

DragIcon.propTypes = { className: PropTypes.string };
ClockIcon.propTypes = { className: PropTypes.string };

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    dueTime: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  isDraggable: PropTypes.bool,
};

export default TaskCard;
