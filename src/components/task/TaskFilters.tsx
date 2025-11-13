import { Button } from '../common';
import { useUIStore } from '../../stores/uiStore';
import type { TaskFilter } from '../../types/task';

const filters: { label: string; value: TaskFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const sortOptions: { label: string; value: 'default' | 'dueDate' | 'priority' }[] = [
  { label: 'Newest First', value: 'default' },
  { label: 'By Due Date', value: 'dueDate' },
  { label: 'By Priority', value: 'priority' },
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
          <Button
            key={filter.value}
            variant={currentFilter === filter.value ? 'primary' : 'secondary'}
            onClick={() => setCurrentFilter(filter.value)}
            className="min-w-[100px]"
            aria-pressed={currentFilter === filter.value}
            aria-label={`Show ${filter.label.toLowerCase()} tasks`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2 items-center flex-wrap">
        <label className="text-sm text-slate-600">Sort by:</label>
        <div className="flex gap-2 flex-wrap">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortMode(option.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                sortMode === option.value
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
              aria-pressed={sortMode === option.value}
              aria-label={`Sort by ${option.label.toLowerCase()}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
