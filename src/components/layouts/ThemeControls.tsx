import { useUIStore } from '../../stores/uiStore';

export const ThemeControls: React.FC = () => {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const reduceAnimations = useUIStore((state) => state.reduceAnimations);
  const setReduceAnimations = useUIStore((state) => state.setReduceAnimations);

  return (
    <div className="fixed top-6 right-6 z-20">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm shadow-lg backdrop-blur-md transition dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-100">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-between gap-3 rounded-xl bg-white/60 px-3 py-2 font-medium text-[#5A7367] transition hover:bg-white/80 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="text-base">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
            <span>{theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}</span>
          </span>
          <span className="rounded-full bg-[#5A7367]/10 px-2 py-0.5 text-xs font-semibold text-[#5A7367] dark:bg-slate-700/70 dark:text-slate-200">
            Переключить
          </span>
        </button>

        <div className="space-y-1">
          <label className="flex items-center justify-between gap-3 text-[#5A7367] dark:text-slate-100">
            <span className="flex items-center gap-2 font-medium">
              <span aria-hidden className="text-base">🧘</span>
              Фокус-режим
            </span>
            <input
              type="checkbox"
              checked={reduceAnimations}
              onChange={(event) => setReduceAnimations(event.target.checked)}
              className="h-5 w-5 cursor-pointer accent-[#5A7367] dark:accent-slate-300"
              aria-label="Переключить мягкий фон"
            />
          </label>
          <p className="text-xs text-[#8B956D] dark:text-slate-300">
            Снижает количество фигур и мягкость анимации для концентрации.
          </p>
        </div>
      </div>
    </div>
  );
};
