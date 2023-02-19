/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      phone: "400px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      animation: {
        title: "ribbon-shaking 1.5s ease-in-out infinite",
      },
      keyframes: {
        "ribbon-shaking": {
          "0%": {
            transform: "rotate(0deg)",
          },
          " 50%": {
            transform: "rotate(3deg)",
          },
          "  100%": {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
