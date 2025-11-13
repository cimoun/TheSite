import { motion } from 'framer-motion';
import { BreathingBackground } from './BreathingBackground';

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
      className="min-h-screen py-12 px-4 relative transition-colors duration-500"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <BreathingBackground />
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto relative"
        style={{ zIndex: 1 }}
      >
        <div
          className="rounded-3xl p-12 backdrop-blur-sm border transition-colors duration-500"
          style={{
            background: 'var(--color-surface-strong)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-elevation)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
