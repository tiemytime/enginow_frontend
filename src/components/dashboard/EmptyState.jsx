import PropTypes from 'prop-types';

// Default Icon
const DefaultIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

DefaultIcon.propTypes = {
  className: PropTypes.string,
};

/**
 * EmptyState Component - Display when no tasks are available
 */
const EmptyState = ({
  title = 'No tasks yet',
  message = 'Create your first task to get started!',
  icon: IconComponent = DefaultIcon, // eslint-disable-line no-unused-vars
  action,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-16 px-4 text-center
        animate-fade-in
        ${className}
      `}
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-blue/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 p-8 rounded-full">
            <IconComponent className="w-24 h-24 text-accent-blue" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-text-primary mb-2">
        {title}
      </h3>

      {/* Message */}
      <p className="text-text-secondary max-w-md mb-8">
        {message}
      </p>

      {/* Action Button */}
      {action && (
        <div className="animate-bounce-subtle">
          {action}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.elementType,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default EmptyState;
