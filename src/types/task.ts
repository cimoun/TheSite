export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskFormData {
  text: string;
}

export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: '#22c55e',
  medium: '#eab308', 
  high: '#ef4444'
};
