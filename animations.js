/**
 * Framer Motion Animation Utilities
 * 
 * Pre-made animation objects for use with Framer Motion.
 * Each animation includes initial, animate, exit states and transition configs.
 * 
 * Usage:
 * import { fadeInUp, scaleIn } from './animations.js';
 * <motion.div {...fadeInUp}>Content</motion.div>
 * or
 * <motion.div variants={staggerContainer}>
 *   <motion.div variants={staggerItem}>Item</motion.div>
 * </motion.div>
 */

/**
 * fadeInUp - Fade in from below animation
 * Perfect for appearing elements, cards, and content sections
 */
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 60,
  },
  transition: {
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic bezier
    type: "tween",
  },
};

/**
 * scaleIn - Scale up from center animation
 * Ideal for modals, popups, dialogs, and overlays
 */
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
};

/**
 * slideFromLeft - Slide in from left animation
 * Perfect for drawers, sidebars, and off-canvas menus
 */
export const slideFromLeft = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "-100%",
    opacity: 0,
  },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
};

/**
 * slideFromRight - Slide in from right animation
 * Perfect for drawers, sidebars, and off-canvas menus
 */
export const slideFromRight = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "100%",
    opacity: 0,
  },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
};

/**
 * staggerContainer - Container for staggered children animations
 * Use with staggerItem for list animations
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0.1,
  },
};

/**
 * staggerItem - Individual item animation for staggered lists
 * Use as child of staggerContainer
 */
export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 12,
  },
};

/**
 * bounceIn - Bounce in animation
 * Great for important elements, notifications, badges, and alerts
 */
export const bounceIn = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 0.8,
  },
};

/**
 * shimmer - Shimmer/shine animation for loading states
 * Creates a moving gradient effect for skeleton loaders
 */
export const shimmer = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
  },
  exit: {
    backgroundPosition: "200% 0",
  },
  transition: {
    duration: 2,
    ease: "linear",
    repeat: Infinity,
    type: "tween",
  },
};

/**
 * Additional helper: Combine animation objects with custom overrides
 * 
 * @param {Object} baseAnimation - Base animation object
 * @param {Object} overrides - Properties to override
 * @returns {Object} Merged animation object
 * 
 * Example:
 * const customFadeIn = mergeAnimations(fadeInUp, {
 *   transition: { duration: 1.2 }
 * });
 */
export const mergeAnimations = (baseAnimation, overrides = {}) => {
  return {
    ...baseAnimation,
    ...overrides,
    transition: {
      ...baseAnimation.transition,
      ...overrides.transition,
    },
  };
};

/**
 * Export all animations as a single object for convenience
 */
export const animations = {
  fadeInUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  bounceIn,
  shimmer,
};

export default animations;
