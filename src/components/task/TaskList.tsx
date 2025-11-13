import { motion, AnimatePresence } from 'framer-motion';
import { useFilteredTasks } from '../../hooks';
import { TaskItem } from './TaskItem';
import { staggerContainer } from '../../utils/animations';
import { useUIStore } from '../../stores/uiStore';

export const TaskList: React.FC = () => {
  const filteredTasks = useFilteredTasks();
  const searchQuery = useUIStore((state) => state.searchQuery);
  const currentFilter = useUIStore((state) => state.currentFilter);

  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center py-16"
      >
        <div className="text-5xl mb-4">✨</div>
        <p className="text-lg font-normal" style={{ color: '#8B956D', lineHeight: '1.8' }}>
          {searchQuery
            ? 'Нет задач, соответствующих поиску'
            : currentFilter === 'completed'
            ? 'Нет завершённых задач'
            : currentFilter === 'active'
            ? 'Нет активных задач'
            : 'Ваш разум свободен. Добавьте задачу, когда будете готовы.'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};
