/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": 'url("./src/assets/main_background.jpg")',
      },
      colors: {
        "primary-color": "#12355B",
        'google-color': '#dd4b39',
      },
    },
  },
  plugins: [],
};
