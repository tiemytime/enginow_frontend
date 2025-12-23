import PropTypes from 'prop-types';

/**
 * Loading Spinner Component
 */
const Loader = ({ size = 'md', color = 'blue', fullScreen = false }) => {
  // Size variants
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Color variants
  const colors = {
    blue: 'text-accent-blue',
    purple: 'text-accent-purple',
    white: 'text-white',
    warm: 'text-warning',
  };

  const spinnerClasses = `spinner ${sizes[size]} ${colors[color]}`;

  const spinner = (
    <svg
      className={spinnerClasses}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-primary-darker/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-text-secondary animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['blue', 'purple', 'white', 'warm']),
  fullScreen: PropTypes.bool,
};

export default Loader;
