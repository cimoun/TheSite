import { motion } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';

export const BreathingBackground: React.FC = () => {
  const reduceAnimations = useUIStore((state) => state.reduceAnimations);
  const disableBackground = useUIStore((state) => state.disableBackground);

  // Completely disable background if user preference is set
  if (disableBackground) {
    return null;
  }

  // Create smooth breathing animations with different phases and durations
  const createBreathingVariant = (
    duration: number,
    delay: number,
    scaleMin: number,
    scaleMax: number,
    rotateRange: number
  ) => {
    const midScale = (scaleMin + scaleMax) / 2;

    return {
      initial: {
        scale: midScale,
        rotate: 0,
        opacity: 0.12,
      },
      animate: {
        scale: [scaleMin, midScale, scaleMax, midScale, scaleMin],
        rotate: [0, rotateRange, 0, -rotateRange, 0],
        opacity: [0.12, 0.18, 0.22, 0.18, 0.12],
        transition: {
          duration,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
          delay,
        },
      },
    };
  };

  const amplitudeFactor = reduceAnimations ? 0.3 : 0.7;
  const durationFactor = reduceAnimations ? 1.8 : 1.4;

  const adjustScale = (value: number) => 1 + (value - 1) * amplitudeFactor;
  const adjustRotate = (value: number) => value * amplitudeFactor;

  // Optimized: Only 3-4 shapes following 60/30/10 color rule
  const baseShapes = [
    {
      // Primary color shape (60% influence)
      color: '#E8DCC8', // sand (primary)
      className: 'absolute -top-32 -right-32 w-[600px] h-[600px]',
      duration: 11,
      delay: 0,
      scaleMin: 0.90,
      scaleMax: 1.10,
      rotateRange: 6,
      blur: 'blur(70px)',
    },
    {
      // Secondary color shape (30% influence)
      color: '#5A7367', // deep green (secondary)
      className: 'absolute top-1/3 -left-40 w-[550px] h-[550px]',
      duration: 12,
      delay: 2,
      scaleMin: 0.88,
      scaleMax: 1.12,
      rotateRange: 7,
      blur: 'blur(65px)',
    },
    {
      // Accent color shape (10% influence)
      color: '#D4726F', // terracotta (accent)
      className: 'absolute bottom-1/4 right-1/4 w-[450px] h-[450px]',
      duration: 10,
      delay: 1,
      scaleMin: 0.92,
      scaleMax: 1.08,
      rotateRange: 5,
      blur: 'blur(60px)',
    },
  ];

  // In reduced animation mode, show only 2 shapes
  const shapes = (reduceAnimations ? baseShapes.slice(0, 2) : baseShapes).map(
    ({ duration, delay, scaleMin, scaleMax, rotateRange, ...rest }) => ({
      ...rest,
      variant: createBreathingVariant(
        duration * durationFactor,
        delay,
        adjustScale(scaleMin),
        adjustScale(scaleMax),
        adjustRotate(rotateRange)
      ),
    })
  );

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
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
            mixBlendMode: 'screen',
            willChange: 'transform, opacity',
            transformOrigin: 'center center',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
