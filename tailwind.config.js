/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#121316',
          darker: '#0B0C0E',
          surface: '#18191E',
          card: '#1F2128',
          border: '#2C2F38',
        },
        titanium: {
          light: '#9BA2B0',
          DEFAULT: '#5A606D',
          dark: '#353943',
        },
        racing: {
          DEFAULT: '#FF6219',
          glow: '#FF7728',
          dark: '#D04C08',
        },
        anod: {
          DEFAULT: '#1485EE',
          electric: '#00A2FF',
          dark: '#0C60B4',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
