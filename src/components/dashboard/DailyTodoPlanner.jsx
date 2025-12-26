import { useState, useEffect } from 'react';
import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * DailyTodoPlanner Component
 * A simple daily todo list with pink/coral accents inspired by weekly planner design
 */
const DailyTodoPlanner = () => {
  // Initialize todos from localStorage or with default empty items
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('dailyTodos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: '', completed: false },
      { id: 2, text: '', completed: false },
      { id: 3, text: '', completed: false },
      { id: 4, text: '', completed: false },
      { id: 5, text: '', completed: false },
      { id: 6, text: '', completed: false },
    ];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('dailyTodos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleUpdateTodo = (id, text) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const handleAddTodo = () => {
    const newId = Math.max(0, ...todos.map(t => t.id)) + 1;
    setTodos([...todos, { id: newId, text: '', completed: false }]);
  };

  const handleDeleteTodo = (id) => {
    if (todos.length > 1) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    return days[today];
  };

  return (
    <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl shadow-2xl 
                    border border-white/5 overflow-hidden"
         style={{ height: '420px' }}>
      
      {/* Warm Aesthetic Blur Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-orange-500/10 rounded-full blur-3xl"></div>
        {/* <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-amber-500/10 via-pink-500/15 to-rose-500/20 rounded-full blur-3xl"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0">
          {/* Pink accent bar */}
          <div className="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"></div>
          
          {/* Title Section */}
          <div className="px-6 py-4 bg-gradient-to-b from-zinc-900/50 to-transparent">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2" 
                  style={{ 
                    fontFamily: '"Playfair Display", Georgia, serif',
                    letterSpacing: '0.5px'
                  }}>
                <span className="text-slate-100 tracking-wide">DAY PLANNER</span>{' '}
        
              </h2>
              <div className="inline-block px-4 py-1 rounded-full"
                   style={{ backgroundColor: 'rgba(251, 207, 232, 0.95)' }}>
                <p className="text-xs font-medium capitalize" 
                   style={{ 
                     fontFamily: '"Playfair Display", Georgia, serif',
                     color: '#000000',
                     letterSpacing: '0.5px'
                   }}>
                  {getCurrentDay()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="flex-1 px-6 py-2 space-y-2.5 overflow-y-auto" 
             style={{ maxHeight: '240px' }}>          {todos.map((todo) => (
            <div 
              key={todo.id}
              className="group flex items-center gap-3 pb-2.5 border-b border-dotted border-slate-700/50
                         hover:border-pink-500/30 transition-all duration-200"
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200
                           flex items-center justify-center
                           ${todo.completed 
                             ? 'bg-pink-500 border-pink-500' 
                             : 'border-slate-600 hover:border-pink-400'}`}
              >
                {todo.completed && (
                  <CheckIcon className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </button>

              {/* Input */}
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
                placeholder="Add task..."
                className={`flex-1 bg-transparent border-none outline-none text-sm
                           placeholder:text-slate-600 transition-all duration-200
                           ${todo.completed 
                             ? 'text-slate-500 line-through' 
                             : 'text-slate-300'}`}
                style={{ 
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: '0.875rem'
                }}
              />

              {/* Delete Button - Show on hover */}
              {todos.length > 1 && (
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
                           text-slate-500 hover:text-red-400"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex-shrink-0 px-6 py-3 border-t border-white/5">
          <button
            onClick={handleAddTodo}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg
                     bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300
                     border border-pink-500/20 hover:border-pink-500/40
                     transition-all duration-200 text-sm font-medium"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyTodoPlanner;
