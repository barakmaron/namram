/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('/src/images/home_pic.webp')"
      }
    },
  },
  plugins: [],
}
