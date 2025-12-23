import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '../common/Card';
import Badge from '../common/Badge';
import TaskActions from './TaskActions';
import { formatDate, formatTime, getRelativeTime } from '../../utils/dateUtils';
import { getPriorityVariant, getPriorityLabel, isTaskOverdue, isTaskDueSoon } from '../../utils/taskHelpers';

/**
 * TaskCard Component - Display individual task with drag & drop
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

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        variant="default"
        hover={!task.completed}
        className={`
          group relative overflow-hidden
          ${task.completed ? 'opacity-60' : ''}
          ${isDragging ? 'shadow-2xl ring-2 ring-accent-blue' : ''}
        `}
      >
        {/* Drag Handle */}
        {isDraggable && !task.completed && (
          <div
            {...attributes}
            {...listeners}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <DragIcon className="w-5 h-5 text-text-muted" />
          </div>
        )}

        {/* Content */}
        <div className={isDraggable ? 'pl-6' : ''}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3
                className={`
                  text-lg font-semibold text-text-primary mb-1
                  ${task.completed ? 'line-through' : ''}
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
                    Overdue
                  </Badge>
                )}

                {dueSoon && !task.completed && (
                  <Badge variant="warning" size="sm">
                    Due Soon
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
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Footer */}
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <ClockIcon className="w-4 h-4" />
              <div>
                <span className={overdue ? 'text-danger' : dueSoon ? 'text-warning' : ''}>
                  {formatDate(task.dueDate)}
                  {task.dueTime && ` at ${formatTime(task.dueDate)}`}
                </span>
                <span className="ml-2 text-xs">
                  ({getRelativeTime(task.dueDate)})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Completion Overlay */}
        {task.completed && (
          <div className="absolute inset-0 bg-success/5 pointer-events-none" />
        )}
      </Card>
    </div>
  );
};

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

// Icons
const DragIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

DragIcon.propTypes = { className: PropTypes.string };
ClockIcon.propTypes = { className: PropTypes.string };

export default TaskCard;
