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
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000',
      'sea-green': '#55BDB3',
      'light-sea-green' : '#F0F8F8',
      'blackish-blue':'#0F2435',
      'custom-gray' : '#FDFDFD'
    },
  },
}

