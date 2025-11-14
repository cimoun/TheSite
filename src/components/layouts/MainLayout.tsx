import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Lazy load background and theme controls for better performance
const CodexBackground = lazy(() =>
  import('./CodexBackground').then(module => ({ default: module.CodexBackground }))
);
const ThemeControls = lazy(() => 
  import('./ThemeControls').then(module => ({ default: module.ThemeControls }))
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Animation for the main panel - slight upward motion with fade
  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div
      className="relative min-h-screen px-4 py-12 sm:py-16 transition-colors duration-500 sm:px-6"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Lazy load background animation */}
      <Suspense fallback={null}>
        <CodexBackground />
      </Suspense>
      
      {/* Lazy load theme controls */}
      <Suspense fallback={null}>
        <ThemeControls />
      </Suspense>
      
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-4xl px-2 sm:px-0"
        style={{ zIndex: 1 }}
      >
        <div
          className="rounded-3xl border backdrop-blur-2xl transition-colors duration-500 p-8 sm:p-12"
          style={{
            background: 'var(--color-panel)',
            borderColor: 'var(--color-panel-border)',
            boxShadow: 'var(--shadow-panel)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
