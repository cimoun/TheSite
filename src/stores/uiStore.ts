import { create } from 'zustand';
import type { UIState } from '../types/ui';

interface UIStore extends UIState {
  setSearchQuery: (query: string) => void;
  setCurrentFilter: (filter: 'all' | 'active' | 'completed') => void;
  setIsLoading: (loading: boolean) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  searchQuery: '',
  currentFilter: 'all',
  isLoading: false,
  theme: 'light',

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setCurrentFilter: (filter: 'all' | 'active' | 'completed') => {
    set({ currentFilter: filter });
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  },
}));
