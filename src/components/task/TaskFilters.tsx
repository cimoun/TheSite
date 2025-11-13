import { Button } from '../common';
import { useUIStore } from '../../stores/uiStore';
import type { TaskFilter } from '../../types/task';

const filters: { label: string; value: TaskFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const TaskFilters: React.FC = () => {
  const currentFilter = useUIStore((state) => state.currentFilter);
  const setCurrentFilter = useUIStore((state) => state.setCurrentFilter);

  return (
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
  );
};
