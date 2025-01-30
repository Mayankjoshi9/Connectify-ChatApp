/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          primary:"#111b21",
          chat:"#2a3942",
          parti:"#3b4a54",
          search:"#202c33",
          input:"#2a3942",
        }
      },
    },
    plugins: [],
  }