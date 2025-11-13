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
  low: '#8B956D',      // Olive - calm
  medium: '#D4726F',   // Terracotta - warm
  high: '#6B9A9E'      // Teal - focused
};
