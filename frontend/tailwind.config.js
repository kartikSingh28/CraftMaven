/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}" // <-- includes all your React files
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors matching the Home component's scheme
        'craft-dark-green': '#1B4D4A',     // Used for 'Craft' name, headings, and accents
        'craft-terracotta': '#C65A2E',     // Used for 'Maven' name, links, and accents
        'craft-light-bg': '#F7F3EC',       // Used for the policy page background
      },
    },
  },
  plugins: [],
}