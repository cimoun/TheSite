/**
 * Design System - Color Palette
 * Following 60/30/10 rule:
 * - 60% Primary (neutral backgrounds)
 * - 30% Secondary (supporting colors)
 * - 10% Accent (call-to-action, highlights)
 */

// WCAG-compliant color palette
export const colors = {
  // Primary (60% - Neutral backgrounds and base)
  primary: {
    // Soft warm neutrals for backgrounds
    lightest: '#FAF8F5',  // Main background - soft white
    light: '#F5F1E8',     // Secondary background - warm beige
    base: '#E8DCC8',      // Borders and dividers - sand
    text: '#2D3A35',      // Primary text - soft black (instead of #000)
    textSoft: '#4B5563',  // Secondary text - graphite
  },
  
  // Secondary (30% - Supporting colors for context)
  secondary: {
    // Nature-inspired greens for balance
    deepGreen: '#5A7367',      // Deep green for important elements
    olive: '#8B956D',          // Olive for subtle accents
    teal: '#6B9A9E',           // Teal for informational elements
    graphiteLight: '#6B7280',  // Muted gray for less important text
  },
  
  // Accent (10% - Call-to-action and highlights)
  accent: {
    // Warm terracotta for actions and alerts
    terracotta: '#D4726F',      // Primary accent
    terracottaLight: '#E09C9A', // Lighter accent variant
    terracottaDark: '#B85E5B',  // Darker accent for hover states
  },
  
  // Semantic colors (for status feedback)
  semantic: {
    success: '#5A7367',    // Using deep green
    warning: '#D4726F',    // Using terracotta
    error: '#B85E5B',      // Using darker terracotta
    info: '#6B9A9E',       // Using teal
  },
  
  // Dark mode variants
  dark: {
    background: '#0F172A',      // Deep navy background
    backgroundSoft: '#111827',  // Slightly lighter background
    surface: '#1E293B',         // Surface for cards
    surfaceSoft: '#1F2937',     // Lighter surface
    text: '#E5E7EB',           // Primary text
    textMuted: '#94A3B8',       // Secondary text
    border: 'rgba(148, 163, 184, 0.35)',
  },
} as const;

// Priority colors for task management
export const PRIORITY_COLORS = {
  low: colors.secondary.olive,
  medium: colors.secondary.teal,
  high: colors.accent.terracotta,
} as const;

// Export individual palettes for easier consumption
export const primaryColors = colors.primary;
export const secondaryColors = colors.secondary;
export const accentColors = colors.accent;
export const semanticColors = colors.semantic;
export const darkColors = colors.dark;
