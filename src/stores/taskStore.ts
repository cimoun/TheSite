import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskFilter, Priority } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (text: string, priority?: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, text: string, priority?: Priority) => void;
  clearCompleted: () => void;
  getFilteredTasks: (filter: TaskFilter, searchQuery?: string) => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (text: string, priority: Priority = 'medium') => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      updateTask: (id: string, text: string, priority?: Priority) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { 
                  ...task, 
                  text: text.trim(), 
                  ...(priority && { priority }),
                  updatedAt: new Date().toISOString() 
                }
              : task
          ),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },

      getFilteredTasks: (filter: TaskFilter, searchQuery = '') => {
        const { tasks } = get();
        let filtered = tasks;

        // Apply filter
        if (filter === 'active') {
          filtered = filtered.filter((task) => !task.completed);
        } else if (filter === 'completed') {
          filtered = filtered.filter((task) => task.completed);
        }

        // Apply search
        if (searchQuery.trim()) {
          filtered = filtered.filter((task) =>
            task.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
          );
        }

        return filtered;
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);
