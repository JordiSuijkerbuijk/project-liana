/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "ppmori-regular": "ppmori-regular",
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
    },
  },
  plugins: [],
};
