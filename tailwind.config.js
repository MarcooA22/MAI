/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: {
          mai: '#2F80FF',
        },
        cyan: {
          mai: '#00C2FF',
        },
        violet: {
          mai: '#7C3AED',
        },
      },
      maxWidth: {
        site: '1180px',
      },
    },
  },
  plugins: [],
}
