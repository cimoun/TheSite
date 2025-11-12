/**
 * TypeScript type definitions for Framer Motion Animation Utilities
 * 
 * Use these types for better TypeScript support when using the animations.
 */

export interface AnimationState {
  opacity?: number;
  x?: string | number;
  y?: string | number;
  scale?: number;
  backgroundPosition?: string;
  [key: string]: any;
}

export interface SpringTransition {
  type: 'spring';
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface TweenTransition {
  type: 'tween';
  duration?: number;
  ease?: string | number[];
  repeat?: number;
}

export interface StaggerTransition {
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: number;
}

export type TransitionConfig = SpringTransition | TweenTransition | StaggerTransition;

export interface AnimationVariant {
  initial: AnimationState;
  animate: AnimationState | { transition?: TransitionConfig };
  exit: AnimationState | { transition?: TransitionConfig };
  transition: TransitionConfig;
}

export interface StaggerContainerVariant {
  initial: Record<string, never>;
  animate: {
    transition: StaggerTransition;
  };
  exit: {
    transition: StaggerTransition;
  };
  transition: StaggerTransition;
}

// Export types for each animation
export const fadeInUp: AnimationVariant;
export const scaleIn: AnimationVariant;
export const slideFromLeft: AnimationVariant;
export const slideFromRight: AnimationVariant;
export const staggerContainer: StaggerContainerVariant;
export const staggerItem: AnimationVariant;
export const bounceIn: AnimationVariant;
export const shimmer: AnimationVariant;

// Helper function type
export function mergeAnimations(
  baseAnimation: AnimationVariant,
  overrides?: Partial<AnimationVariant>
): AnimationVariant;

// Default export
export interface Animations {
  fadeInUp: AnimationVariant;
  scaleIn: AnimationVariant;
  slideFromLeft: AnimationVariant;
  slideFromRight: AnimationVariant;
  staggerContainer: StaggerContainerVariant;
  staggerItem: AnimationVariant;
  bounceIn: AnimationVariant;
  shimmer: AnimationVariant;
}

declare const animations: Animations;
export default animations;
