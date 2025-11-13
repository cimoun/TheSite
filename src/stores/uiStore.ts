import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIState } from '../types/ui';

interface UIStore extends UIState {
  setSearchQuery: (query: string) => void;
  setCurrentFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSortMode: (mode: 'default' | 'dueDate' | 'priority') => void;
  setIsLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      currentFilter: 'all',
      isLoading: false,
      theme: 'light',
      sortMode: 'default',

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setCurrentFilter: (filter: 'all' | 'active' | 'completed') => {
        set({ currentFilter: filter });
      },

      setSortMode: (mode: 'default' | 'dueDate' | 'priority') => {
        set({ sortMode: mode });
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        
        // Sync with DOM
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      initializeTheme: () => {
        const currentTheme = get().theme;
        
        // Apply theme to DOM on initialization
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
