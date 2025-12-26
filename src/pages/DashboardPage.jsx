import { useState } from 'react';
import { PlusIcon, FunnelIcon, RectangleStackIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useTask } from '../hooks/useTask';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { useConfetti } from '../hooks/useConfetti';
import { useBulkActions } from '../hooks/useBulkActions';
import { useToast } from '../hooks/useToast';
import TaskStats from '../components/dashboard/TaskStats';
import FilterSidebar from '../components/dashboard/FilterSidebar';
import TaskList from '../components/dashboard/TaskList';
import Modal from '../components/common/Modal';
import TaskForm from '../components/dashboard/TaskForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import BulkActionsBar from '../components/dashboard/BulkActionsBar';
import TaskTemplatesModal from '../components/dashboard/TaskTemplatesModal';
import ExportModal from '../components/dashboard/ExportModal';
import LeftSidebar from '../components/dashboard/LeftSidebar';
import RightSidebar from '../components/dashboard/RightSidebar';
import DailyTodoPlanner from '../components/dashboard/DailyTodoPlanner';
import { exportAsJSON, exportAsCSV, exportAsMarkdown, getExportStats } from '../utils/exportUtils';

const DashboardPage = () => {
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    reorderTasks 
  } = useTask();

  const { 
    filters, 
    filteredTasks, 
    setFilters, 
    clearFilters 
  } = useTaskFilters(tasks);

  const { triggerConfetti } = useConfetti();
  const { showToast } = useToast();

  // Bulk actions
  const bulkActions = useBulkActions();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Phase 3.3 Modal states
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDailyPlannerOpen, setIsDailyPlannerOpen] = useState(false);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handlers
  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      await createTask(taskData);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!selectedTask) return;
    
    setIsSubmitting(true);
    try {
      const wasCompleted = selectedTask.completed;
      const isNowCompleted = taskData.completed;
      
      await updateTask(selectedTask._id, taskData);
      
      // Trigger confetti if task was just completed
      if (!wasCompleted && isNowCompleted) {
        triggerConfetti();
      }
      
      setIsEditModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete._id);
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const handleCompleteTask = async (task) => {
    try {
      const wasCompleted = task.completed;
      await updateTask(task._id, { 
        completed: !wasCompleted
      });
      
      // Trigger confetti if task was just completed
      if (!wasCompleted) {
        triggerConfetti();
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleReorderTasks = async (reorderedTasks) => {
    try {
      await reorderTasks(reorderedTasks);
    } catch (err) {
      console.error('Failed to reorder tasks:', err);
    }
  };

  // Phase 3.3 Handlers
  const handleTemplateSelect = (templateData) => {
    // Template data comes pre-filled from the modal
    setSelectedTask(templateData.template);
    setIsCreateModalOpen(true);
  };

  const handleExport = (format) => {
    const tasksToExport = bulkActions.hasSelection 
      ? tasks.filter(t => bulkActions.isSelected(t._id))
      : filteredTasks;

    try {
      if (format === 'json') {
        exportAsJSON(tasksToExport);
      } else if (format === 'csv') {
        exportAsCSV(tasksToExport);
      } else if (format === 'markdown') {
        exportAsMarkdown(tasksToExport);
      }
      showToast(`Exported ${tasksToExport.length} tasks as ${format.toUpperCase()}`, 'success');
    } catch (error) {
      console.error('Export failed:', error);
      showToast('Failed to export tasks', 'error');
    }
  };

  const handleBulkComplete = async () => {
    const selectedIds = bulkActions.getSelectedTaskIds();
    try {
      await Promise.all(
        selectedIds.map(id => updateTask(id, { completed: true }))
      );
      showToast(`Completed ${selectedIds.length} tasks`, 'success');
      bulkActions.deselectAll();
    } catch (error) {
      console.error('Bulk complete failed:', error);
      showToast('Failed to complete tasks', 'error');
    }
  };

  const handleBulkDelete = async () => {
    const selectedIds = bulkActions.getSelectedTaskIds();
    try {
      await Promise.all(
        selectedIds.map(id => deleteTask(id))
      );
      showToast(`Deleted ${selectedIds.length} tasks`, 'success');
      bulkActions.deselectAll();
    } catch (error) {
      console.error('Bulk delete failed:', error);
      showToast('Failed to delete tasks', 'error');
    }
  };

  const handleBulkExport = () => {
    setIsExportModalOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-red-500/50 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                     hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/50"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 xl:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                             from-indigo-400 via-purple-400 to-pink-400 mb-2">
                  Task Dashboard
                </h1>
                <p className="text-sm sm:text-base text-slate-400">
                  Manage your tasks efficiently and stay organized ✨
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Create Task Button */}
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600
                           text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700
                           transition-all duration-200 shadow-lg shadow-indigo-900/50 hover:shadow-xl 
                           hover:shadow-indigo-900/60 transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Task
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <TaskStats tasks={tasks} />

          {/* Main Content Grid: Daily Planner + Task List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Daily Todo Planner - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-4" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
                <DailyTodoPlanner />
              </div>
            </div>

            {/* Task List - Full width on mobile, 8 columns on desktop */}
            <div className="lg:col-span-8">
              <TaskList
                tasks={filteredTasks}
                loading={loading}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onComplete={handleCompleteTask}
                onReorder={handleReorderTasks}
              />
            </div>
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />

          {/* Create Task Modal */}
          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            title="Create New Task"
          >
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setIsCreateModalOpen(false)}
              isLoading={isSubmitting}
            />
          </Modal>

          {/* Edit Task Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedTask(null);
            }}
            title="Edit Task"
          >
            <TaskForm
              task={selectedTask}
              onSubmit={handleUpdateTask}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedTask(null);
              }}
              isLoading={isSubmitting}
            />
          </Modal>

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setTaskToDelete(null);
            }}
            onConfirm={handleDeleteTask}
            title="Delete Task"
            message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
            confirmLabel="Delete"
            cancelLabel="Cancel"
            variant="danger"
            isLoading={isDeleting}
          />

          {/* Phase 3.3: Task Templates Modal */}
          <TaskTemplatesModal
            isOpen={isTemplatesModalOpen}
            onClose={() => setIsTemplatesModalOpen(false)}
            onSelectTemplate={handleTemplateSelect}
          />

          {/* Phase 3.3: Export Modal */}
          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            onExport={handleExport}
            stats={getExportStats(filteredTasks)}
          />

          {/* Daily Todo Planner Modal - Mobile Only */}
          <Modal
            isOpen={isDailyPlannerOpen}
            onClose={() => setIsDailyPlannerOpen(false)}
            title="Daily Todo List"
          >
            <div style={{ height: '70vh', minHeight: '500px' }}>
              <DailyTodoPlanner />
            </div>
          </Modal>

          {/* Phase 3.3: Bulk Actions Bar */}
          {bulkActions.hasSelection && (
            <BulkActionsBar
              selectedCount={bulkActions.selectedCount}
              onCompleteSelected={handleBulkComplete}
              onDeleteSelected={handleBulkDelete}
              onExportSelected={handleBulkExport}
              onCancel={bulkActions.deselectAll}
            />
          )}
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile and tablet, visible on large screens */}
      <div className="hidden xl:block">
        <RightSidebar
          tasks={tasks}
          onTemplates={() => setIsTemplatesModalOpen(true)}
          onFilterToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
        />
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile/tablet */}
      <div className="fixed bottom-0 left-0 right-0 xl:hidden bg-zinc-950 border-t border-white/10 
                    backdrop-blur-xl z-40 safe-area-pb">
        <div className="grid grid-cols-4 gap-1 px-2 py-3">
          {/* Create Task */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 
                     text-gray-400 hover:text-indigo-400 transition-all active:scale-95"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Create</span>
          </button>

          {/* Templates */}
          <button
            onClick={() => setIsTemplatesModalOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 
                     text-gray-400 hover:text-purple-400 transition-all active:scale-95"
          >
            <RectangleStackIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Templates</span>
          </button>

          {/* Filters */}
          <button
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 
                     text-gray-400 hover:text-cyan-400 transition-all active:scale-95"
          >
            <FunnelIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Filters</span>
          </button>

          {/* Daily Todo - Mobile Only */}
          <button
            onClick={() => setIsDailyPlannerOpen(!isDailyPlannerOpen)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 
                     text-gray-400 hover:text-pink-400 transition-all active:scale-95"
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Daily</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
