/**
 * Format a date to a readable string
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return dateObj.toLocaleDateString();
};

/**
 * Get task statistics
 */
export const getTaskStats = (tasks: Array<{ completed: boolean }>) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    active,
    completionRate,
  };
};

/**
 * Pluralize task count
 */
export const pluralizeTasks = (count: number): string => {
  if (count === 1) return '1 task';
  return `${count} tasks`;
};

/**
 * Validate task text
 */
export const validateTaskText = (text: string): { valid: boolean; error?: string } => {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Task cannot be empty' };
  }
  
  if (trimmed.length > 500) {
    return { valid: false, error: 'Task is too long (max 500 characters)' };
  }
  
  return { valid: true };
};
