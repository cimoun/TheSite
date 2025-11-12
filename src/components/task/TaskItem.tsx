import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import { formatDate } from '../../utils/helpers';
import { staggerItem } from '../../utils/animations';
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
      className={`card card-hover flex items-start gap-4 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            task.completed
              ? 'bg-primary-500 border-primary-500'
              : 'border-slate-300 hover:border-primary-500'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
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
        </button>
        
        <div className="flex-1 min-w-0">
          <p
            className={`text-lg transition-all duration-200 ${
              task.completed
                ? 'line-through text-slate-400'
                : 'text-slate-700'
            }`}
          >
            {task.text}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {formatDate(task.createdAt)}
          </p>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="btn-icon text-red-500 hover:bg-red-50"
        aria-label="Delete task"
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
      </button>
    </motion.li>
  );
};
