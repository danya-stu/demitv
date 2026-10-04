/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        rustore: {
          DEFAULT: '#005BFF',
          dark: '#0047cc',
          light: '#337fff'
        }
      }
    },
  },
  plugins: [],
}
