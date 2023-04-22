/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend:{
      width: {
        '400': '25rem',
        '50': '3.125rem'
      },
      height: {
        '110': '6.875rem',
        '50': '3.125rem'
      }
    },
    colors: {
      'light': '#FFFFFF',
      'dark': '#18181B',
      'darkless': '#393941',
      'gray': '#858585',
      'primary': '#2AE98C',
      'primary-opacity-50': 'rgba(42, 233, 140, 0.1)',
    }
  },
  plugins: [],
}
