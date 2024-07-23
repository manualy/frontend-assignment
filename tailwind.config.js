/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1BC6B8",
        "text-main": "#485963",
      },
      animation: {
        "fill-gradient-primary": "fillGradientPrimary 5s ease infinite",
      },
      keyframes: {
        fillGradientPrimary: {
          "0%, 100%": { fill: "#1BC6B8" },
          "28%": { fill: "#00C692" },
          "64%": { fill: "#00C778" },
        },
      },
    },
  },
  plugins: [],
};
