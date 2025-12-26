import SignupForm from '../components/auth/SignupForm';
import DotGrid from '../components/backgrounds/DotGrid';

/**
 * Signup Page - Clean, Professional, Minimal Design
 */
const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <DotGrid 
        dotSize={1.5}
        gap={35}
        baseColor="rgba(236, 72, 153, 0.4)"
        activeColor="rgba(168, 85, 247, 1)"
        proximity={150}
      />

      {/* Signup Form */}
      <div className="relative z-10 p-6 sm:p-12">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
