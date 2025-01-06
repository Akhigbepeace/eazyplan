import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      fontFamily: {
        lato: ["var(--font-lato)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        primary: "#131C25",
        secondary: "#A3D8F4",
        "main-bg": "#F0F1F6",
        error: "#F8B4B4",
        darkGreen: "#2F4F4F",
        darkGray: "#333333",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;
