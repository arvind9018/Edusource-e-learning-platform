/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ VERY IMPORTANT
  ],
  extend: {
  animation: {
    'fade-slide': 'fadeSlideUp 1s ease-out',
  },
  keyframes: {
    fadeSlideUp: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
},
}
