module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'karla': ['Karla', 'ui-sans-serif', 'system-ui'],
      'inter': ['Inter', 'ui-sans-serif', 'system-ui'],
      'manrope': ['Manrope', 'ui-sans-serif', 'system-ui']
    },
    extend: {

      scrollbar: {
        width: '6px',
        height: '6px',
        track: '#f1f1f1',
        thumb: '#888',
      },
      fontSize: {
        14: "14px",
        11: "11px",
      },
      boxShadow: {
        card: " 4px 4px 48px rgba(25, 39, 89, 0.16)",
      },
      height: {
        "90vh": "90vh",
        "80vh": "80vh",
      },
      screens: {
        sm: { max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        md: { min: "768px", max: "1023px" },

        lg: { max: "1279px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xl: { max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        "2xl": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
