import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Priority levels for tasks
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * Filter status options
 */
export type FilterStatus = 'all' | 'active' | 'completed';

/**
 * Task interface with all required fields
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Filter state for tasks
 */
export interface TaskFilter {
  status: FilterStatus;
  priority: Priority | null;
  searchTerm: string;
  tags: string[];
}

/**
 * Completion statistics
 */
export interface CompletionStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

/**
 * Task store state interface
 */
interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  
  // Task management methods
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  
  // Filter methods
  setFilter: (filter: Partial<TaskFilter>) => void;
  getFilteredTasks: () => Task[];
  
  // Statistics
  getCompletionStats: () => CompletionStats;
}

/**
 * Generate a unique ID for tasks
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Get current ISO timestamp
 */
const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Zustand store for managing tasks with persistence
 */
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: {
        status: 'all',
        priority: null,
        searchTerm: '',
        tags: [],
      },

      /**
       * Add a new task to the store
       */
      addTask: (task) => {
        const now = getCurrentTimestamp();
        const newTask: Task = {
          ...task,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      /**
       * Update an existing task
       */
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: getCurrentTimestamp() }
              : task
          ),
        }));
      },

      /**
       * Delete a task by ID
       */
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      /**
       * Toggle the completed status of a task
       */
      toggleComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: getCurrentTimestamp(),
                }
              : task
          ),
        }));
      },

      /**
       * Set filter criteria
       */
      setFilter: (filterUpdate) => {
        set((state) => ({
          filter: { ...state.filter, ...filterUpdate },
        }));
      },

      /**
       * Get filtered tasks based on current filter state
       */
      getFilteredTasks: () => {
        const { tasks, filter } = get();
        
        return tasks.filter((task) => {
          // Filter by status
          if (filter.status === 'active' && task.completed) return false;
          if (filter.status === 'completed' && !task.completed) return false;
          
          // Filter by priority
          if (filter.priority && task.priority !== filter.priority) return false;
          
          // Filter by search term
          if (filter.searchTerm) {
            const searchLower = filter.searchTerm.toLowerCase();
            const matchesTitle = task.title.toLowerCase().includes(searchLower);
            const matchesDescription = task.description.toLowerCase().includes(searchLower);
            if (!matchesTitle && !matchesDescription) return false;
          }
          
          // Filter by tags
          if (filter.tags.length > 0) {
            const hasMatchingTag = filter.tags.some((tag) =>
              task.tags.includes(tag)
            );
            if (!hasMatchingTag) return false;
          }
          
          return true;
        });
      },

      /**
       * Get completion statistics
       */
      getCompletionStats: () => {
        const { tasks } = get();
        const total = tasks.length;
        const completed = tasks.filter((task) => task.completed).length;
        const active = total - completed;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        return {
          total,
          completed,
          active,
          completionRate,
        };
      },
    }),
    {
      name: 'task-storage', // localStorage key
    }
  )
);
