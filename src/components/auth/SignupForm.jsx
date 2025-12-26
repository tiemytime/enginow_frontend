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
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Create an account
        </h2>
        <p className="text-slate-400">
          Start managing your tasks efficiently
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl"
        noValidate
      >
        <div className="space-y-5">
          {/* Name Field */}
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            placeholder="Enter your name"
            required
            autoComplete="name"
            icon={UserIcon}
          />

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
            placeholder="Create a password"
            required
            autoComplete="new-password"
            icon={LockIcon}
            showPasswordToggle={true}
          />

          {/* Password Requirements */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 text-xs text-slate-400">
            <p className="font-medium mb-1.5 text-slate-300">Password requirements:</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-slate-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="2"/>
                </svg>
                At least 6 characters long
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-slate-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="2"/>
                </svg>
                Contains at least one number
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            Create Account
          </Button>
        </div>

        {/* Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
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
