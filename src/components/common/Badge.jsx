import PropTypes from 'prop-types';

/**
 * Badge Component - Display status, priority, or category labels
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  // Variant styles - Dark mode optimized
  const variants = {
    default: 'bg-slate-700 text-slate-300 border-slate-600',
    primary: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
    success: 'bg-green-500/20 text-green-400 border-green-500/50',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    danger: 'bg-red-500/20 text-red-400 border-red-500/50',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    high: 'bg-red-500/20 text-red-400 border-red-500/50 font-semibold',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    low: 'bg-green-500/20 text-green-400 border-green-500/50',
  };

  // Size styles
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const badgeClasses = `
    inline-flex items-center justify-center
    rounded-full border font-medium
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'purple',
    'high',
    'medium',
    'low',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;
