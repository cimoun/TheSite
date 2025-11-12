import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <motion.div
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
