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
      <div
        className="rounded-2xl p-4 sm:p-6 border backdrop-blur-2xl transition-all duration-300"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        {/* Filters section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Фильтры
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              •
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
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
                  className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 border"
                  style={{
                    background:
                      currentFilter === filter.value
                        ? 'var(--color-accent)'
                        : 'rgba(12, 20, 36, 0.55)',
                    color:
                      currentFilter === filter.value
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-muted)',
                    borderColor:
                      currentFilter === filter.value
                        ? 'transparent'
                        : 'var(--color-border)',
                    minHeight: '48px',
                    boxShadow:
                      currentFilter === filter.value
                        ? '0 18px 40px -26px rgba(var(--color-accent-rgb), 0.45)'
                        : 'none',
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      currentFilter === filter.value
                        ? '0 22px 48px -26px rgba(var(--color-accent-rgb), 0.65)'
                        : '0 0 0 0 rgba(0,0,0,0)',
                  }}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 text-white text-sm rounded-lg whitespace-nowrap z-10 pointer-events-none"
                    style={{
                      fontSize: '14px',
                      background: 'rgba(8, 14, 26, 0.95)',
                      boxShadow: '0 12px 30px -20px rgba(3, 8, 20, 0.65)',
                    }}
                  >
                    {filter.tooltip}
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                      style={{ background: 'rgba(8, 14, 26, 0.95)' }}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t my-4"
          style={{ borderColor: 'var(--color-border-soft)' }}
        />

        {/* Sorting section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Сортировка
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              •
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
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
                  className="px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 border"
                  style={{
                    background:
                      sortMode === option.value
                        ? 'var(--color-accent-muted)'
                        : 'rgba(12, 20, 36, 0.45)',
                    color:
                      sortMode === option.value
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-muted)',
                    borderColor:
                      sortMode === option.value
                        ? 'transparent'
                        : 'var(--color-border)',
                    minHeight: '48px',
                    boxShadow:
                      sortMode === option.value
                        ? '0 18px 38px -28px rgba(var(--color-accent-rgb), 0.4)'
                        : 'none',
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      sortMode === option.value
                        ? '0 22px 46px -28px rgba(var(--color-accent-rgb), 0.6)'
                        : '0 0 0 0 rgba(0,0,0,0)',
                  }}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 text-white text-sm rounded-lg whitespace-nowrap z-10 pointer-events-none"
                    style={{
                      fontSize: '14px',
                      background: 'rgba(8, 14, 26, 0.95)',
                      boxShadow: '0 12px 30px -20px rgba(3, 8, 20, 0.65)',
                    }}
                  >
                    {option.tooltip}
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                      style={{ background: 'rgba(8, 14, 26, 0.95)' }}
                    />
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
