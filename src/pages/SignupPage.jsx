import SignupForm from '../components/auth/SignupForm';

/**
 * Signup Page - Enhanced with beautiful background and motivational text
 */
const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-pink-600/40 via-rose-600/30 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 -left-40 w-[700px] h-[700px] bg-gradient-to-br from-purple-600/35 via-indigo-600/25 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/4 w-[550px] h-[550px] bg-gradient-to-tl from-orange-600/30 via-pink-600/25 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Additional accent orbs for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Motivational Text - Top */}
      <div className="absolute top-12 left-0 right-0 text-center z-0 animate-fade-in">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 mb-2"
            style={{ 
              textShadow: '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)',
              letterSpacing: '0.02em'
            }}>
          Begin Your Journey
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 font-light italic mt-2">
          Transform your goals into achievements 🚀
        </p>
      </div>

      {/* Content - Centered Signup Form */}
      <div className="relative z-10 w-full">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
