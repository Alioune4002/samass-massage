/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: "#F3FFF7",
        forest: "#005F41",
        ink: "#0D0D0D",
        softgray: "#6B7280",
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
};
