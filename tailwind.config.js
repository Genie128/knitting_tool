/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F9F6F1',
        taupe: '#A99985',
        'sage-light': '#D1DBCB',
        'sage-dark': '#8A9A84',
        'stone-text': '#57534e',
      },
      fontFamily: {
        'serif': ['Lora', 'serif'],
        'sans': ['Nunito Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
