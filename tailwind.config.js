module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        14: "14px",
        11: "11px",
      },
      boxShadow: {
        "card": " 4px 4px 48px rgba(25, 39, 89, 0.16)",
      },
      // fontFamily: {
      //   "Inter": ,
      // },

      // backgroundImage: {
      //   'hero-pattern': "url('/images/slider1.jpeg')",
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
