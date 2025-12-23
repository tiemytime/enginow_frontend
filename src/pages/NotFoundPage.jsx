import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold text-gradient-warm mb-4 animate-scale-in">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-2 animate-slide-up">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-blue text-white rounded-lg hover:shadow-glow-blue transition-all duration-200 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
