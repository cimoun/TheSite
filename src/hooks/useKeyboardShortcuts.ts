import { useEffect } from 'react';

/**
 * Hook to handle keyboard shortcuts
 */
export const useKeyboardShortcuts = (callbacks: {
  onEscape?: () => void;
  onEnter?: () => void;
  onCtrlEnter?: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && callbacks.onEscape) {
        callbacks.onEscape();
      }
      if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && callbacks.onEnter) {
        callbacks.onEnter();
      }
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && callbacks.onCtrlEnter) {
        callbacks.onCtrlEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
};
