/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C2A68C',
        'background-light': '#F5F5F0',
        'background-light-secondary': '#E6D8C3',
        'highlight-light': '#5D866C',
        'text-light': '#1F2937',
        'text-light-secondary': '#4B5563',
        'primary-dark': '#D1B395',
        'background-dark': '#2C2B29',
        'background-dark-secondary': '#403C37',
        'highlight-dark': '#7E9C88',
        'text-dark': '#F5F5F0',
        'text-dark-secondary': '#BDBDBD',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

