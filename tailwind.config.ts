import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FFF5F5',
          100: '#FFE0E0',
          200: '#FFC5C5',
          300: '#FFA0A0',
          400: '#FF7070',
          500: '#FF6B6B',
          600: '#E55555',
          700: '#CC3A3A',
          800: '#A82424',
          900: '#7A1212',
        },
        mint: {
          50: '#EDFCFB',
          100: '#CEFAF7',
          200: '#9EF5F0',
          300: '#63EDE6',
          400: '#2EDCD5',
          500: '#4ECDC4',
          600: '#15B5AE',
          700: '#118D88',
          800: '#0E706B',
          900: '#0B5B57',
        },
        surface: {
          light: '#FAFAF7',
          dark: '#0D0D12',
        },
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'bounce-soft': 'bounce-soft 0.5s ease-in-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pop': 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'coral': '0 8px 32px rgba(255, 107, 107, 0.3)',
        'coral-sm': '0 4px 16px rgba(255, 107, 107, 0.2)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 2px 20px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
} satisfies Config;
