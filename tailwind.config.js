/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'add-user': "url('/src/assets/add-user.svg')",
      
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("daisyui")
  ],
}