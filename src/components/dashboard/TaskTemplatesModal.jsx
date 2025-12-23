import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import { ALL_TEMPLATES, getTemplateColors, getTodayDate } from '../../templates';

/**
 * TaskTemplatesModal - Select from predefined task templates with variations
 */
const TaskTemplatesModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectCategory = (template) => {
    setSelectedTemplate(template);
  };

  const handleBack = () => {
    setSelectedTemplate(null);
  };

  const handleSelectVariation = (variation) => {
    const templateData = {
      title: variation.title,
      description: variation.description,
      priority: variation.priority,
      dueDate: getTodayDate(),
    };
    onSelectTemplate({ template: templateData });
    onClose();
    setSelectedTemplate(null);
  };

  // Show category selection
  if (!selectedTemplate) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Choose a Template Category">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {ALL_TEMPLATES.map((template) => {
            const colors = getTemplateColors(template.color);
            
            return (
              <button
                key={template.id}
                onClick={() => handleSelectCategory(template)}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 
                         text-center transition-all duration-200 group
                         ${colors.hover} hover:scale-105 hover:shadow-xl active:scale-95`}
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {template.icon}
                </div>

                {/* Name */}
                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                  {template.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed">
                  {template.description}
                </p>

                {/* Variation Count */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${colors.accent}`}></div>
                  <span className="text-xs text-gray-500">
                    {template.variations.length} variations
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Task Option */}
        <div className="mt-4 p-4 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 
                     rounded-lg text-gray-300 font-medium transition-all duration-200
                     border border-gray-700/50 hover:border-gray-600/50"
          >
            Create Custom Task
          </button>
        </div>
      </Modal>
    );
  }

  // Show template variations
  const colors = getTemplateColors(selectedTemplate.color);
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {
        onClose();
        setSelectedTemplate(null);
      }} 
      title={
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back
          </button>
          <span className="text-2xl">{selectedTemplate.icon}</span>
          <span>{selectedTemplate.name} Templates</span>
        </div>
      }
    >
      <div className="p-4 space-y-4">
        {selectedTemplate.variations.map((variation, index) => (
          <button
            key={index}
            onClick={() => handleSelectVariation(variation)}
            className={`w-full ${colors.bg} ${colors.border} border-2 rounded-xl p-5 
                     text-left transition-all duration-200 group
                     ${colors.hover} hover:scale-102 hover:shadow-lg active:scale-98`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Variation Name */}
                <h4 className={`text-lg font-bold ${colors.text} mb-2 group-hover:translate-x-1 transition-transform`}>
                  {variation.name}
                </h4>

                {/* Title Preview */}
                <p className="text-sm text-gray-300 font-medium mb-2">
                  {variation.title}
                </p>

                {/* Description Preview */}
                <p className="text-xs text-gray-400 line-clamp-3 whitespace-pre-line">
                  {variation.description}
                </p>

                {/* Priority Badge */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Priority:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${variation.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                    ${variation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
                    ${variation.priority === 'low' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                  `}>
                    {variation.priority}
                  </span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className={`${colors.text} opacity-0 group-hover:opacity-100 transition-all
                            group-hover:translate-x-1`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

TaskTemplatesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectTemplate: PropTypes.func.isRequired,
};

export default TaskTemplatesModal;
