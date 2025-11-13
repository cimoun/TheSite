import { useTaskStore } from '../stores/taskStore';
import { useUIStore } from '../stores/uiStore';

/**
 * Hook to get filtered tasks based on current UI state
 */
export const useFilteredTasks = () => {
  const getFilteredTasks = useTaskStore((state) => state.getFilteredTasks);
  const currentFilter = useUIStore((state) => state.currentFilter);
  const searchQuery = useUIStore((state) => state.searchQuery);
  const sortMode = useUIStore((state) => state.sortMode);

  const filtered = getFilteredTasks(currentFilter, searchQuery);

  // Apply sorting
  if (sortMode === 'dueDate') {
    return [...filtered].sort((a, b) => {
      // Tasks without due date go to the end
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  } else if (sortMode === 'priority') {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...filtered].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  return filtered;
};
