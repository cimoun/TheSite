import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="text-center mt-8 text-sm text-slate-500"
    >
      <p>
        Built with React 18, TypeScript, Zustand, Framer Motion & Tailwind CSS
      </p>
      <p className="mt-1">
        © {currentYear} ToDo App. All rights reserved.
      </p>
    </motion.footer>
  );
};
