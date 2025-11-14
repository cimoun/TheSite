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
            <div
              className="flex max-w-sm flex-col gap-4 rounded-2xl border px-5 py-5 text-sm transition backdrop-blur-2xl"
              style={{
                background: 'rgba(10, 17, 32, 0.88)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-soft)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Настройка атмосферы
                  </p>
                  <p
                    className="mt-2 text-base font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Персонализируйте интерфейс под себя
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="mt-1 rounded-full p-2 transition-colors duration-200 min-w-[44px] min-h-[44px] hover:bg-[rgba(12,20,36,0.65)]"
                  style={{
                    color: 'var(--color-text-muted)',
                    background: 'rgba(12, 20, 36, 0.4)',
                  }}
                  aria-label="Свернуть панель настроек"
                >
                  <span aria-hidden className="block text-lg leading-none">×</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleThemeToggle}
                className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 border min-h-[44px]"
                style={{
                  background: 'rgba(12, 20, 36, 0.55)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="text-lg">
                    {theme === 'light' ? '☀️' : '🌙'}
                  </span>
                  <span className="text-base">
                    {theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
                  </span>
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    background: 'rgba(var(--color-accent-rgb), 0.18)',
                    color: 'var(--color-accent)',
                  }}
                >
                  Сменить
                </span>
              </button>

              <div
                className="space-y-3 rounded-2xl px-4 py-4 border"
                style={{
                  background: 'rgba(12, 20, 36, 0.5)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'inset 0 12px 40px -32px rgba(3, 8, 20, 0.6)',
                }}
              >
                <label className="flex items-center justify-between gap-3 min-h-[44px]">
                  <span className="flex items-center gap-2 text-base font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    <span aria-hidden className="text-lg">🧘</span>
                    Режим концентрации
                  </span>
                  <input
                    type="checkbox"
                    checked={reduceAnimations}
                    onChange={(event) => setReduceAnimations(event.target.checked)}
                    className="h-6 w-6 cursor-pointer"
                    style={{ accentColor: 'var(--color-accent)' }}
                    aria-label="Снизить динамику фона"
                  />
                </label>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Уменьшает амплитуду и количество фигур для спокойного фона.
                </p>
              </div>

              <div
                className="space-y-3 rounded-2xl px-4 py-4 border"
                style={{
                  background: 'rgba(12, 20, 36, 0.5)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'inset 0 12px 40px -32px rgba(3, 8, 20, 0.6)',
                }}
              >
                <label className="flex items-center justify-between gap-3 min-h-[44px]">
                  <span className="flex items-center gap-2 text-base font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    <span aria-hidden className="text-lg">🎨</span>
                    Отключить фон
                  </span>
                  <input
                    type="checkbox"
                    checked={disableBackground}
                    onChange={(event) => setDisableBackground(event.target.checked)}
                    className="h-6 w-6 cursor-pointer"
                    style={{ accentColor: 'var(--color-accent)' }}
                    aria-label="Полностью отключить анимированный фон"
                  />
                </label>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Полностью убирает анимированный фон для максимальной производительности.
                </p>
              </div>

              {!disableBackground && (
                <div
                  className="space-y-3 rounded-2xl px-4 py-4 border"
                  style={{
                    background: 'rgba(12, 20, 36, 0.5)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'inset 0 12px 40px -32px rgba(3, 8, 20, 0.6)',
                  }}
                >
                  <p
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <span aria-hidden className="text-lg">🖼️</span>
                    Стиль фона
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'dynamic' as const, label: 'Динамический', icon: '✨' },
                      { value: 'gradient' as const, label: 'Градиент', icon: '🌈' },
                      { value: 'minimal' as const, label: 'Минимальный', icon: '⬜' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setBackgroundStyle(option.value)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition min-h-[44px] border"
                        style={{
                          background:
                            backgroundStyle === option.value
                              ? 'var(--color-accent)'
                              : 'rgba(12, 20, 36, 0.45)',
                          color:
                            backgroundStyle === option.value
                              ? 'var(--color-text-primary)'
                              : 'var(--color-text-muted)',
                          borderColor:
                            backgroundStyle === option.value
                              ? 'transparent'
                              : 'var(--color-border)',
                          boxShadow:
                            backgroundStyle === option.value
                              ? '0 18px 38px -26px rgba(var(--color-accent-rgb), 0.45)'
                              : 'none',
                        }}
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
            className="flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 backdrop-blur-2xl"
            style={{
              background: 'rgba(12, 20, 36, 0.7)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
              boxShadow: 'var(--shadow-soft)',
            }}
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
