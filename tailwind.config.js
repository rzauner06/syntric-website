/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'syntriq-blue': '#0066CC',
        'syntriq-dark': '#1d1d1f',
        'syntriq-light': '#f5f5f7',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['80px', { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-sm': ['56px', { lineHeight: '1.07', letterSpacing: '-0.015em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
