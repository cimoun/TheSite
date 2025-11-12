import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, StatusFilter, PriorityFilter } from '../types';

interface UIStore {
  theme: Theme;
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setPriorityFilter: (filter: PriorityFilter) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'light',
      searchQuery: '',
      statusFilter: 'all',
      priorityFilter: 'all',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setStatusFilter: (filter) => set({ statusFilter: filter }),
      setPriorityFilter: (filter) => set({ priorityFilter: filter }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
