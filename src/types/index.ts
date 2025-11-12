export type TaskStatus = 'active' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;
  completedAt?: number;
}

export type Theme = 'light' | 'dark';
