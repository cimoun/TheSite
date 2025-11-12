import { useState, useCallback, useEffect } from 'react';

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast notification object
 */
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

/**
 * Modal state object
 */
export interface Modal {
  id: string;
  isOpen: boolean;
  data?: unknown;
}

/**
 * Hook return type
 */
export interface UseUIStateReturn {
  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  
  // Modals
  modals: Map<string, Modal>;
  openModal: (id: string, data?: unknown) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
  getModalData: <T = unknown>(id: string) => T | undefined;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => string;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

/**
 * Options for the useUIState hook
 */
export interface UseUIStateOptions {
  darkModeStorageKey?: string;
  defaultDarkMode?: boolean;
  toastDefaultDuration?: number;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for managing UI state including dark mode, modals, and toast notifications
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing UI state and management functions
 * 
 * @example
 * ```tsx
 * function App() {
 *   const {
 *     isDarkMode,
 *     toggleDarkMode,
 *     showToast,
 *     openModal,
 *     closeModal
 *   } = useUIState({ defaultDarkMode: false });
 * 
 *   const handleSave = () => {
 *     try {
 *       // Save logic
 *       showToast('Saved successfully!', 'success');
 *     } catch (err) {
 *       showToast('Failed to save', 'error');
 *     }
 *   };
 * 
 *   return (
 *     <div className={isDarkMode ? 'dark' : 'light'}>
 *       <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
 *       <button onClick={() => openModal('confirm-delete')}>Delete</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useUIState(options: UseUIStateOptions = {}): UseUIStateReturn {
  const {
    darkModeStorageKey = 'darkMode',
    defaultDarkMode = false,
    toastDefaultDuration = 3000,
    onError,
  } = options;

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(darkModeStorageKey);
      return saved !== null ? JSON.parse(saved) : defaultDarkMode;
    } catch (err) {
      onError?.(new Error('Failed to load dark mode preference'));
      return defaultDarkMode;
    }
  });

  // Modals state
  const [modals, setModals] = useState<Map<string, Modal>>(new Map());

  // Toasts state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(darkModeStorageKey, JSON.stringify(isDarkMode));
      
      // Apply dark mode class to document
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      onError?.(new Error('Failed to save dark mode preference'));
    }
  }, [isDarkMode, darkModeStorageKey, onError]);

  // Dark mode functions
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const setDarkMode = useCallback((enabled: boolean) => {
    setIsDarkMode(enabled);
  }, []);

  // Modal functions
  const openModal = useCallback((id: string, data?: unknown) => {
    setModals(prev => {
      const next = new Map(prev);
      next.set(id, { id, isOpen: true, data });
      return next;
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => {
      const next = new Map(prev);
      const modal = next.get(id);
      if (modal) {
        next.set(id, { ...modal, isOpen: false });
      }
      return next;
    });
  }, []);

  const isModalOpen = useCallback((id: string): boolean => {
    return modals.get(id)?.isOpen ?? false;
  }, [modals]);

  const getModalData = useCallback(<T = unknown>(id: string): T | undefined => {
    return modals.get(id)?.data as T | undefined;
  }, [modals]);

  // Toast functions
  const showToast = useCallback((
    message: string,
    type: ToastType = 'info',
    duration: number = toastDefaultDuration
  ): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    setToasts(prev => [...prev, toast]);

    // Auto-hide toast after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;
  }, [toastDefaultDuration]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Cleanup: Clear all toasts on unmount
  useEffect(() => {
    return () => {
      setToasts([]);
    };
  }, []);

  return {
    // Dark mode
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    
    // Modals
    modals,
    openModal,
    closeModal,
    isModalOpen,
    getModalData,
    
    // Toasts
    toasts,
    showToast,
    hideToast,
    clearToasts,
  };
}
