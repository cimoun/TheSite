import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import { formatDate, getDueDateLabel } from '../../utils/helpers';
import { staggerItem } from '../../utils/animations';
import { PRIORITY_COLORS } from '../../types/task';
import { useToast } from '../../hooks/useToast';
import type { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { showToast } = useToast();

  const handleToggle = () => {
    toggleTask(task.id);
    showToast(
      task.completed ? 'Задача отмечена как активная' : 'Задача завершена',
      'success',
      2000
    );
  };

  const handleDelete = () => {
    deleteTask(task.id);
    showToast('Задача удалена', 'info', 2000);
  };

  const priorityLabels = {
    low: 'низкий',
    medium: 'средний',
    high: 'высокий',
  };

  return (
    <motion.li
      layout
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-start gap-4 rounded-2xl p-6 border backdrop-blur-2xl transition-all duration-300 ${
        task.completed ? 'opacity-60' : ''
      }`}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
      whileHover={{
        boxShadow: '0 28px 60px -40px rgba(3, 8, 20, 0.6)',
        y: -2,
      }}
      role="listitem"
    >
      <div className="flex items-center gap-4 flex-1">
        <motion.button
          onClick={handleToggle}
          className="rounded-full border transition-all duration-200 flex items-center justify-center flex-shrink-0"
          style={{
            background: task.completed ? 'var(--color-accent)' : 'rgba(12, 20, 36, 0.6)',
            borderColor: task.completed
              ? 'transparent'
              : 'rgba(148, 163, 184, 0.32)',
            width: '44px',
            height: '44px',
            minWidth: '44px',
            minHeight: '44px',
            boxShadow: task.completed
              ? '0 18px 38px -24px rgba(var(--color-accent-rgb), 0.5)'
              : 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={task.completed ? 'Отметить как незавершённую' : 'Отметить как завершённую'}
          aria-pressed={task.completed}
        >
          {task.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
              aria-label={`Приоритет: ${priorityLabels[task.priority]}`}
              role="img"
            />
            <p
              className={`text-base font-normal transition-all duration-200 dark:text-gray-200 ${
                task.completed
                  ? 'line-through'
                  : ''
              }`}
              style={{
                color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                lineHeight: '1.6',
                fontSize: '16px',
              }}
            >
              {task.text}
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <time dateTime={new Date(task.createdAt).toISOString()}>
              Создано: {formatDate(task.createdAt)}
            </time>
            {task.dueDate && (() => {
              const { label, isOverdue } = getDueDateLabel(task.dueDate);

              return (
                <>
                  <span aria-hidden="true">•</span>
                  <time
                    dateTime={task.dueDate}
                    className={isOverdue ? 'font-semibold' : 'font-medium'}
                    style={{ color: isOverdue ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}
                  >
                    Срок: {label}
                    {isOverdue && <span className="sr-only"> (Задача просрочена)</span>}
                  </time>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleDelete}
        className="p-3 rounded-xl transition-all duration-200 flex-shrink-0"
        style={{
          color: 'var(--color-danger)',
          minWidth: '44px',
          minHeight: '44px',
        }}
        whileHover={{
          scale: 1.1,
          backgroundColor: 'var(--color-danger-muted)',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Удалить задачу "${task.text}"`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </motion.button>
    </motion.li>
  );
};
