import { motion } from 'framer-motion';

export const BreathingBackground: React.FC = () => {
  // Breathing animation variants for organic shapes
  const breathingVariants = {
    initial: { scale: 0.9, rotate: 0 },
    animate: {
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror' as const,
      },
    },
  };

  const breathingVariants2 = {
    initial: { scale: 0.85, rotate: 0 },
    animate: {
      scale: [0.85, 1.15, 0.85],
      rotate: [0, -3, 3, 0],
      transition: {
        duration: 7,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror' as const,
        delay: 0.5,
      },
    },
  };

  const breathingVariants3 = {
    initial: { scale: 0.95, rotate: 0 },
    animate: {
      scale: [0.95, 1.05, 0.95],
      rotate: [0, 4, -2, 0],
      transition: {
        duration: 6.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror' as const,
        delay: 1,
      },
    },
  };

  const breathingVariants4 = {
    initial: { scale: 0.92, rotate: 0 },
    animate: {
      scale: [0.92, 1.08, 0.92],
      rotate: [0, -4, 2, 0],
      transition: {
        duration: 7.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror' as const,
        delay: 1.5,
      },
    },
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Terracotta blob - top right */}
      <motion.div
        variants={breathingVariants}
        initial="initial"
        animate="animate"
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15"
        style={{ backgroundColor: '#D4726F' }}
      />
      
      {/* Deep green blob - left center */}
      <motion.div
        variants={breathingVariants2}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-12"
        style={{ backgroundColor: '#5A7367' }}
      />
      
      {/* Olive blob - bottom center */}
      <motion.div
        variants={breathingVariants3}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10"
        style={{ backgroundColor: '#8B956D' }}
      />
      
      {/* Teal blob - right center */}
      <motion.div
        variants={breathingVariants4}
        initial="initial"
        animate="animate"
        className="absolute top-1/2 right-20 w-64 h-64 rounded-full opacity-13"
        style={{ backgroundColor: '#6B9A9E' }}
      />

      {/* Additional small terracotta accent - bottom right */}
      <motion.div
        variants={breathingVariants}
        initial="initial"
        animate="animate"
        className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full opacity-8"
        style={{ backgroundColor: '#D4726F', filter: 'blur(40px)' }}
      />
    </div>
  );
};
