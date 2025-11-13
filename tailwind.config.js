/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mindfulness/meditation color palette
        calm: {
          // Warm beige/cream backgrounds
          beige: '#F5F1E8',
          sand: '#E8DCC8',
          softWhite: '#FAF8F5',
          
          // Warm pink/terracotta accents
          terracotta: '#D4726F',
          terracottaLight: '#E09C9A',
          
          // Green and teal accents (nature and balance)
          deepGreen: '#5A7367',
          olive: '#8B956D',
          teal: '#6B9A9E',
          
          // Soft dark graphite for text and cards
          graphite: '#4B5563',
          graphiteLight: '#6B7280',
          graphiteDark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Light, airy typography
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75', letterSpacing: '0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.8', letterSpacing: '0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.8', letterSpacing: '0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.8', letterSpacing: '0.02em' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
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
