import { motion } from 'framer-motion';

export const BreathingBackground: React.FC = () => {
  // Create smooth breathing animations with different phases and durations
  const createBreathingVariant = (
    duration: number,
    delay: number,
    scaleMin: number,
    scaleMax: number,
    rotateRange: number
  ) => ({
    initial: { 
      scale: scaleMin, 
      rotate: 0,
      opacity: 0.08,
    },
    animate: {
      scale: [scaleMin, scaleMax, scaleMin],
      rotate: [0, rotateRange, -rotateRange, 0],
      opacity: [0.08, 0.18, 0.08],
      transition: {
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror' as const,
        delay,
      },
    },
  });

  // Define multiple overlapping shapes with different colors and animations
  const shapes = [
    {
      color: '#D4726F', // terracotta
      className: 'absolute -top-32 -right-32 w-[600px] h-[600px]',
      variant: createBreathingVariant(10, 0, 0.85, 1.15, 8),
      blur: 'blur(60px)',
    },
    {
      color: '#E09C9A', // terracotta light
      className: 'absolute top-20 -right-20 w-[500px] h-[500px]',
      variant: createBreathingVariant(12, 1, 0.9, 1.1, -6),
      blur: 'blur(70px)',
    },
    {
      color: '#5A7367', // deep green
      className: 'absolute top-1/4 -left-40 w-[550px] h-[550px]',
      variant: createBreathingVariant(11, 2, 0.88, 1.12, 7),
      blur: 'blur(65px)',
    },
    {
      color: '#8B956D', // olive
      className: 'absolute bottom-32 left-1/4 w-[480px] h-[480px]',
      variant: createBreathingVariant(9, 3, 0.92, 1.08, -5),
      blur: 'blur(55px)',
    },
    {
      color: '#6B9A9E', // teal
      className: 'absolute top-1/2 right-32 w-[520px] h-[520px]',
      variant: createBreathingVariant(10.5, 1.5, 0.87, 1.13, 6),
      blur: 'blur(68px)',
    },
    {
      color: '#E8DCC8', // sand
      className: 'absolute -bottom-20 -left-20 w-[450px] h-[450px]',
      variant: createBreathingVariant(11.5, 2.5, 0.9, 1.1, -7),
      blur: 'blur(75px)',
    },
    {
      color: '#D4726F', // terracotta (accent)
      className: 'absolute bottom-1/3 right-1/4 w-[380px] h-[380px]',
      variant: createBreathingVariant(8.5, 0.5, 0.93, 1.07, 4),
      blur: 'blur(50px)',
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          variants={shape.variant}
          initial="initial"
          animate="animate"
          className={`${shape.className} rounded-full`}
          style={{
            backgroundColor: shape.color,
            filter: shape.blur,
          }}
        />
      ))}
    </div>
  );
};
