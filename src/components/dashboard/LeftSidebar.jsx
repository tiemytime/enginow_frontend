import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * LeftSidebar Component
 * Features: Logo, Flip Clock, Navigation Menu
 */
const LeftSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [time, setTime] = useState(new Date());

  // Update time every second for the flip clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time components for flip clock (without seconds)
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const date = time.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard', active: true },
  ];

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
            <p className="text-xs text-gray-500">Pro Dashboard</p>
          </div>
        </div>
      </div>

      {/* Flip Clock Section - Compact without seconds */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="bg-zinc-950 rounded-lg p-3 backdrop-blur-sm border border-white/5">
          {/* Date */}
          <div className="text-center mb-2">
            <p className="text-xs text-gray-500 font-medium">{date}</p>
          </div>
          
          {/* Flip Clock Display - Larger digits, no seconds */}
          <div className="flex justify-center items-center space-x-2">
            {/* Hours */}
            <div className="flex space-x-1">
              <FlipDigit value={hours[0]} />
              <FlipDigit value={hours[1]} />
            </div>
            
            {/* Separator */}
            <div className="flex flex-col space-y-1 px-1">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
            
            {/* Minutes */}
            <div className="flex space-x-1">
              <FlipDigit value={minutes[0]} />
              <FlipDigit value={minutes[1]} />
            </div>
          </div>
          
          {/* Time Labels - Compact */}
          <div className="flex justify-center items-center space-x-8 mt-2">
            <span className="text-[10px] text-gray-600 uppercase tracking-wide">HOUR</span>
            <span className="text-[10px] text-gray-600 uppercase tracking-wide">MIN</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                         transition-all duration-200 group
                         ${item.active 
                           ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-950/50' 
                           : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                         }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? '' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-medium">{item.name}</span>
              {item.active && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

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

/**
 * FlipDigit Component - Larger Version with Subtle Colors
 * Individual flip clock digit with gradient background
 */
const FlipDigit = ({ value }) => {
  return (
    <div className="relative">
      <div className="w-10 h-14 bg-gradient-to-br from-zinc-900 to-black 
                      rounded-lg border border-white/10 shadow-lg
                      flex items-center justify-center">
        <span className="text-3xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-br from-indigo-400 to-indigo-500">
          {value}
        </span>
      </div>
      {/* Flip effect line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-white/10"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
