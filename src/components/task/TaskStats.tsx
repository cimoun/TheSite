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
      className="relative overflow-hidden flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border px-5 py-5 backdrop-blur-2xl transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-y-0 left-0 w-full"
          style={{
            transformOrigin: 'left center',
            opacity: completionProgress.opacity,
            background:
              'linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.32) 0%, rgba(var(--color-accent-rgb), 0.18) 45%, rgba(var(--color-accent-rgb), 0.05) 100%)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: completionProgress.fraction }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: completionProgress.opacity * 0.9,
            background: 'rgba(var(--color-accent-rgb), 0.12)',
          }}
          animate={{ opacity: [completionProgress.opacity * 0.6, completionProgress.opacity, completionProgress.opacity * 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col gap-2 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <div className="font-medium">
          Отображается{' '}
          <span
            className="font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            {pluralizeTasks(filteredTasks.length)}
          </span>
          {stats.total > filteredTasks.length && (
            <span style={{ color: 'var(--color-text-muted)' }}>
              {' '}из {pluralizeTasks(stats.total)}
            </span>
          )}
        </div>
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span>Всего задач: {stats.total}</span>
          <span>В работе: {stats.active}</span>
          <span>Закрыто: {stats.completed}</span>
          {stats.total > 0 && (
            <span>Прогресс: {stats.completionRate}%</span>
          )}
        </div>
      </div>

      {stats.completed > 0 && (
        <motion.button
          onClick={clearCompleted}
          className="relative z-10 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200"
          style={{
            background: 'var(--color-danger)',
            boxShadow: '0 18px 40px -26px rgba(var(--color-danger-rgb), 0.45)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 24px 50px -28px rgba(var(--color-danger-rgb), 0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          Очистить завершённые
        </motion.button>
      )}
    </motion.div>
  );
};
