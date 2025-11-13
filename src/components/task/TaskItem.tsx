import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import { formatDate, getDueDateLabel } from '../../utils/helpers';
import { staggerItem } from '../../utils/animations';
import { PRIORITY_COLORS } from '../../types/task';
import type { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <motion.li
      layout
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      className={`flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/30 transition-all duration-300 ${
        task.completed ? 'opacity-60' : ''
      }`}
      style={{
        boxShadow: '0 4px 6px -1px rgba(90, 115, 103, 0.1), 0 2px 4px -1px rgba(90, 115, 103, 0.06)',
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        <motion.button
          onClick={() => toggleTask(task.id)}
          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
            task.completed
              ? 'border-calm-deepGreen'
              : 'border-gray-300 hover:border-calm-deepGreen'
          }`}
          style={{
            backgroundColor: task.completed ? '#5A7367' : 'transparent',
          }}
          whileTap={{ scale: 0.9 }}
          aria-label={task.completed ? 'Отметить как незавершённую' : 'Отметить как завершённую'}
        >
          {task.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
              title={`Приоритет: ${task.priority === 'low' ? 'низкий' : task.priority === 'medium' ? 'средний' : 'высокий'}`}
            />
            <p
              className={`text-base font-normal transition-all duration-200 ${
                task.completed
                  ? 'line-through'
                  : ''
              }`}
              style={{
                color: task.completed ? '#9CA3AF' : '#4B5563',
                lineHeight: '1.6',
              }}
            >
              {task.text}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#9CA3AF' }}>
            <span>{formatDate(task.createdAt)}</span>
            {task.dueDate && (() => {
              const { label, isOverdue } = getDueDateLabel(task.dueDate);

              return (
                <>
                  <span aria-hidden="true">•</span>
                  <span
                    className={isOverdue ? 'font-medium' : undefined}
                    style={{ color: isOverdue ? '#D4726F' : '#8B956D' }}
                  >
                    Срок: {label}
                    {isOverdue && <span className="sr-only"> (Задача просрочена)</span>}
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <motion.button
        onClick={() => deleteTask(task.id)}
        className="p-2 rounded-full transition-all duration-200 flex-shrink-0"
        style={{ color: '#D4726F' }}
        whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(212, 114, 111, 0.1)',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Удалить задачу"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
