import { useUIStore } from '../../stores/uiStore';

export const TaskSearch: React.FC = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);

  return (
    <div className="relative">
      <label htmlFor="task-search" className="sr-only">
        Поиск задач
      </label>
      <div className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: '#8B956D' }}>
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
        className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-transparent bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-secondary-deepGreen/30 focus:ring-4 focus:ring-secondary-deepGreen/10 transition-all duration-300 outline-none"
        style={{
          boxShadow: '0 2px 8px rgba(90, 115, 103, 0.08)',
          color: '#2D3A35',
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
