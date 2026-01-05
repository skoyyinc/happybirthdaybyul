/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunflower': '#FFD700',
        'cream': '#FFFBEB',
        'soft-pink': '#F472B6',
      },
      fontFamily: {
        'sans': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

