import { memo } from 'react';
import type { FC } from 'react';
import { useUIStore } from '../../stores/uiStore';

const ThemeToggleComponent: FC = () => {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';
  const buttonClasses =
    'flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={buttonClasses}
      style={{
        background: 'rgba(12, 20, 36, 0.85)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)',
        boxShadow: '0 12px 32px -20px rgba(3, 8, 20, 0.6)',
      }}
      aria-label={isDark ? 'Переключить на светлое оформление' : 'Переключить на тёмное оформление'}
    >
      {isDark ? (
        <MoonIcon />
      ) : (
        <SunIcon />
      )}
    </button>
  );
};

export const ThemeToggle = memo(ThemeToggleComponent);

ThemeToggle.displayName = 'ThemeToggle';

const SunIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773-1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="h-5 w-5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

export default ThemeToggle;
