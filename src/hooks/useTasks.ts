import { useState, useCallback, useEffect } from 'react';

/**
 * Task priority levels
 */
export type TaskPriority = 'high' | 'medium' | 'low';

/**
 * Represents a single task in the ToDo app
 */
export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: string;
  completedAt: string | null;
}

/**
 * Filter options for tasks
 */
export type TaskFilter = 'all' | 'active' | 'completed';

/**
 * Error types that can occur during task operations
 */
export class TaskError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'TaskError';
  }
}

/**
 * Hook return type
 */
export interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  currentFilter: TaskFilter;
  addTask: (text: string, priority?: TaskPriority) => void;
  updateTask: (id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  clearCompleted: () => void;
  setFilter: (filter: TaskFilter) => void;
  activeCount: number;
  completedCount: number;
  error: Error | null;
  clearError: () => void;
}

/**
 * Options for the useTasks hook
 */
export interface UseTasksOptions {
  storageKey?: string;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for managing tasks in a ToDo application
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing tasks state and management functions
 * 
 * @example
 * ```tsx
 * function TodoApp() {
 *   const {
 *     tasks,
 *     filteredTasks,
 *     addTask,
 *     toggleTask,
 *     deleteTask,
 *     setFilter
 *   } = useTasks({ storageKey: 'my-todos' });
 * 
 *   return (
 *     <div>
 *       <button onClick={() => addTask('New task', 'high')}>Add Task</button>
 *       {filteredTasks.map(task => (
 *         <div key={task.id}>
 *           <input
 *             type="checkbox"
 *             checked={task.completed}
 *             onChange={() => toggleTask(task.id)}
 *           />
 *           {task.text}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTasks(options: UseTasksOptions = {}): UseTasksReturn {
  const { storageKey = 'todos', onError } = options;
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [error, setError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch (err) {
      const error = new TaskError('Failed to load tasks from storage');
      setError(error);
      onError?.(error);
    } finally {
      setIsInitialized(true);
    }
  }, [storageKey, onError]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (err) {
      const error = new TaskError('Failed to save tasks to storage');
      setError(error);
      onError?.(error);
    }
  }, [tasks, storageKey, onError, isInitialized]);

  /**
   * Add a new task
   */
  const addTask = useCallback((text: string, priority: TaskPriority = 'medium') => {
    try {
      const trimmedText = text.trim();
      
      if (!trimmedText) {
        throw new TaskError('Task text cannot be empty', 'EMPTY_TEXT');
      }
      
      if (trimmedText.length > 500) {
        throw new TaskError('Task text is too long (max 500 characters)', 'TEXT_TOO_LONG');
      }

      const newTask: Task = {
        id: Date.now(),
        text: trimmedText,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };

      setTasks(prev => [...prev, newTask]);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new TaskError('Failed to add task');
      setError(error);
      onError?.(error);
      throw error;
    }
  }, [onError]);

  /**
   * Update an existing task
   */
  const updateTask = useCallback((id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    try {
      setTasks(prev => {
        const taskIndex = prev.findIndex(t => t.id === id);
        if (taskIndex === -1) {
          throw new TaskError('Task not found', 'NOT_FOUND');
        }

        const updated = [...prev];
        updated[taskIndex] = { ...updated[taskIndex], ...updates };
        
        // Validate text if it's being updated
        if (updates.text !== undefined) {
          const trimmedText = updates.text.trim();
          if (!trimmedText) {
            throw new TaskError('Task text cannot be empty', 'EMPTY_TEXT');
          }
          if (trimmedText.length > 500) {
            throw new TaskError('Task text is too long (max 500 characters)', 'TEXT_TOO_LONG');
          }
          updated[taskIndex].text = trimmedText;
        }

        return updated;
      });
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new TaskError('Failed to update task');
      setError(error);
      onError?.(error);
      throw error;
    }
  }, [onError]);

  /**
   * Delete a task
   */
  const deleteTask = useCallback((id: number) => {
    try {
      setTasks(prev => {
        const filtered = prev.filter(t => t.id !== id);
        if (filtered.length === prev.length) {
          throw new TaskError('Task not found', 'NOT_FOUND');
        }
        return filtered;
      });
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new TaskError('Failed to delete task');
      setError(error);
      onError?.(error);
      throw error;
    }
  }, [onError]);

  /**
   * Toggle task completion status
   */
  const toggleTask = useCallback((id: number) => {
    try {
      setTasks(prev => {
        const taskIndex = prev.findIndex(t => t.id === id);
        if (taskIndex === -1) {
          throw new TaskError('Task not found', 'NOT_FOUND');
        }

        const updated = [...prev];
        const task = updated[taskIndex];
        updated[taskIndex] = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null,
        };

        return updated;
      });
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new TaskError('Failed to toggle task');
      setError(error);
      onError?.(error);
      throw error;
    }
  }, [onError]);

  /**
   * Clear all completed tasks
   */
  const clearCompleted = useCallback(() => {
    try {
      setTasks(prev => prev.filter(t => !t.completed));
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new TaskError('Failed to clear completed tasks');
      setError(error);
      onError?.(error);
      throw error;
    }
  }, [onError]);

  /**
   * Set the current filter
   */
  const setFilter = useCallback((filter: TaskFilter) => {
    setCurrentFilter(filter);
  }, []);

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Calculate filtered tasks
  const filteredTasks = tasks.filter(task => {
    switch (currentFilter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  }).sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const aPriority = priorityOrder[a.priority] || 1;
    const bPriority = priorityOrder[b.priority] || 1;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // Then by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Calculate counts
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return {
    tasks,
    filteredTasks,
    currentFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter,
    activeCount,
    completedCount,
    error,
    clearError,
  };
}
