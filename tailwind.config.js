const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '30%': '30%',
      },
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      blackLighter: '#1A1A1A',
    }),
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      blackLighter: '#1A1A1A',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
