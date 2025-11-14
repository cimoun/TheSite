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
      className="mb-12 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <div className="space-y-2">
          <h1
            className="text-4xl font-semibold tracking-tight"
            style={{ color: '#4c5f58', letterSpacing: '0.015em' }}
          >
            {title}
          </h1>
          <p
            className="text-sm uppercase tracking-[0.35em] text-[#8B956D]"
          >
            эффективно
          </p>
        </div>
        <ThemeToggle />
      </div>
      <p
        className="mt-4 text-lg font-normal leading-relaxed"
        style={{ color: '#6d7c75', letterSpacing: '0.015em' }}
      >
        {subtitle}
      </p>
    </motion.header>
  );
};
