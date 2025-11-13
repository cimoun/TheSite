import { useTaskStore } from '../../stores/taskStore';
import { useFilteredTasks } from '../../hooks';
import { getTaskStats, pluralizeTasks } from '../../utils/helpers';
import { motion } from 'framer-motion';

export const TaskStats: React.FC = () => {
  // Use a single selector to get both tasks and clearCompleted
  const { tasks, clearCompleted } = useTaskStore((state) => ({
    tasks: state.tasks,
    clearCompleted: state.clearCompleted,
  }));
  
  const filteredTasks = useFilteredTasks();
  const stats = getTaskStats(tasks);

  const statsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={statsVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30"
      style={{
        boxShadow: '0 2px 8px rgba(90, 115, 103, 0.08)',
      }}
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-sm font-medium" style={{ color: '#5A7367' }}>
          <span className="font-semibold">
            {pluralizeTasks(filteredTasks.length)}
          </span>{' '}
          показано
        </div>
        <div className="flex gap-4 text-xs" style={{ color: '#8B956D' }}>
          <span>Активных: {stats.active}</span>
          <span>Завершённых: {stats.completed}</span>
          {stats.total > 0 && (
            <span>Прогресс: {stats.completionRate}%</span>
          )}
        </div>
      </div>

      {stats.completed > 0 && (
        <motion.button
          onClick={clearCompleted}
          className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200"
          style={{
            backgroundColor: '#D4726F',
            boxShadow: '0 2px 8px rgba(212, 114, 111, 0.25)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 4px 12px rgba(212, 114, 111, 0.35)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Очистить завершённые
        </motion.button>
      )}
    </motion.div>
  );
};
