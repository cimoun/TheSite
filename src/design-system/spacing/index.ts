/**
 * Design System - Spacing
 * Consistent spacing scale for layouts and components
 */

export const spacing = {
  // Base spacing unit: 4px
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  
  // Touch targets
  touchTarget: '44px', // Minimum for mobile accessibility
  
  // Component-specific spacing
  component: {
    padding: {
      button: '12px 24px',
      input: '12px 16px',
      card: '24px',
    },
    gap: {
      tight: '8px',
      normal: '16px',
      relaxed: '24px',
      loose: '32px',
    },
  },
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(90, 115, 103, 0.1)',
  lg: '0 10px 15px rgba(90, 115, 103, 0.15)',
  xl: '0 20px 25px rgba(90, 115, 103, 0.2)',
  
  // Elevation shadows
  elevation: {
    low: '0 2px 8px rgba(90, 115, 103, 0.08)',
    medium: '0 8px 24px rgba(90, 115, 103, 0.12)',
    high: '0 16px 48px rgba(90, 115, 103, 0.16)',
  },
} as const;
