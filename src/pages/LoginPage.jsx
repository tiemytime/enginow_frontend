import LoginForm from '../components/auth/LoginForm';

/**
 * Login Page
 */
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
