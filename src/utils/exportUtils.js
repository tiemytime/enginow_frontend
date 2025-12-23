/**
 * Export tasks to various formats
 */

/**
 * Export tasks as JSON
 * @param {Array} tasks - Tasks to export
 * @param {string} filename - Output filename
 */
export const exportAsJSON = (tasks, filename = 'tasks.json') => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(dataBlob, filename);
};

/**
 * Export tasks as CSV
 * @param {Array} tasks - Tasks to export
 * @param {string} filename - Output filename
 */
export const exportAsCSV = (tasks, filename = 'tasks.csv') => {
  if (!tasks.length) {
    alert('No tasks to export');
    return;
  }

  // Define CSV headers
  const headers = ['Title', 'Description', 'Priority', 'Status', 'Due Date', 'Created At'];
  
  // Convert tasks to CSV rows
  const rows = tasks.map(task => [
    escapeCSV(task.title),
    escapeCSV(task.description || ''),
    task.priority,
    task.completed ? 'Completed' : 'Pending',
    task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
    new Date(task.createdAt).toLocaleDateString(),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(dataBlob, filename);
};

/**
 * Export tasks as Markdown
 * @param {Array} tasks - Tasks to export
 * @param {string} filename - Output filename
 */
export const exportAsMarkdown = (tasks, filename = 'tasks.md') => {
  const markdownContent = [
    '# My Tasks\n',
    `*Exported on ${new Date().toLocaleDateString()}*\n`,
    '---\n',
    ...tasks.map(task => {
      const checkbox = task.completed ? '[x]' : '[ ]';
      const priority = `**Priority:** ${task.priority}`;
      const dueDate = task.dueDate 
        ? `**Due:** ${new Date(task.dueDate).toLocaleDateString()}` 
        : '';
      
      return [
        `## ${checkbox} ${task.title}`,
        task.description ? `\n${task.description}\n` : '',
        `\n${priority} ${dueDate}`,
        '\n---\n',
      ].join('');
    }),
  ].join('\n');

  const dataBlob = new Blob([markdownContent], { type: 'text/markdown' });
  downloadFile(dataBlob, filename);
};

/**
 * Helper: Download file
 * @param {Blob} blob - File blob
 * @param {string} filename - Output filename
 */
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Helper: Escape CSV special characters
 * @param {string} value - Value to escape
 * @returns {string} Escaped value
 */
const escapeCSV = (value) => {
  if (!value) return '';
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

/**
 * Get export statistics
 * @param {Array} tasks - Tasks to analyze
 * @returns {Object} Export statistics
 */
export const getExportStats = (tasks) => {
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  };
};
