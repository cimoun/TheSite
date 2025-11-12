import { useTaskStore } from '../stores/taskStore';
import { useUIStore } from '../stores/uiStore';

/**
 * Hook to get filtered tasks based on current UI state
 */
export const useFilteredTasks = () => {
  const getFilteredTasks = useTaskStore((state) => state.getFilteredTasks);
  const currentFilter = useUIStore((state) => state.currentFilter);
  const searchQuery = useUIStore((state) => state.searchQuery);

  return getFilteredTasks(currentFilter, searchQuery);
};
