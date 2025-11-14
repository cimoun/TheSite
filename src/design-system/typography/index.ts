/**
 * Design System - Typography
 * Two-font system: Inter (primary) and system fonts (fallback)
 */

export const fonts = {
  primary: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`,
  mono: `'SF Mono', 'Monaco', 'Consolas', monospace`,
} as const;

/**
 * Typography scale following requirements:
 * - 32px for main headers
 * - 18-22px for subheaders
 * - 16px for body text
 */
export const fontSizes = {
  // Headers
  h1: '32px',        // Main page headers
  h2: '24px',        // Section headers
  h3: '20px',        // Subsection headers
  
  // Subheaders
  subheader: '22px', // Large subheader
  subtitle: '18px',  // Regular subheader
  
  // Body text
  body: '16px',      // Primary body text
  bodySmall: '14px', // Secondary body text
  caption: '12px',   // Captions and helper text
  tiny: '11px',      // Very small text (labels, etc.)
} as const;

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
  loose: 1.8,
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Typography presets
export const typography = {
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  subheader: {
    fontSize: fontSizes.subheader,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  subtitle: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;
