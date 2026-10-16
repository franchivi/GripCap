/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0D11',
        racing: { DEFAULT: '#FF5500', soft: '#FF6A00' },
        anod: '#0088FF',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
