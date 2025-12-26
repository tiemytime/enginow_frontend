import LoginForm from '../components/auth/LoginForm';
import DotGrid from '../components/backgrounds/DotGrid';

/**
 * Login Page - Clean, Professional, Minimal Design
 */
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <DotGrid 
        dotSize={1.5}
        gap={35}
        baseColor="rgba(99, 102, 241, 0.4)"
        activeColor="rgba(139, 92, 246, 1)"
        proximity={150}
      />

      {/* Login Form */}
      <div className="relative z-10 p-6 sm:p-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
