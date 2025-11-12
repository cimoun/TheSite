import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, priority: TaskPriority) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, priority) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              status: 'active' as TaskStatus,
              priority,
              createdAt: Date.now(),
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'active' ? ('completed' as TaskStatus) : ('active' as TaskStatus),
                  completedAt: task.status === 'active' ? Date.now() : undefined,
                }
              : task
          ),
        })),
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'completed'),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);
