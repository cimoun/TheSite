import { motion, HTMLMotionProps } from 'framer-motion';
import { hoverScale } from '../../utils/animations';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary' 
    ? 'btn-secondary' 
    : 'btn-icon';

  const motionProps: HTMLMotionProps<'button'> = {
    className: `${baseClass} ${className}`,
    type,
    ...hoverScale,
    ...props,
  };

  return (
    <motion.button {...motionProps}>
      {children}
    </motion.button>
  );
};
