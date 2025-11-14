import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Задачи',
  subtitle = 'Планирование с фокусом'
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
      className="mb-16 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
        <div className="flex-1 space-y-3">
          <h1
            className="text-3xl font-semibold tracking-tight"
            style={{ 
              color: '#2D3A35',
              fontSize: '32px',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h1>
          <p
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: '#8B956D' }}
          >
            эффективно
          </p>
        </div>
        {/* Theme toggle moved to header for better visibility */}
        <ThemeToggle />
      </div>
      <p
        className="mt-6 text-lg font-normal leading-relaxed"
        style={{ 
          color: '#4B5563',
          fontSize: '18px',
          lineHeight: '1.7',
        }}
      >
        {subtitle}
      </p>
    </motion.header>
  );
};
