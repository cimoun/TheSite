import { useUIStore } from '../../stores/uiStore';

export const TaskSearch: React.FC = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);

  return (
    <div className="relative">
      <label htmlFor="task-search" className="sr-only">
        Поиск задач
      </label>
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-text-muted)' }}
      >
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
      <input
        id="task-search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск задач по названию..."
        className="w-full pl-12 pr-5 py-4 rounded-xl border transition-all duration-300 outline-none bg-[color:var(--color-surface-strong)] focus:ring-4 focus:ring-[rgba(var(--color-accent-rgb),0.18)] focus:border-[rgba(var(--color-accent-rgb),0.55)]"
        style={{
          boxShadow: 'var(--shadow-soft)',
          color: 'var(--color-text-primary)',
          fontSize: '16px',
          lineHeight: '1.5',
          minHeight: '56px',
        }}
        aria-label="Поиск задач"
        aria-describedby="search-helper"
      />
      <p id="search-helper" className="sr-only">
        Введите текст для поиска среди ваших задач
      </p>
    </div>
  );
};
