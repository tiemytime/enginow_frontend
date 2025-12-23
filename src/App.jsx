import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { TaskProvider } from './context/TaskContext';
import AppRouter from './routes/AppRouter';
import ToastContainer from './components/common/ToastContainer';

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <TaskProvider>
            <AppRouter />
            <ToastContainer />
          </TaskProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
