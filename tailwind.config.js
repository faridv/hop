/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'body': '#323232',
      },
      colors: {
        'accent': '#FFD700',
      },
      fontFamily: {
        sans: ['vazirmatn', 'vazir', 'sans-serif'],
        serif: ['Scheherazade', 'Quran', 'Uthmani', 'serif'],
      }
    },
  },
  plugins: [],
}

