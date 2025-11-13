import { motion } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';

export const BreathingBackground: React.FC = () => {
  const reduceAnimations = useUIStore((state) => state.reduceAnimations);

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

  const amplitudeFactor = reduceAnimations ? 0.35 : 1;
  const durationFactor = reduceAnimations ? 1.6 : 1;
  const delayFactor = reduceAnimations ? 0.6 : 1;

  const adjustScale = (value: number) => 1 + (value - 1) * amplitudeFactor;
  const adjustRotate = (value: number) => value * amplitudeFactor;

  const baseShapes = [
    {
      color: '#D4726F', // terracotta
      className: 'absolute -top-32 -right-32 w-[600px] h-[600px]',
      duration: 10,
      delay: 0,
      scaleMin: 0.85,
      scaleMax: 1.15,
      rotateRange: 8,
      blur: 'blur(60px)',
    },
    {
      color: '#E09C9A', // terracotta light
      className: 'absolute top-20 -right-20 w-[500px] h-[500px]',
      duration: 12,
      delay: 1,
      scaleMin: 0.9,
      scaleMax: 1.1,
      rotateRange: -6,
      blur: 'blur(70px)',
    },
    {
      color: '#5A7367', // deep green
      className: 'absolute top-1/4 -left-40 w-[550px] h-[550px]',
      duration: 11,
      delay: 2,
      scaleMin: 0.88,
      scaleMax: 1.12,
      rotateRange: 7,
      blur: 'blur(65px)',
    },
    {
      color: '#8B956D', // olive
      className: 'absolute bottom-32 left-1/4 w-[480px] h-[480px]',
      duration: 9,
      delay: 3,
      scaleMin: 0.92,
      scaleMax: 1.08,
      rotateRange: -5,
      blur: 'blur(55px)',
    },
    {
      color: '#6B9A9E', // teal
      className: 'absolute top-1/2 right-32 w-[520px] h-[520px]',
      duration: 10.5,
      delay: 1.5,
      scaleMin: 0.87,
      scaleMax: 1.13,
      rotateRange: 6,
      blur: 'blur(68px)',
    },
    {
      color: '#E8DCC8', // sand
      className: 'absolute -bottom-20 -left-20 w-[450px] h-[450px]',
      duration: 11.5,
      delay: 2.5,
      scaleMin: 0.9,
      scaleMax: 1.1,
      rotateRange: -7,
      blur: 'blur(75px)',
    },
    {
      color: '#D4726F', // terracotta (accent)
      className: 'absolute bottom-1/3 right-1/4 w-[380px] h-[380px]',
      duration: 8.5,
      delay: 0.5,
      scaleMin: 0.93,
      scaleMax: 1.07,
      rotateRange: 4,
      blur: 'blur(50px)',
    },
  ];

  const shapes = (reduceAnimations ? baseShapes.slice(0, 3) : baseShapes).map(
    ({ duration, delay, scaleMin, scaleMax, rotateRange, ...rest }) => ({
      ...rest,
      variant: createBreathingVariant(
        duration * durationFactor,
        delay * delayFactor,
        adjustScale(scaleMin),
        adjustScale(scaleMax),
        adjustRotate(rotateRange)
      ),
    })
  );

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
