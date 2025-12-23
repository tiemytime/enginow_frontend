import PropTypes from 'prop-types';

/**
 * Reusable Button Component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'btn-press ripple font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark';

  // Variant styles
  const variants = {
    primary: 'bg-gradient-blue text-white hover:shadow-glow-blue focus:ring-accent-blue',
    secondary: 'bg-secondary-dark text-text-primary border border-border hover:border-border-hover hover:bg-opacity-80 focus:ring-accent-purple',
    success: 'bg-gradient-success text-white hover:shadow-glow-success focus:ring-success',
    danger: 'bg-gradient-to-r from-danger to-red-600 text-white hover:shadow-glow-danger focus:ring-danger',
    warning: 'bg-gradient-warm-subtle text-white hover:shadow-glow-warm focus:ring-warning',
    outline: 'bg-transparent border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white focus:ring-accent-blue',
    ghost: 'bg-transparent text-text-primary hover:bg-secondary-dark focus:ring-accent-blue',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="spinner w-5 h-5" viewBox="0 0 24 24" fill="none">
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
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
