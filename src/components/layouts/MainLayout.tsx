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
    <div className="min-h-screen py-12 px-4 relative" style={{ backgroundColor: '#F5F1E8' }}>
      <BreathingBackground />
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto relative"
        style={{ zIndex: 1 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/40">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
