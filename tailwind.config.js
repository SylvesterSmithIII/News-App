/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        "Josefin": ['Josefin Sans', 'sans-serif']
      },
      screens: {
        'xs': '450px'
      }
    },
  },
  plugins: [],
}

