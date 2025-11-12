import { motion } from 'framer-motion';
import { hoverScale } from '../../utils/animations';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary' 
    ? 'btn-secondary' 
    : 'btn-icon';

  return (
    <motion.button
      className={`${baseClass} ${className}`}
      {...hoverScale}
      {...props}
    >
      {children}
    </motion.button>
  );
};
