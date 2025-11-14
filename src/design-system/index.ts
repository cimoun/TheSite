/**
 * Design System - Main Export
 * Centralized access to all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';

// Re-export as namespaced object for convenience
import * as colors from './colors';
import * as typography from './typography';
import * as spacing from './spacing';

export const designSystem = {
  colors,
  typography,
  spacing,
} as const;

export default designSystem;
