/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto_mono': ['Roboto Mono', 'monospace'],
      },
      colors:{
        'gris-menu' :'#D9D9D9',
        'azul-principal': '#0E2F4F',
        'amarillo-principal': '#F8BD0D',
        'azul-claro': '#6185A9',
        'color-button': '#F79E9E',
        'color-Bsend': '#F8BD0D'
      }
    },
  },
  plugins: [],
}