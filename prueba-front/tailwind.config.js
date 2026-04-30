/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
          colors: {
              'primary': '#D51F36',
              'primary-soft': '#FFF1F1',
              'primary-focus': '#BB152E',
              'background': '#F3F4F6',
              'text-primary': '#D51F36',
              'text-secondary': '#6B7280',
          },
      }
    },
  plugins: [],
}

