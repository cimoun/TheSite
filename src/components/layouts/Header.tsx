import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'Дыши и Сосредоточься',
  subtitle = 'Сбалансированный День'
}) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="mb-12 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <h1
          className="text-4xl font-medium tracking-wide"
          style={{ color: '#5A7367', letterSpacing: '0.02em' }}
        >
          {title}
        </h1>
        <ThemeToggle />
      </div>
      <p
        className="mt-3 text-base font-normal"
        style={{ color: '#8B956D', letterSpacing: '0.05em' }}
      >
        {subtitle}
      </p>
    </motion.header>
  );
};
