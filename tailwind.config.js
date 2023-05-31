/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "280px",

      carousel: "360px",

      xs: "420px",

      ssm: "550px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1400px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      gridTemplateColumns: {
        ["map-grid"]: "auto 25rem",
        ["map-grid-lg"]: "auto 25rem",
        ["map-grid-xl"]: "auto 40rem",
        ["share-plan"]: "50% 50%",
        ["images"]: "auto 8.5rem",
      },

      fontFamily: {
        poppins: ["Poppins, sans-serif"],
      },
      colors: {
        pink: {
          500: "#FB3C61",
        },
        gray: {
          100: "#F7F7FF",
          250: "#F4F4F4",
          260: "#F9F9F9",
          300: "#B6B6B6",
          500: "#7D7D7D",
          700: "#595A5F",
          900: "#222222",
        },
        yellow: {
          500: "#FCD632",
        },
        orange: {
          500: "#EC6C53",
        },
        purple: {
          500: "#5452A2",
          400: "#7E3EE3",
          300: "#C563B8",
        },
        blue: {
          400: "#659FE8",
          500: "#1977F2",
          900: "#032339",
        },
        green: {
          500: "#52BE8D",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
