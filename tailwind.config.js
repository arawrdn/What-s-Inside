/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFD700",
        },
        black: {
          DEFAULT: "#000000",
        },
      },
    },
  },
  plugins: [],
};
