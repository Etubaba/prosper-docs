/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4285F4",
        iconcolor: "#5F6368",
        texttitle: "#202124",
        textcolor: "#5F656D",
        primarybg: "#F1F3F4",
      },
      fontWeight: {
        main: 500,
      },
    },
  },
  plugins: [],
};
