/**
 * Custom React Hooks for ToDo Application
 * 
 * This module exports production-ready custom hooks for managing
 * tasks, UI state, debouncing, previous values, and async operations.
 * 
 * @module hooks
 */

// Task management
export {
  useTasks,
  type Task,
  type TaskPriority,
  type TaskFilter,
  type UseTasksReturn,
  type UseTasksOptions,
  TaskError,
} from './useTasks';

// UI state management
export {
  useUIState,
  type Toast,
  type ToastType,
  type Modal,
  type UseUIStateReturn,
  type UseUIStateOptions,
} from './useUIState';

// Debouncing
export {
  useDebounce,
  useDebounceCallback,
  type UseDebounceCallbackOptions,
} from './useDebounce';

// Previous value tracking
export {
  usePrevious,
  usePreviousWithComparator,
  usePreviousHistory,
  useHasChanged,
} from './usePrevious';

// Async operations
export {
  useAsync,
  useAsyncWithRetry,
  type AsyncStatus,
  type AsyncState,
  type UseAsyncReturn,
  type UseAsyncOptions,
  type UseAsyncWithRetryOptions,
  type UseAsyncWithRetryReturn,
} from './useAsync';
