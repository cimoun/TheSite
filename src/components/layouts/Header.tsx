import { motion } from 'framer-motion';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'Breathe & Focus',
  subtitle = 'Balanced Day'
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
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-medium tracking-wide mb-2" style={{ color: '#5A7367', letterSpacing: '0.02em' }}>
        {title}
      </h1>
      <p className="text-base font-normal" style={{ color: '#8B956D', letterSpacing: '0.05em' }}>
        {subtitle}
      </p>
    </motion.header>
  );
};
