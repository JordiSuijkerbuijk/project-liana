/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ['bg-purple', 'text-2xl'],
  theme: {
    colors: {
      purple: "#c295d8",
      "purple-light": "#c295d880",
      pink: "#f1c6d3",
      white: "#fff",
      background: "#1c1c1c",
      "background-tint": "#494949",
      "gradient-purple": "#c295d8",
      "gradient-pink": "#f1c6d3",
      transparent: "transparent",
      "background-shade": "#0e0e0e",
      "gradient-purple": "#c295d8",
      "gradient-pink": "#f1c6d3",
      black: '#000000'
    },
    fontFamily: {
      "ppmori-regular": "ppmori-regular",
      drukwide: "drukwide",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "heading-1": ["var(--heading-1)", "var(--heading-1-line-height)"],
        "heading-2": ["var(--heading-2)", "var(--heading-2-line-height)"],
        "heading-3": ["var(--heading-3)", "var(--heading-3-line-height)"],
        "heading-4": ["var(--heading-4)", "var(--heading-4-line-height)"],
        "heading-5": ["var(--heading-5)", "var(--heading-5-line-height)"],
        body: ["var(--body-text)", "var(--body-text-line-height)"],
        "small-body": [
          "var(--tiny-body-text)",
          "var(--tiny-body-text-line-height)",
        ],
      },
      scale: {
        33: "0.33",
        66: "0.66",
      },
      transitionTimingFunction: {
        "custom-ease-in": "cubic-bezier(.12,0,.66,.04)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
