import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing values
 * 
 * Delays updating the debounced value until after the specified delay has elapsed
 * since the last time the input value changed. Useful for expensive operations
 * like API calls or filtering large lists.
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // Perform expensive search operation
 *       searchAPI(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 * 
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Debouncing with different delays
 * const debouncedValue1 = useDebounce(value1, 300); // 300ms delay
 * const debouncedValue2 = useDebounce(value2, 1000); // 1s delay
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up new timeout to update debounced value
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Options for useDebounceCallback
 */
export interface UseDebounceCallbackOptions {
  /**
   * The delay in milliseconds
   */
  delay?: number;
  /**
   * Whether to call the callback on the leading edge (immediately on first call)
   */
  leading?: boolean;
  /**
   * Whether to call the callback on the trailing edge (after delay)
   */
  trailing?: boolean;
}

/**
 * Custom hook for debouncing callback functions
 * 
 * Creates a debounced version of a callback function that delays invoking
 * the function until after the specified delay has elapsed since the last
 * time it was called.
 * 
 * @param callback - The callback function to debounce
 * @param options - Configuration options
 * @returns The debounced callback function
 * 
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const handleSearch = useDebounceCallback(
 *     (term: string) => {
 *       console.log('Searching for:', term);
 *       searchAPI(term);
 *     },
 *     { delay: 500 }
 *   );
 * 
 *   return (
 *     <input
 *       type="text"
 *       onChange={(e) => handleSearch(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 */
export function useDebounceCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  options: UseDebounceCallbackOptions = {}
): (...args: Args) => void {
  const { delay = 500, leading = false, trailing = true } = options;
  
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef<number>(0);
  const hasLeadingExecutedRef = useRef(false);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useRef((...args: Args) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTimeRef.current;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Leading edge execution
    if (leading && !hasLeadingExecutedRef.current) {
      callbackRef.current(...args);
      hasLeadingExecutedRef.current = true;
    }

    // Set up trailing edge execution
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        if (!leading || timeSinceLastCall >= delay) {
          callbackRef.current(...args);
        }
        hasLeadingExecutedRef.current = false;
      }, delay);
    }

    lastCallTimeRef.current = now;
  }).current;
}
