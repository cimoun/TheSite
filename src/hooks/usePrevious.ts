import { useRef, useEffect } from 'react';

/**
 * Custom hook to track the previous value of a variable
 * 
 * Stores and returns the previous value from the last render.
 * Useful for comparing current and previous values to detect changes.
 * 
 * @param value - The value to track
 * @returns The previous value (undefined on first render)
 * 
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 * 
 *   return (
 *     <div>
 *       <p>Current count: {count}</p>
 *       <p>Previous count: {prevCount ?? 'N/A'}</p>
 *       <p>Changed: {count !== prevCount ? 'Yes' : 'No'}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const prevUserId = usePrevious(userId);
 * 
 *   useEffect(() => {
 *     if (prevUserId !== undefined && prevUserId !== userId) {
 *       console.log(`User changed from ${prevUserId} to ${userId}`);
 *       // Fetch new user data
 *     }
 *   }, [userId, prevUserId]);
 * 
 *   return <div>User ID: {userId}</div>;
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Custom hook to track the previous value with a custom comparator
 * 
 * Similar to usePrevious, but allows you to specify a custom comparison function
 * to determine when the value has changed.
 * 
 * @param value - The value to track
 * @param isEqual - Custom equality function (defaults to strict equality)
 * @returns The previous value (undefined on first render)
 * 
 * @example
 * ```tsx
 * function ObjectTracker() {
 *   const [user, setUser] = useState({ id: 1, name: 'John' });
 *   
 *   // Deep equality comparison
 *   const prevUser = usePreviousWithComparator(
 *     user,
 *     (a, b) => JSON.stringify(a) === JSON.stringify(b)
 *   );
 * 
 *   return (
 *     <div>
 *       <p>Current: {user.name}</p>
 *       <p>Previous: {prevUser?.name ?? 'N/A'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePreviousWithComparator<T>(
  value: T,
  isEqual: (a: T, b: T) => boolean = (a, b) => a === b
): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    if (ref.current === undefined || !isEqual(ref.current, value)) {
      ref.current = value;
    }
  }, [value, isEqual]);

  return ref.current;
}

/**
 * Custom hook to track multiple previous values (history)
 * 
 * Maintains a history of previous values up to the specified count.
 * Useful for undo/redo functionality or tracking value trends.
 * 
 * @param value - The value to track
 * @param count - Number of previous values to keep (default: 1)
 * @returns Array of previous values, most recent first
 * 
 * @example
 * ```tsx
 * function UndoableInput() {
 *   const [text, setText] = useState('');
 *   const history = usePreviousHistory(text, 5);
 * 
 *   const undo = () => {
 *     if (history.length > 0) {
 *       setText(history[0]);
 *     }
 *   };
 * 
 *   return (
 *     <div>
 *       <input value={text} onChange={(e) => setText(e.target.value)} />
 *       <button onClick={undo} disabled={history.length === 0}>
 *         Undo
 *       </button>
 *       <div>History: {history.join(', ')}</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePreviousHistory<T>(value: T, count: number = 1): T[] {
  const historyRef = useRef<T[]>([]);

  useEffect(() => {
    // Add current value to history
    historyRef.current = [value, ...historyRef.current].slice(0, count + 1);
  }, [value, count]);

  // Return all but the current value (which is at index 0)
  return historyRef.current.slice(1);
}

/**
 * Custom hook to detect if a value has changed
 * 
 * Returns true if the value has changed since the last render.
 * 
 * @param value - The value to monitor
 * @param isEqual - Optional custom equality function
 * @returns true if the value has changed, false otherwise
 * 
 * @example
 * ```tsx
 * function ChangeDetector({ data }: { data: string }) {
 *   const hasChanged = useHasChanged(data);
 * 
 *   return (
 *     <div>
 *       <p>Data: {data}</p>
 *       {hasChanged && <span className="badge">Updated!</span>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useHasChanged<T>(
  value: T,
  isEqual: (a: T, b: T) => boolean = (a, b) => a === b
): boolean {
  const prevValue = usePrevious(value);
  
  if (prevValue === undefined) {
    return false;
  }
  
  return !isEqual(prevValue, value);
}
