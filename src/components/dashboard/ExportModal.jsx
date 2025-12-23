import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import { 
  ArrowDownTrayIcon, 
  DocumentTextIcon,
  TableCellsIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

/**
 * ExportModal - Export tasks in different formats
 */
const ExportModal = ({ isOpen, onClose, onExport, stats }) => {
  const [selectedFormat, setSelectedFormat] = useState('json');

  const exportFormats = [
    {
      id: 'json',
      name: 'JSON',
      description: 'Export as JSON file for backup or import',
      icon: CodeBracketIcon,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      extension: '.json',
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Export as CSV for spreadsheet applications',
      icon: TableCellsIcon,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      extension: '.csv',
    },
    {
      id: 'markdown',
      name: 'Markdown',
      description: 'Export as Markdown for documentation',
      icon: DocumentTextIcon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      extension: '.md',
    },
  ];

  const handleExport = () => {
    onExport(selectedFormat);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Tasks">
      <div className="space-y-6">
        {/* Export Statistics */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
              <div className="text-xs text-gray-400">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
              <div className="text-xs text-gray-400">Overdue</div>
            </div>
          </div>
        )}

        {/* Format Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Export Format
          </label>
          
          {exportFormats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormat === format.id;
            
            return (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${isSelected 
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg scale-[1.02]' 
                    : 'border-gray-700/50 bg-gray-800/30 hover:border-gray-600/50 hover:bg-gray-800/50'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${format.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${format.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{format.name}</h3>
                      <span className="text-xs text-gray-400">{format.extension}</span>
                    </div>
                    <p className="text-sm text-gray-400">{format.description}</p>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-700/50 text-gray-300 
                     font-medium hover:bg-gray-800/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white font-medium hover:shadow-lg transition-all duration-200
                     flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export {selectedFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </Modal>
  );
};

ExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    total: PropTypes.number,
    completed: PropTypes.number,
    pending: PropTypes.number,
    overdue: PropTypes.number,
  }),
};

export default ExportModal;
