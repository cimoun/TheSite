export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
  dueDate?: string; // Optional ISO 8601 datetime string
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskFormData {
  text: string;
}

export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'var(--color-priority-low)',
  medium: 'var(--color-priority-medium)',
  high: 'var(--color-priority-high)'
};
