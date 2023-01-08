/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      black: '#1D1D1F',
      white: '#FEFEFE',
      blue: '#3F51B5',
      gray: '#4A4A4C',
      'hover-blue': '#F8F9FC',
      'light-gray': '#E8E8E8',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
