import PropTypes from 'prop-types';

/**
 * Card Component - Reusable container with glass effect
 */
const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  // Variant styles
  const variants = {
    default: 'glass-effect',
    strong: 'glass-effect-strong',
    subtle: 'bg-secondary-dark/30 backdrop-blur-sm',
    gradient: 'bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 backdrop-blur-md',
  };

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Hover effect
  const hoverEffect = hover
    ? 'hover:scale-[1.02] hover:shadow-glow-blue cursor-pointer'
    : '';

  const cardClasses = `
    rounded-lg border border-border
    transition-all duration-300
    ${variants[variant]}
    ${paddings[padding]}
    ${hoverEffect}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'strong', 'subtle', 'gradient']),
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Card;
