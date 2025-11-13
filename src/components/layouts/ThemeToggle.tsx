import { memo } from 'react';
import type { FC } from 'react';
import { useUIStore } from '../../stores/uiStore';

const ThemeToggleComponent: FC = () => {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';
  const buttonClasses =
    'flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#5A7367] shadow-sm transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A7367] dark:bg-[#2b2b2b] dark:text-[#f1f5f9]';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={buttonClasses}
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
