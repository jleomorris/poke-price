module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '30%': '30%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
