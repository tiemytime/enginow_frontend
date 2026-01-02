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
      // Check if error is due to invalid credentials
      if (result.message === 'Invalid credentials' || 
          result.message?.toLowerCase().includes('invalid')) {
        showError('Invalid email or password. New user? Try signing up!');
      } else {
        showError(result.message);
      }
      
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
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome back
        </h2>
        <p className="text-slate-400">
          Sign in to your account to continue
        </p>
        
        {/* New user hint */}
        <div className="mt-4 text-sm text-slate-500">
          New here?{' '}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl"
        noValidate
      >
        <div className="space-y-5">
          {/* Email Field */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            placeholder="you@example.com"
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
            placeholder="Enter your password"
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
            className="mt-6"
          >
            Sign In
          </Button>
        </div>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
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
