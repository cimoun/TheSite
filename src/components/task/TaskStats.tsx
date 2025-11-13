import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import { useFilteredTasks } from '../../hooks';
import { getTaskStats, pluralizeTasks } from '../../utils/helpers';

export const TaskStats: React.FC = () => {
  // Use a single selector to get both tasks and clearCompleted
  const { tasks, clearCompleted } = useTaskStore((state) => ({
    tasks: state.tasks,
    clearCompleted: state.clearCompleted,
  }));
  
  const filteredTasks = useFilteredTasks();
  const stats = getTaskStats(tasks);

  const completionProgress = useMemo(() => ({
    fraction: stats.total > 0 ? stats.completionRate / 100 : 0,
    opacity: 0.14 + (stats.total > 0 ? (stats.completionRate / 100) * 0.24 : 0),
  }), [stats.completionRate, stats.total]);

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
      className="relative overflow-hidden flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border px-5 py-5 backdrop-blur-sm bg-white/60 border-white/30 shadow-sm dark:bg-dark-surface/80 dark:border-dark-border/40"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-calm-deepGreen/40 via-calm-teal/30 to-calm-olive/25"
          style={{
            transformOrigin: 'left center',
            opacity: completionProgress.opacity,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: completionProgress.fraction }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-calm-deepGreen/20"
          style={{ opacity: completionProgress.opacity * 0.9 }}
          animate={{ opacity: [completionProgress.opacity * 0.6, completionProgress.opacity, completionProgress.opacity * 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-2 text-sm text-calm-graphite dark:text-dark-text">
        <div className="font-medium">
          <span className="font-semibold text-calm-deepGreen dark:text-calm-teal">
            {pluralizeTasks(filteredTasks.length)}
          </span>{' '}
          показано
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-calm-olive dark:text-dark-textMuted">
          <span>Всего: {stats.total}</span>
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
          className="relative z-10 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 bg-calm-terracotta shadow-md shadow-calm-terracotta/30"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(212, 114, 111, 0.35)' }}
          whileTap={{ scale: 0.95 }}
        >
          Очистить завершённые
        </motion.button>
      )}
    </motion.div>
  );
};
