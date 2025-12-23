import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import { CommandLineIcon } from '@heroicons/react/24/outline';

/**
 * KeyboardShortcutsModal - Display available keyboard shortcuts
 */
const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', 'N'], description: 'Create new task' },
        { keys: ['Ctrl', 'F'], description: 'Open filters' },
        { keys: ['Esc'], description: 'Close modals/dialogs' },
        { keys: ['Shift', '?'], description: 'Show keyboard shortcuts' },
      ],
    },
    {
      category: 'Task Actions',
      items: [
        { keys: ['Ctrl', 'S'], description: 'Save current task' },
        { keys: ['Delete'], description: 'Delete selected task' },
        { keys: ['Ctrl', 'A'], description: 'Select all tasks' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['↑', '↓'], description: 'Navigate tasks' },
        { keys: ['Enter'], description: 'Open task details' },
        { keys: ['Tab'], description: 'Navigate form fields' },
      ],
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
          <CommandLineIcon className="w-6 h-6 text-indigo-400" />
          <p className="text-sm text-gray-300">
            Use these keyboard shortcuts to work faster and more efficiently
          </p>
        </div>

        {/* Shortcuts List */}
        {shortcuts.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              {category.category}
            </h3>
            
            <div className="space-y-2">
              {category.items.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg
                           border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                >
                  <span className="text-gray-300">{shortcut.description}</span>
                  
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex} className="flex items-center">
                        <kbd className="px-2.5 py-1.5 text-sm font-mono font-semibold bg-gray-900 
                                     text-gray-300 border border-gray-700 rounded-md shadow-sm
                                     min-w-[2.5rem] text-center">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="mx-1 text-gray-500 text-xs">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Tip */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-bold">Pro Tip:</span> Press{' '}
            <kbd className="px-2 py-1 bg-gray-900 text-gray-300 rounded text-xs font-mono">
              Shift + ?
            </kbd>{' '}
            anytime to view this help menu
          </p>
        </div>
      </div>
    </Modal>
  );
};

KeyboardShortcutsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default KeyboardShortcutsModal;
