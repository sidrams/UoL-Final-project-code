/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#ffffff',
        black: '#000',
        'sea-green': '#55BDB3',
        'sea-green-opacity': '#55BDB32b',
        'light-sea-green' : '#F0F8F8',
        'blackish-blue':'#0F2435',
        'custom-gray' : '#FDFDFD',
        'medium-gray':'#fAfAfA',
        'navy-blue': '#213547',
        'mid-gray': '#848B84'
      },
    }
  },
}

