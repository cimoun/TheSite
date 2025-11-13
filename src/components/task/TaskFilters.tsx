import { motion } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';
import type { TaskFilter } from '../../types/task';

const filters: { label: string; value: TaskFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Завершённые', value: 'completed' },
];

const sortOptions: { label: string; value: 'default' | 'dueDate' | 'priority' }[] = [
  { label: 'Новые первыми', value: 'default' },
  { label: 'По сроку', value: 'dueDate' },
  { label: 'По приоритету', value: 'priority' },
];

export const TaskFilters: React.FC = () => {
  const currentFilter = useUIStore((state) => state.currentFilter);
  const setCurrentFilter = useUIStore((state) => state.setCurrentFilter);
  const sortMode = useUIStore((state) => state.sortMode);
  const setSortMode = useUIStore((state) => state.setSortMode);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter tasks">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            onClick={() => setCurrentFilter(filter.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 min-w-[100px] ${
              currentFilter === filter.value
                ? 'text-white shadow-md'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            style={
              currentFilter === filter.value
                ? { backgroundColor: '#5A7367' }
                : { color: '#5A7367' }
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={currentFilter === filter.value}
            aria-label={`Show ${filter.label.toLowerCase()} tasks`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
      
      <div className="flex gap-2 items-center flex-wrap">
        <label className="text-sm font-medium" style={{ color: '#5A7367' }}>Сортировка:</label>
        <div className="flex gap-2 flex-wrap">
          {sortOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setSortMode(option.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                sortMode === option.value
                  ? 'text-white shadow-sm'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={
                sortMode === option.value
                  ? { backgroundColor: '#8B956D' }
                  : { color: '#8B956D' }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={sortMode === option.value}
              aria-label={`Sort by ${option.label.toLowerCase()}`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
