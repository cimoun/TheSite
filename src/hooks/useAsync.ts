import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * State of an async operation
 */
export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

/**
 * Result of an async operation
 */
export interface AsyncState<T, E = Error> {
  status: AsyncStatus;
  data: T | null;
  error: E | null;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * Hook return type
 */
export interface UseAsyncReturn<T, Args extends unknown[], E = Error> extends AsyncState<T, E> {
  execute: (...args: Args) => Promise<T>;
  reset: () => void;
  setData: (data: T | null) => void;
  setError: (error: E | null) => void;
}

/**
 * Options for the useAsync hook
 */
export interface UseAsyncOptions<T, E = Error> {
  /**
   * Initial data value
   */
  initialData?: T | null;
  /**
   * Callback to run on success
   */
  onSuccess?: (data: T) => void;
  /**
   * Callback to run on error
   */
  onError?: (error: E) => void;
  /**
   * Whether to execute the async function immediately on mount
   */
  executeOnMount?: boolean;
  /**
   * Whether to reset state when the async function changes
   */
  resetOnChange?: boolean;
}

/**
 * Custom hook for handling async operations
 * 
 * Manages the state of async operations including loading, error, and data states.
 * Automatically handles cleanup for cancelled requests and provides utilities
 * for common async patterns.
 * 
 * @param asyncFunction - The async function to execute
 * @param options - Configuration options
 * @returns Object containing async state and control functions
 * 
 * @example
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const fetchUser = async (id: string) => {
 *     const response = await fetch(`/api/users/${id}`);
 *     if (!response.ok) throw new Error('Failed to fetch user');
 *     return response.json();
 *   };
 * 
 *   const {
 *     data: user,
 *     error,
 *     isPending,
 *     execute
 *   } = useAsync(fetchUser);
 * 
 *   useEffect(() => {
 *     execute(userId);
 *   }, [userId, execute]);
 * 
 *   if (isPending) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (user) return <div>User: {user.name}</div>;
 *   return null;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With callbacks and auto-execution
 * function DataFetcher() {
 *   const { data, isPending } = useAsync(
 *     async () => {
 *       const res = await fetch('/api/data');
 *       return res.json();
 *     },
 *     {
 *       executeOnMount: true,
 *       onSuccess: (data) => console.log('Data loaded:', data),
 *       onError: (error) => console.error('Failed:', error)
 *     }
 *   );
 * 
 *   return isPending ? <Spinner /> : <DataView data={data} />;
 * }
 * ```
 */
export function useAsync<T, Args extends unknown[] = [], E = Error>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T, E> = {}
): UseAsyncReturn<T, Args, E> {
  const {
    initialData = null,
    onSuccess,
    onError,
    executeOnMount = false,
    resetOnChange = false,
  } = options;

  const [state, setState] = useState<AsyncState<T, E>>({
    status: 'idle',
    data: initialData,
    error: null,
    isIdle: true,
    isPending: false,
    isSuccess: false,
    isError: false,
  });

  const isMountedRef = useRef(true);
  const asyncFunctionRef = useRef(asyncFunction);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Update refs when callbacks change
  useEffect(() => {
    asyncFunctionRef.current = asyncFunction;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [asyncFunction, onSuccess, onError]);

  // Reset state when async function changes (if resetOnChange is true)
  useEffect(() => {
    if (resetOnChange) {
      setState({
        status: 'idle',
        data: initialData,
        error: null,
        isIdle: true,
        isPending: false,
        isSuccess: false,
        isError: false,
      });
    }
  }, [asyncFunction, resetOnChange, initialData]);

  // Track if component is mounted
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /**
   * Execute the async function
   */
  const execute = useCallback(async (...args: Args): Promise<T> => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setState({
      status: 'pending',
      data: null,
      error: null,
      isIdle: false,
      isPending: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const result = await asyncFunctionRef.current(...args);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setState({
          status: 'success',
          data: result,
          error: null,
          isIdle: false,
          isPending: false,
          isSuccess: true,
          isError: false,
        });

        onSuccessRef.current?.(result);
      }

      return result;
    } catch (error) {
      const err = error as E;

      // Only update state if component is still mounted and not aborted
      if (isMountedRef.current && error !== 'AbortError') {
        setState({
          status: 'error',
          data: null,
          error: err,
          isIdle: false,
          isPending: false,
          isSuccess: false,
          isError: true,
        });

        onErrorRef.current?.(err);
      }

      throw error;
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Reset the state to idle
   */
  const reset = useCallback(() => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState({
      status: 'idle',
      data: initialData,
      error: null,
      isIdle: true,
      isPending: false,
      isSuccess: false,
      isError: false,
    });
  }, [initialData]);

  /**
   * Manually set the data
   */
  const setData = useCallback((data: T | null) => {
    setState(prev => ({
      ...prev,
      data,
    }));
  }, []);

  /**
   * Manually set the error
   */
  const setError = useCallback((error: E | null) => {
    setState(prev => ({
      ...prev,
      error,
      status: error ? 'error' : prev.status,
      isError: !!error,
    }));
  }, []);

  // Execute on mount if requested
  useEffect(() => {
    if (executeOnMount) {
      execute(...([] as unknown as Args));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
}

/**
 * Custom hook for handling async operations with automatic retry
 * 
 * Extends useAsync with automatic retry logic for failed requests.
 * 
 * @param asyncFunction - The async function to execute
 * @param options - Configuration options including retry settings
 * @returns Object containing async state and control functions
 * 
 * @example
 * ```tsx
 * function RobustDataFetcher() {
 *   const { data, error, isPending, retryCount } = useAsyncWithRetry(
 *     async () => {
 *       const res = await fetch('/api/data');
 *       if (!res.ok) throw new Error('Failed to fetch');
 *       return res.json();
 *     },
 *     {
 *       executeOnMount: true,
 *       maxRetries: 3,
 *       retryDelay: 1000,
 *       onError: (error, attempt) => {
 *         console.log(`Attempt ${attempt} failed:`, error);
 *       }
 *     }
 *   );
 * 
 *   return (
 *     <div>
 *       {isPending && <div>Loading... (retry: {retryCount})</div>}
 *       {error && <div>Error after retries: {error.message}</div>}
 *       {data && <div>Data: {JSON.stringify(data)}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export interface UseAsyncWithRetryOptions<T, E = Error> extends UseAsyncOptions<T, E> {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (error: E, attemptNumber: number) => void;
}

export interface UseAsyncWithRetryReturn<T, Args extends unknown[], E = Error>
  extends UseAsyncReturn<T, Args, E> {
  retryCount: number;
}

export function useAsyncWithRetry<T, Args extends unknown[] = [], E = Error>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncWithRetryOptions<T, E> = {}
): UseAsyncWithRetryReturn<T, Args, E> {
  const { maxRetries = 3, retryDelay = 1000, onRetry, ...asyncOptions } = options;
  const [retryCount, setRetryCount] = useState(0);
  const argsRef = useRef<Args | undefined>(undefined);

  const asyncWithRetry = useCallback(
    async (...args: Args): Promise<T> => {
      argsRef.current = args;
      let lastError: E | null = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await asyncFunction(...args);
          setRetryCount(0);
          return result;
        } catch (error) {
          lastError = error as E;
          setRetryCount(attempt + 1);

          if (attempt < maxRetries) {
            onRetry?.(lastError, attempt + 1);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
      }

      throw lastError;
    },
    [asyncFunction, maxRetries, retryDelay, onRetry]
  );

  const asyncState = useAsync(asyncWithRetry, asyncOptions);

  return {
    ...asyncState,
    retryCount,
  };
}
