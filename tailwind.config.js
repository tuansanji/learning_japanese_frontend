/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    important: "#app",
    screens: {
      tablet: "799px",
      // => @media (min-width: 640px) { ... }
      smm: "640px",
      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      phone: "400px",
      // => @media (min-width: 1280px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "796px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      ssm: { max: "399px" },
    },
    extend: {
      boxShadow: {
        desc: "rgba(0, 0, 0, 0.4) 0px 0px 10px",
      },
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
