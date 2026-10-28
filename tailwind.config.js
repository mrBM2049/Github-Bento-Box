/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prussian: "#0b132b",
        indigo: "#1c2541",
        dusk: "#3a506b",
        teal: "#5bc0be",
        canvas: "#eef5f6",
      },
      fontFamily: {
        display: ['"Antonio"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        bento: "28px",
      },
      backgroundImage: {
        "gradient-tr": "linear-gradient(45deg, #0b132b, #1c2541, #3a506b, #5bc0be, #ffffff)",
        "gradient-br": "linear-gradient(135deg, #0b132b, #1c2541, #3a506b, #5bc0be, #ffffff)",
      },
    },
  },
  plugins: [],
};

