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

  if (diffInMinutes < 1) return 'Только что';
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
  if (diffInHours < 24) return `${diffInHours} ч назад`;
  if (diffInDays < 7) return `${diffInDays} дн назад`;

  return dateObj.toLocaleDateString('ru-RU');
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
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} задач`;
  }
  
  if (lastDigit === 1) {
    return `${count} задача`;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} задачи`;
  }
  
  return `${count} задач`;
};

/**
 * Validate task text
 */
export const validateTaskText = (text: string): { valid: boolean; error?: string } => {
  const trimmed = text.trim();

  if (!trimmed) {
    return { valid: false, error: 'Задача не может быть пустой' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Задача слишком длинная (макс. 500 символов)' };
  }

  return { valid: true };
};

const pluralizeDays = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'дней';
  }

  if (lastDigit === 1) {
    return 'день';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня';
  }

  return 'дней';
};

/**
 * Get a human friendly due date label
 */
export const getDueDateLabel = (
  dueDate: string | Date,
): { label: string; isOverdue: boolean } => {
  const dueDateObj = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const today = new Date();

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const normalizedDueDate = normalizeDate(dueDateObj);
  const normalizedToday = normalizeDate(today);

  const diffInDays = Math.round(
    (normalizedDueDate.getTime() - normalizedToday.getTime()) / 86400000,
  );

  if (diffInDays === 0) {
    return { label: 'Сегодня', isOverdue: false };
  }

  if (diffInDays === 1) {
    return { label: 'Завтра', isOverdue: false };
  }

  if (diffInDays > 1) {
    return {
      label: `Через ${diffInDays} ${pluralizeDays(diffInDays)}`,
      isOverdue: false,
    };
  }

  const overdueDays = Math.abs(diffInDays);

  return {
    label: `Просрочено ${overdueDays} ${pluralizeDays(overdueDays)}`,
    isOverdue: true,
  };
};
