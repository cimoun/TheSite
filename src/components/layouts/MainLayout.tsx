import { motion } from 'framer-motion';
import { BreathingBackground } from './BreathingBackground';
import { ThemeControls } from './ThemeControls';

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
      className="relative min-h-screen px-4 py-12 transition-colors duration-500 sm:px-6"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <BreathingBackground />
      <ThemeControls />
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-3xl px-2 sm:px-0"
        style={{ zIndex: 1 }}
      >
        <div
          className="rounded-[2.25rem] border backdrop-blur-2xl transition-colors duration-500 shadow-2xl"
          style={{
            background: 'var(--color-panel)',
            borderColor: 'var(--color-panel-border)',
            boxShadow: 'var(--shadow-panel)',
            backdropFilter: 'blur(28px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
