import { 
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

/**
 * LeftSidebar Component
 * Features: Logo, Logout
 */
const LeftSidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-black/95 backdrop-blur-xl border-r border-white/5 
                      flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 
                          rounded-xl flex items-center justify-center shadow-lg shadow-indigo-950/50">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-100">TaskFlow</h1>
          </div>
        </div>
      </div>

      {/* Spacer to push logout to bottom */}
      <div className="flex-1"></div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                     text-gray-400 hover:bg-red-950/30 hover:text-red-400
                     transition-all duration-200 group border border-white/5
                     hover:border-red-500/30"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
