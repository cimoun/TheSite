import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIState } from '../types/ui';

type ThemeMode = UIState['theme'];

const STORAGE_KEY = 'ui-storage';

const applyThemeClass = (theme: ThemeMode) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return 'light';
    }

    const parsed = JSON.parse(storedValue);
    const savedTheme = parsed?.state?.theme;

    return savedTheme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.warn('[uiStore] Failed to read stored theme', error);
    return 'light';
  }
};

const initialTheme = getInitialTheme();

if (typeof document !== 'undefined') {
  applyThemeClass(initialTheme);
}

interface UIStore extends UIState {
  setSearchQuery: (query: string) => void;
  setCurrentFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSortMode: (mode: 'default' | 'dueDate' | 'priority') => void;
  setIsLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
  setReduceAnimations: (value: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      currentFilter: 'all',
      isLoading: false,
      theme: initialTheme,
      sortMode: 'default',
      reduceAnimations: false,

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
        applyThemeClass(newTheme);
      },

      setReduceAnimations: (value: boolean) => {
        set({ reduceAnimations: value });
      },

      initializeTheme: () => {
        const currentTheme = get().theme;
        applyThemeClass(currentTheme);
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        reduceAnimations: state.reduceAnimations,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          return;
        }

        state.initializeTheme();
      },
    }
  )
);
