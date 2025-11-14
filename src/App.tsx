import { useEffect } from 'react';
import { MainLayout, Header, Footer } from './components/layouts';
import { TaskInput, TaskSearch, TaskFilters, TaskList, TaskStats } from './components/task';
import { useUIStore } from './stores/uiStore';
import { ToastProvider } from './components/Toast';

function App() {
  const initializeTheme = useUIStore((state) => state.initializeTheme);

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Tab navigation without interference
      if (e.key === 'Tab') {
        // Let browser handle tab navigation naturally
        return;
      }
      
      // Add Escape key to clear focus (optional enhancement)
      if (e.key === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider position="top-right">
      <MainLayout>
        <Header
          title="Задачи"
          subtitle="Планирование с фокусом"
        />
        
        {/* Improved spacing with more whitespace between sections */}
        <div className="space-y-8">
          <TaskInput />
          
          {/* Search and Filters combined section with better spacing */}
          <div className="space-y-6">
            <div className="w-full">
              <TaskSearch />
            </div>
            <TaskFilters />
          </div>

          {/* Task list with more breathing room */}
          <div className="mt-8">
            <TaskList />
          </div>
          
          {/* Statistics at the bottom with clear separation */}
          <div className="mt-8 pt-6 border-t border-primary-base/30 dark:border-slate-700/30">
            <TaskStats />
          </div>
        </div>

        <Footer />
      </MainLayout>
    </ToastProvider>
  );
}

export default App;
