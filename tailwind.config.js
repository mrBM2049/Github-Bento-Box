/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core theme aliases
        prussian: "#101411", // Gray 6 (Process Black)
        indigo: "#232925",   // Gray 5 (Deep Charcoal)
        dusk: "#0A241B",     // Green 6 (Deep Forest)
        teal: "#0FBF3E",     // Green 4 (GitHub Green)
        canvas: "#F2F5F3",   // Gray 1 (Cool Canvas)

        // Palette Tokens from reference
        "gh-gray-1": "#F2F5F3",
        "gh-gray-2": "#E4EBE6",
        "gh-gray-3": "#B6BFB8",
        "gh-gray-4": "#909692",
        "gh-gray-5": "#232925",
        "gh-gray-6": "#101411",
        "gh-green-1": "#BFFFD1",
        "gh-green-2": "#8CF2A6",
        "gh-green-3": "#5FED83",
        "gh-green-4": "#0FBF3E",
        "gh-green-5": "#08872B",
        "gh-green-6": "#0A241B",
        "gh-green": "#0FBF3E",
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
        "gradient-tr": "linear-gradient(45deg, #101411, #232925, #0A241B, #0FBF3E, #F2F5F3)",
        "gradient-br": "linear-gradient(135deg, #101411, #232925, #0A241B, #0FBF3E, #F2F5F3)",
      },
    },
  },
  plugins: [],
};
