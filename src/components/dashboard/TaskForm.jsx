import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

const TaskForm = ({ task, onSubmit, onCancel, isLoading = false }) => {
  const getInitialFormData = () => ({
    title: task?.title || '',
    description: task?.description || '',
    completed: task?.completed || false,
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
  });

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form when task changes (e.g., opening a different task for editing)
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false,
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    };

    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    ${errors[fieldName] 
      ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400' 
      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
    }
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const labelClasses = (fieldName) => `
    block text-sm font-medium mb-2
    ${errors[fieldName] ? 'text-red-400' : 'text-white'}
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title Field */}
      <div>
        <label htmlFor="title" className={labelClasses('title')}>
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Enter task title..."
          className={inputClasses('title')}
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <XMarkIcon className="w-4 h-4" />
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className={labelClasses('description')}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Enter task description..."
          rows={4}
          className={inputClasses('description')}
          maxLength={500}
        />
        <div className="mt-1 flex justify-between items-center">
          {errors.description ? (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <XMarkIcon className="w-4 h-4" />
              {errors.description}
            </p>
          ) : (
            <span className="text-xs text-slate-400">
              {formData.description.length}/500 characters
            </span>
          )}
        </div>
      </div>

      {/* Priority and Completed Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className={labelClasses('priority')}>
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClasses('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Completed Checkbox */}
        {task && (
          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={(e) => handleChange({ target: { name: 'completed', value: e.target.checked }})}
              disabled={isLoading}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm font-medium text-white">
              Mark as completed
            </label>
          </div>
        )}
      </div>

      {/* Due Date Field */}
      <div>
        <label htmlFor="dueDate" className={labelClasses('dueDate')}>
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClasses('dueDate')}
        />
        {errors.dueDate && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <XMarkIcon className="w-4 h-4" />
            {errors.dueDate}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 
                     font-medium hover:bg-gray-50 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium
                     hover:bg-indigo-700 transition-colors flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {task ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              {task ? 'Update Task' : 'Create Task'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default TaskForm;
