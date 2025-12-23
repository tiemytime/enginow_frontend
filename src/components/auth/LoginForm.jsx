import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { validateLoginForm, hasErrors } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * Login Form Component
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { success: showSuccess, error: showError } = useToast();

  const [formData, setFormData] = useState({
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
    const fieldErrors = validateLoginForm(formData);
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
      email: true,
      password: true,
    });

    // Validate form
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      showError('Please fix the errors in the form');
      return;
    }

    // Submit login
    const result = await login(formData);

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
        <h1 className="text-4xl font-display font-bold text-gradient-blue mb-2">
          Welcome Back
        </h1>
        <p className="text-text-secondary">
          Sign in to manage your tasks
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-effect-strong rounded-xl p-8 shadow-2xl animate-scale-in"
        noValidate
      >
        <div className="space-y-6 text-black">
          {/* Email Field */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            placeholder="name@example.com"
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
            autoComplete="current-password"
            icon={LockIcon}
            showPasswordToggle={true}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Sign In
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-accent-blue hover:text-accent-purple transition-colors duration-200 font-medium"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

// Icons
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

export default LoginForm;
