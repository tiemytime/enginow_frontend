import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Input Component with validation
 */
const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled = false,
  required = false,
  autoComplete,
  maxLength,
  className = '',
  icon: Icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Determine actual input type
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  // Base input styles - Black text for better readability
  const baseInputStyles = 'w-full px-4 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 border rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium';
  
  // Border styles based on state
  const borderStyles = error
    ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger focus:ring-opacity-20'
    : isFocused
    ? 'border-accent-blue ring-2 ring-accent-blue ring-opacity-20 shadow-glow-blue'
    : 'border-border hover:border-border-hover';

  // Icon padding
  const iconPadding = Icon ? 'pl-12' : '';

  const inputClasses = `${baseInputStyles} ${borderStyles} ${iconPadding} ${className}`;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {/* Input Field */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />

        {/* Password Toggle Button */}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {/* Character Count */}
        {maxLength && value && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1.5 text-sm text-red-400 animate-slide-down"
        >
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  showPasswordToggle: PropTypes.bool,
};

// Eye Icons for password visibility toggle
const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default Input;
