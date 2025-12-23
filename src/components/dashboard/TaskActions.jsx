import PropTypes from 'prop-types';
import Dropdown, { DropdownItem, DropdownDivider } from '../common/Dropdown';

/**
 * TaskActions Component - Action buttons for task cards
 */
const TaskActions = ({
  onEdit,
  onDelete,
  onToggleComplete,
  isCompleted,
  className = '',
}) => {
  const trigger = (
    <button
      className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary-dark transition-colors duration-200"
      aria-label="Task actions"
    >
      <MoreIcon className="w-5 h-5" />
    </button>
  );

  return (
    <div className={className}>
      <Dropdown trigger={trigger} align="right">
        <DropdownItem
          onClick={onToggleComplete}
          icon={isCompleted ? UndoIcon : CheckIcon}
        >
          {isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
        </DropdownItem>
        
        <DropdownItem onClick={onEdit} icon={EditIcon}>
          Edit Task
        </DropdownItem>
        
        <DropdownDivider />
        
        <DropdownItem onClick={onDelete} icon={DeleteIcon} variant="danger">
          Delete Task
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

TaskActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

// Icons
const MoreIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UndoIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

MoreIcon.propTypes = { className: PropTypes.string };
CheckIcon.propTypes = { className: PropTypes.string };
UndoIcon.propTypes = { className: PropTypes.string };
EditIcon.propTypes = { className: PropTypes.string };
DeleteIcon.propTypes = { className: PropTypes.string };

export default TaskActions;
