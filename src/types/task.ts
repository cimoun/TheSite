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
