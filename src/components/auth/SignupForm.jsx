import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { validateSignupForm, hasErrors } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * Signup Form Component
 */
const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const { success: showSuccess, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handle input blur
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    const fieldErrors = validateSignupForm(formData);
    if (fieldErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
    });

    // Validate form
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      showError('Please fix the errors in the form');
      return;
    }

    // Submit signup
    const result = await signup(formData);

    if (result.success) {
      showSuccess(result.message);
      navigate('/dashboard');
    } else {
      showError(result.message);
      
      // Set field-specific errors if available
      if (result.errors) {
        const fieldErrors = {};
        result.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Form Header */}
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-4xl font-display font-bold text-gradient-warm mb-2">
          Get Started
        </h1>
        <p className="text-text-secondary">
          Create your account to start managing tasks
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-effect-strong rounded-xl p-8 shadow-2xl animate-scale-in"
        noValidate
      >
        <div className="space-y-6 text-black">
          {/* Name Field */}
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            placeholder="John Doe"
            required
            autoComplete="name"
            icon={UserIcon}
          />

          {/* Email Field */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            placeholder="john@example.com"
            required
            autoComplete="email"
            icon={EmailIcon}
          />

          {/* Password Field */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : ''}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            icon={LockIcon}
            showPasswordToggle={true}
          />

          {/* Password Requirements */}
          <div className="bg-secondary-dark/50 rounded-lg p-3 text-xs text-text-muted">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 6 characters</li>
              <li>Must contain at least one number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="warning"
            size="lg"
            fullWidth
            loading={loading}
          >
            Create Account
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-warning hover:text-orange-400 transition-colors duration-200 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

// Icons
const UserIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default SignupForm;
