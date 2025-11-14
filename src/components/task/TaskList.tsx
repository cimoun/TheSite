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
        role="status"
        aria-live="polite"
      >
        <div className="text-5xl mb-6" aria-hidden="true">✨</div>
        <p 
          className="text-lg font-normal max-w-2xl mx-auto px-4" 
          style={{ 
            color: '#6B7280', 
            lineHeight: '1.7',
            fontSize: '18px',
          }}
        >
          {searchQuery
            ? 'По запросу ничего не найдено. Измените формулировку или попробуйте более короткий запрос.'
            : currentFilter === 'completed'
            ? 'Пока нет завершённых задач — отметьте выполненное, как только закроете задачу.'
            : currentFilter === 'active'
            ? 'Активных задач нет. Просмотрите завершённые или добавьте новую запись.'
            : 'Пространство свободно. Запишите первую задачу, когда появится цель.'}
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-4 px-2">
        <p className="text-sm font-medium" style={{ color: '#6B7280' }}>
          {filteredTasks.length} {filteredTasks.length === 1 ? 'задача' : filteredTasks.length < 5 ? 'задачи' : 'задач'}
        </p>
      </div>
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
        role="list"
        aria-label="Список задач"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};
