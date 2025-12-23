import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown Component - Reusable dropdown menu
 */
const Dropdown = ({
  trigger,
  children,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const alignments = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 z-50
            min-w-[12rem]
            glass-effect-strong rounded-lg border border-border
            shadow-2xl
            animate-slide-down
            ${alignments[align]}
            ${className}
          `}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
};

/**
 * DropdownItem Component - Individual dropdown item
 */
export const DropdownItem = ({
  children,
  onClick,
  icon: Icon,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'hover:bg-secondary-dark text-text-primary',
    danger: 'hover:bg-danger/10 text-danger',
    success: 'hover:bg-success/10 text-success',
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-2 text-left text-sm
        flex items-center gap-3
        transition-colors duration-200
        ${variants[variant]}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(['default', 'danger', 'success']),
  className: PropTypes.string,
};

/**
 * DropdownDivider Component - Visual separator
 */
export const DropdownDivider = () => (
  <div className="my-1 border-t border-border" />
);

export default Dropdown;
