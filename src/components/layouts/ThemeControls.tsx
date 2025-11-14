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
  const disableBackground = useUIStore((state) => state.disableBackground);
  const setDisableBackground = useUIStore((state) => state.setDisableBackground);
  const backgroundStyle = useUIStore((state) => state.backgroundStyle);
  const setBackgroundStyle = useUIStore((state) => state.setBackgroundStyle);

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
            <div className="flex max-w-sm flex-col gap-4 rounded-2xl border border-white/30 bg-white/80 px-5 py-5 text-sm shadow-xl backdrop-blur-xl transition dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-secondary-olive dark:text-slate-300">
                    Настройка атмосферы
                  </p>
                  <p className="mt-2 text-base font-medium text-primary-text dark:text-slate-100">
                    Персонализируйте интерфейс под себя
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="mt-1 rounded-full p-2 text-secondary-olive transition hover:bg-white/60 hover:text-secondary-deepGreen dark:hover:bg-slate-800/70 min-w-[44px] min-h-[44px]"
                  aria-label="Свернуть панель настроек"
                >
                  <span aria-hidden className="block text-lg leading-none">×</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleThemeToggle}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/70 px-4 py-3 font-medium text-secondary-deepGreen transition hover:bg-white/90 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="text-lg">
                    {theme === 'light' ? '☀️' : '🌙'}
                  </span>
                  <span className="text-base">
                    {theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
                  </span>
                </span>
                <span className="rounded-full bg-secondary-deepGreen/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-deepGreen dark:bg-slate-700/70 dark:text-slate-200">
                  Сменить
                </span>
              </button>

              <div className="space-y-3 rounded-2xl bg-white/50 px-4 py-4 text-secondary-deepGreen shadow-inner transition dark:bg-slate-800/50 dark:text-slate-100">
                <label className="flex items-center justify-between gap-3 min-h-[44px]">
                  <span className="flex items-center gap-2 text-base font-medium">
                    <span aria-hidden className="text-lg">🧘</span>
                    Режим концентрации
                  </span>
                  <input
                    type="checkbox"
                    checked={reduceAnimations}
                    onChange={(event) => setReduceAnimations(event.target.checked)}
                    className="h-6 w-6 cursor-pointer accent-secondary-deepGreen dark:accent-slate-300"
                    aria-label="Снизить динамику фона"
                  />
                </label>
                <p className="text-sm leading-relaxed text-secondary-graphiteLight dark:text-slate-300">
                  Уменьшает амплитуду и количество фигур для спокойного фона.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl bg-white/50 px-4 py-4 text-secondary-deepGreen shadow-inner transition dark:bg-slate-800/50 dark:text-slate-100">
                <label className="flex items-center justify-between gap-3 min-h-[44px]">
                  <span className="flex items-center gap-2 text-base font-medium">
                    <span aria-hidden className="text-lg">🎨</span>
                    Отключить фон
                  </span>
                  <input
                    type="checkbox"
                    checked={disableBackground}
                    onChange={(event) => setDisableBackground(event.target.checked)}
                    className="h-6 w-6 cursor-pointer accent-secondary-deepGreen dark:accent-slate-300"
                    aria-label="Полностью отключить анимированный фон"
                  />
                </label>
                <p className="text-sm leading-relaxed text-secondary-graphiteLight dark:text-slate-300">
                  Полностью убирает анимированный фон для максимальной производительности.
                </p>
              </div>

              {!disableBackground && (
                <div className="space-y-3 rounded-2xl bg-white/50 px-4 py-4 text-secondary-deepGreen shadow-inner transition dark:bg-slate-800/50 dark:text-slate-100">
                  <p className="flex items-center gap-2 text-base font-medium">
                    <span aria-hidden className="text-lg">🖼️</span>
                    Стиль фона
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'dynamic', label: 'Динамический', icon: '✨' },
                      { value: 'gradient', label: 'Градиент', icon: '🌈' },
                      { value: 'minimal', label: 'Минимальный', icon: '⬜' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setBackgroundStyle(option.value as any)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition min-h-[44px] ${
                          backgroundStyle === option.value
                            ? 'bg-secondary-deepGreen text-white'
                            : 'bg-white/60 hover:bg-white/80 dark:bg-slate-700/60 dark:hover:bg-slate-700/80'
                        }`}
                        aria-pressed={backgroundStyle === option.value}
                      >
                        <span aria-hidden>{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-secondary-deepGreen shadow-lg backdrop-blur-xl transition hover:bg-white/95 dark:bg-slate-900/80 dark:text-slate-100"
            variants={collapsedButtonVariants}
            initial="hidden"
            animate="visible"
            aria-label="Открыть панель настроек темы"
          >
            <span aria-hidden className="text-2xl leading-none">⚙️</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
