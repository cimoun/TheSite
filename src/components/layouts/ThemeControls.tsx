import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';

const collapsedButtonVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const ThemeControls: React.FC = () => {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const reduceAnimations = useUIStore((state) => state.reduceAnimations);
  const setReduceAnimations = useUIStore((state) => state.setReduceAnimations);

  const [isExpanded, setIsExpanded] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasDismissed) {
      return;
    }

    const timer = window.setTimeout(() => setIsExpanded(true), 400);
    return () => window.clearTimeout(timer);
  }, [hasDismissed]);

  const closePanel = () => {
    setIsExpanded(false);
    setHasDismissed(true);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    closePanel();
  };

  return (
    <div className="fixed top-6 right-6 z-20 flex flex-col items-end gap-3">
      <AnimatePresence initial={false} mode="wait">
        {isExpanded ? (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex max-w-xs flex-col gap-3 rounded-2xl border border-white/30 bg-white/75 px-4 py-4 text-sm shadow-xl backdrop-blur-xl transition dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B956D] dark:text-slate-300">
                    Настройка атмосферы
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#5A7367] dark:text-slate-100">
                    Выберите тему, которая поддержит ритм работы.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="mt-1 rounded-full p-1.5 text-[#8B956D] transition hover:bg-white/60 hover:text-[#5A7367] dark:hover:bg-slate-800/70"
                  aria-label="Свернуть панель настроек"
                >
                  <span aria-hidden className="block text-base leading-none">×</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleThemeToggle}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/70 px-3 py-2 font-medium text-[#5A7367] transition hover:bg-white/90 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="text-base">
                    {theme === 'light' ? '☀️' : '🌙'}
                  </span>
                  <span>
                    {theme === 'light' ? 'Светлое оформление' : 'Тёмное оформление'}
                  </span>
                </span>
                <span className="rounded-full bg-[#5A7367]/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[#5A7367] dark:bg-slate-700/70 dark:text-slate-200">
                  Применить
                </span>
              </button>

              <div className="space-y-1.5 rounded-2xl bg-white/50 px-3 py-3 text-[#5A7367] shadow-inner transition dark:bg-slate-800/50 dark:text-slate-100">
                <label className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span aria-hidden className="text-base">🧘</span>
                    Режим концентрации
                  </span>
                  <input
                    type="checkbox"
                    checked={reduceAnimations}
                    onChange={(event) => setReduceAnimations(event.target.checked)}
                    className="h-5 w-5 cursor-pointer accent-[#5A7367] dark:accent-slate-300"
                    aria-label="Снизить динамику фона"
                  />
                </label>
                <p className="text-xs leading-relaxed text-[#8B956D] dark:text-slate-300">
                  Уменьшает амплитуду и количество фигур, чтобы кадр был спокойнее.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/75 text-[#5A7367] shadow-lg backdrop-blur-xl transition hover:bg-white/90 dark:bg-slate-900/70 dark:text-slate-100"
            variants={collapsedButtonVariants}
            initial="hidden"
            animate="visible"
            aria-label="Открыть панель настроек темы"
          >
            <span aria-hidden className="text-xl leading-none">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
