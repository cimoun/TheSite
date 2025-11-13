import { useTaskStore } from '../../stores/taskStore';
import { useFilteredTasks } from '../../hooks';
import { getTaskStats, pluralizeTasks } from '../../utils/helpers';
import { Button } from '../common';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

export const TaskStats: React.FC = () => {
  // Use a single selector to get both tasks and clearCompleted
  const { tasks, clearCompleted } = useTaskStore((state) => ({
    tasks: state.tasks,
    clearCompleted: state.clearCompleted,
  }));
  
  const filteredTasks = useFilteredTasks();
  const stats = getTaskStats(tasks);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg"
    >
      <div className="flex flex-col gap-1">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">
            {pluralizeTasks(filteredTasks.length)}
          </span>{' '}
          shown
        </div>
        <div className="flex gap-4 text-xs text-slate-500">
          <span>Active: {stats.active}</span>
          <span>Completed: {stats.completed}</span>
          {stats.total > 0 && (
            <span>Progress: {stats.completionRate}%</span>
          )}
        </div>
      </div>

      {stats.completed > 0 && (
        <Button
          variant="secondary"
          onClick={clearCompleted}
          className="text-sm"
        >
          Clear Completed
        </Button>
      )}
    </motion.div>
  );
};
