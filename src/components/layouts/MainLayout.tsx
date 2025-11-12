import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <div className="glass-effect rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
