import { useEffect } from 'react';
import { MainLayout, Header, Footer } from './components/layouts';
import { TaskInput, TaskSearch, TaskFilters, TaskList, TaskStats } from './components/task';
import { useUIStore } from './stores/uiStore';

function App() {
  const initializeTheme = useUIStore((state) => state.initializeTheme);

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <MainLayout>
      <Header
        title="Задачи"
        subtitle="Планирование с фокусом"
      />
      
      <div className="space-y-6">
        <TaskInput />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <TaskSearch />
          </div>
          <TaskFilters />
        </div>

        <TaskList />
        
        <TaskStats />
      </div>

      <Footer />
    </MainLayout>
  );
}

export default App;
