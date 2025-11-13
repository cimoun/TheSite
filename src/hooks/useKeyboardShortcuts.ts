import { useEffect, useRef } from 'react';

/**
 * Hook to handle keyboard shortcuts
 */
export const useKeyboardShortcuts = (callbacks: {
  onEscape?: () => void;
  onEnter?: () => void;
  onCtrlEnter?: () => void;
}) => {
  // Store callbacks in a ref to avoid re-subscribing on every render
  const callbacksRef = useRef(callbacks);

  // Update ref when callbacks change
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { onEscape, onEnter, onCtrlEnter } = callbacksRef.current;
      
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      }
      if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && onEnter) {
        onEnter();
      }
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && onCtrlEnter) {
        onCtrlEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array - only attach/detach once
};
