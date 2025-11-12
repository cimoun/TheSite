import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'ToDo App',
  subtitle = 'Organize your tasks efficiently'
}) => {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="text-center mb-8"
    >
      <h1 className="text-5xl font-bold text-slate-800 mb-2">
        📝 {title}
      </h1>
      <p className="text-lg text-slate-500">
        {subtitle}
      </p>
    </motion.header>
  );
};
