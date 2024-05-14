/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#A9A9A9',
        accent: '#FFCCCC',
        background: '#FFFFFF',
        widget: '#EFEFEF',
        text: '#333333',
        border: '#B0C4DE',
        hover: '#FFD1D1',
        error: '#FF9999',
        success: '#98FB98',
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [],
}

