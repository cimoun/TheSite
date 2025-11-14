/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Color Palette (60/30/10 rule)
        // Primary (60% - Backgrounds and neutrals)
        primary: {
          lightest: '#FAF8F5',
          light: '#F5F1E8',
          base: '#E8DCC8',
          text: '#2D3A35',      // Soft black (not #000)
          textSoft: '#4B5563',
        },
        // Secondary (30% - Supporting colors)
        secondary: {
          deepGreen: '#5A7367',
          olive: '#8B956D',
          teal: '#6B9A9E',
          graphiteLight: '#6B7280',
        },
        // Accent (10% - CTA and highlights)
        accent: {
          terracotta: '#D4726F',
          terracottaLight: '#E09C9A',
          terracottaDark: '#B85E5B',
        },
        // Legacy calm colors (for backward compatibility)
        calm: {
          beige: '#F5F1E8',
          sand: '#E8DCC8',
          softWhite: '#FAF8F5',
          terracotta: '#D4726F',
          terracottaLight: '#E09C9A',
          deepGreen: '#5A7367',
          olive: '#8B956D',
          teal: '#6B9A9E',
          graphite: '#4B5563',
          graphiteLight: '#6B7280',
          graphiteDark: '#374151',
        },
        dark: {
          background: '#0F172A',
          backgroundSoft: '#111827',
          surface: '#1E293B',
          surfaceSoft: '#1F2937',
          text: '#E5E7EB',
          textMuted: '#94A3B8',
          border: 'rgba(148, 163, 184, 0.35)',
        },
      },
      boxShadow: {
        'dark-card': '0 35px 120px -75px rgba(15, 23, 42, 0.85)',
        'elevation-low': '0 2px 8px rgba(90, 115, 103, 0.08)',
        'elevation-medium': '0 8px 24px rgba(90, 115, 103, 0.12)',
        'elevation-high': '0 16px 48px rgba(90, 115, 103, 0.16)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Design System typography scale
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],   // 12px
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 14px
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],         // 16px - body
        'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],       // 18px - subtitle
        'xl': ['1.375rem', { lineHeight: '1.7', letterSpacing: '0' }],       // 22px - subheader
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '0' }],        // 24px - h2
        '3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '0' }],          // 32px - h1
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'touch': '44px', // Minimum touch target
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'breathe': 'breathe 8s ease-in-out infinite',
        'breathe-slow': 'breathe 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.15' },
          '50%': { transform: 'scale(1.05)', opacity: '0.25' },
        },
      },
    },
  },
  plugins: [],
}
