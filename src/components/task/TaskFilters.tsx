import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import type { TaskFilter } from '../../types/task';

const filters: { label: string; value: TaskFilter; tooltip: string }[] = [
  { label: 'Все задачи', value: 'all', tooltip: 'Показать все задачи' },
  { label: 'В работе', value: 'active', tooltip: 'Показать только активные задачи' },
  { label: 'Завершённые', value: 'completed', tooltip: 'Показать только завершённые задачи' },
];

const sortOptions: { label: string; value: 'default' | 'dueDate' | 'priority'; tooltip: string }[] = [
  { label: 'По добавлению', value: 'default', tooltip: 'Сортировать по времени добавления' },
  { label: 'По сроку', value: 'dueDate', tooltip: 'Сортировать по сроку выполнения' },
  { label: 'По приоритету', value: 'priority', tooltip: 'Сортировать по уровню приоритета' },
];

export const TaskFilters: React.FC = () => {
  const currentFilter = useUIStore((state) => state.currentFilter);
  const setCurrentFilter = useUIStore((state) => state.setCurrentFilter);
  const sortMode = useUIStore((state) => state.sortMode);
  const setSortMode = useUIStore((state) => state.setSortMode);
  
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [hoveredSort, setHoveredSort] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Combined filters and sorting in horizontal layout */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30 dark:border-slate-700/30">
        {/* Filters section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold" style={{ color: '#2D3A35' }}>
              Фильтры
            </span>
            <span className="text-sm" style={{ color: '#6B7280' }} aria-hidden="true">
              •
            </span>
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Выберите категорию задач
            </span>
          </div>
          <div className="flex gap-3 flex-wrap" role="group" aria-label="Фильтры задач">
            {filters.map((filter) => (
              <div key={filter.value} className="relative">
                <motion.button
                  onClick={() => setCurrentFilter(filter.value)}
                  onMouseEnter={() => setHoveredFilter(filter.value)}
                  onMouseLeave={() => setHoveredFilter(null)}
                  onFocus={() => setHoveredFilter(filter.value)}
                  onBlur={() => setHoveredFilter(null)}
                  className={`px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    currentFilter === filter.value
                      ? 'text-white shadow-md'
                      : 'bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90'
                  }`}
                  style={
                    currentFilter === filter.value
                      ? { 
                          backgroundColor: '#5A7367',
                          minHeight: '48px',
                        }
                      : { 
                          color: '#5A7367',
                          minHeight: '48px',
                        }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={currentFilter === filter.value}
                  aria-label={filter.tooltip}
                >
                  {filter.label}
                </motion.button>
                {/* Tooltip */}
                {hoveredFilter === filter.value && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 pointer-events-none"
                    style={{ fontSize: '14px' }}
                  >
                    {filter.tooltip}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-base/30 dark:border-slate-700/50 my-4" />

        {/* Sorting section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold" style={{ color: '#2D3A35' }}>
              Сортировка
            </span>
            <span className="text-sm" style={{ color: '#6B7280' }} aria-hidden="true">
              •
            </span>
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Упорядочить список
            </span>
          </div>
          <div className="flex gap-3 flex-wrap" role="group" aria-label="Сортировка задач">
            {sortOptions.map((option) => (
              <div key={option.value} className="relative">
                <motion.button
                  onClick={() => setSortMode(option.value)}
                  onMouseEnter={() => setHoveredSort(option.value)}
                  onMouseLeave={() => setHoveredSort(null)}
                  onFocus={() => setHoveredSort(option.value)}
                  onBlur={() => setHoveredSort(null)}
                  className={`px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    sortMode === option.value
                      ? 'text-white shadow-md'
                      : 'bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90'
                  }`}
                  style={
                    sortMode === option.value
                      ? { 
                          backgroundColor: '#8B956D',
                          minHeight: '48px',
                        }
                      : { 
                          color: '#8B956D',
                          minHeight: '48px',
                        }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={sortMode === option.value}
                  aria-label={option.tooltip}
                >
                  {option.label}
                </motion.button>
                {/* Tooltip */}
                {hoveredSort === option.value && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 pointer-events-none"
                    style={{ fontSize: '14px' }}
                  >
                    {option.tooltip}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
