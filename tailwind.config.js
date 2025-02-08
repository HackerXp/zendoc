/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Inclui arquivos HTML e TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        'primary': '#0F2045',
        'menu': '#263238',
        'danger': '#FF5959',
        'error': '#FF0505',
        'warning': '#F5BC00',
        sky: {
          DEFAULT: '#90CAF9',
          light: '#90CAF9cc', // 80% opacity
        },
      },
    },
  },
  plugins: [],
};


