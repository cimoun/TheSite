import { Input } from '../common';
import { useUIStore } from '../../stores/uiStore';

export const TaskSearch: React.FC = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);

  return (
    <div className="relative">
      <label htmlFor="task-search" className="sr-only">
        Search tasks
      </label>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Input
        id="task-search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="pl-10"
        aria-label="Search tasks"
      />
    </div>
  );
};
