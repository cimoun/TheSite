import { motion, HTMLMotionProps } from 'framer-motion';
import { hoverScale } from '../../utils/animations';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
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

  const motionProps: HTMLMotionProps<'button'> = {
    className: `${baseClass} ${className}`,
    ...hoverScale,
    ...props,
  };

  return (
    <motion.button {...motionProps}>
      {children}
    </motion.button>
  );
};
