import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import Button from '../common/Button';

/**
 * TaskList Component - Display tasks with drag & drop
 */
const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onComplete,
  onReorder,
  enableDragDrop = true,
  loading = false,
  emptyMessage,
  emptyAction,
  className = '',
}) => {
  const [localTasks, setLocalTasks] = useState(tasks);

  // Update local tasks when prop changes
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Drag & Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localTasks.findIndex((task) => task._id === active.id);
      const newIndex = localTasks.findIndex((task) => task._id === over.id);

      const newTasks = arrayMove(localTasks, oldIndex, newIndex);
      setLocalTasks(newTasks);

      if (onReorder) {
        onReorder(newTasks);
      }
    }
  };

  // Update local tasks when prop changes
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Empty state
  if (!loading && tasks.length === 0) {
    return (
      <EmptyState
        message={emptyMessage}
        action={emptyAction}
        className={className}
      />
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // With drag & drop
  if (enableDragDrop) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localTasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={`grid gap-4 ${className}`}>
            {localTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task)}
                onToggleComplete={() => onComplete(task)}
                isDraggable={!task.completed}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  // Without drag & drop
  return (
    <div className={`grid gap-4 ${className}`}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          onToggleComplete={() => onComplete(task)}
          isDraggable={false}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onReorder: PropTypes.func,
  enableDragDrop: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  emptyAction: PropTypes.node,
  className: PropTypes.string,
};

TaskList.defaultProps = {
  emptyMessage: 'No tasks found. Create one to get started!',
  emptyAction: <Button variant="primary">Create Task</Button>,
};

export default TaskList;
