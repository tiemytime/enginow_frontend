import { useState, useEffect } from 'react';
import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import * as todoApi from '../../api/todo.api';

/**
 * DailyTodoPlanner Component
 * A simple daily todo list with pink/coral accents inspired by weekly planner design
 * Now with backend integration for per-user todos
 */
const DailyTodoPlanner = ({ onComplete }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getTodos();
      if (response.status === 'success') {
        setTodos(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;

    const wasCompleted = todo.completed;
    const newCompleted = !wasCompleted;

    // Optimistic update
    setTodos(todos.map(t =>
      t._id === id ? { ...t, completed: newCompleted } : t
    ));

    // Trigger confetti if todo is being completed
    if (!wasCompleted && onComplete) {
      onComplete();
    }

    try {
      await todoApi.updateTodo(id, { completed: newCompleted });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      // Revert on error
      setTodos(todos.map(t =>
        t._id === id ? { ...t, completed: wasCompleted } : t
      ));
    }
  };

  const handleUpdateTodo = async (id, text) => {
    // Optimistic update
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, text } : todo
    ));

    try {
      await todoApi.updateTodo(id, { text });
    } catch (error) {
      console.error('Failed to update todo:', error);
      // Could revert here, but text updates are usually ok to keep
    }
  };

  const handleAddTodo = async () => {
    const newOrder = Math.max(0, ...todos.map(t => t.order || 0)) + 1;
    
    try {
      const response = await todoApi.createTodo({
        text: '',
        completed: false,
        order: newOrder,
      });
      
      if (response.status === 'success') {
        setTodos([...todos, response.data]);
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (todos.length <= 1) return;

    // Optimistic delete
    const originalTodos = [...todos];
    setTodos(todos.filter(todo => todo._id !== id));

    try {
      await todoApi.deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // Revert on error
      setTodos(originalTodos);
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
              <h2 className="text-2xl font-playfair font-bold mb-2 text-slate-100 tracking-wide"
                  style={{ 
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(251, 207, 232, 0.3)'
                  }}>
                DAY PLANNER
              </h2>
              <div className="inline-block px-5 py-1.5 rounded-full"
                   style={{ backgroundColor: 'rgba(251, 207, 232, 0.95)' }}>
                <p className="text-sm font-dancing font-semibold capitalize" 
                   style={{ 
                     color: '#000000',
                     letterSpacing: '1px'
                   }}>
                  {getCurrentDay()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="flex-1 px-6 py-2 space-y-2.5 overflow-y-auto" 
             style={{ maxHeight: '240px' }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400">Loading todos...</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div 
                key={todo._id}
                className="group flex items-center gap-3 pb-2.5 border-b border-dotted border-slate-700/50
                           hover:border-pink-500/30 transition-all duration-200"
              >
                {/* Checkbox */}
                <button
                  onClick={() => handleToggleTodo(todo._id)}
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
                  onChange={(e) => handleUpdateTodo(todo._id, e.target.value)}
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
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
                           text-slate-500 hover:text-red-400"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            ))
          )}
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
