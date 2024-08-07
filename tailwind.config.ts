/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['bg-purple', 'text-2xl'],
  theme: {
    colors: {
      purple: '#c295d8',
      'purple-light': '#c295d880',
      pink: '#f1c6d3',
      white: '#fff',
      'background-tint': '#494949',
      'gradient-purple': '#c295d8',
      'gradient-pink': '#f1c6d3',
      transparent: 'transparent',
      'background-shade': '#0e0e0e',
      black: '#000000',
      menu: '#2c2c2c',
      'menu-backdrop': 'rgba(34, 34, 34, 0.8)',
      'menu-inner': '#2c2c2c',
      'menu-text': '#d3d3d3',
      accent: 'var(--accent)',
      primary: 'var(--primary)',
      'color-text': 'var(--color-text)',
      background: 'var(--background)',
    },
    fontFamily: {
      'ppmori-regular': 'ppmori-regular',
      drukwide: 'drukwide',
    },
    extend: {
      aspectRatio: {
        '1/1.25': '1 / 1.25',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'heading-1': ['var(--heading-1)', 'var(--heading-1-line-height)'],
        'heading-2': ['var(--heading-2)', 'var(--heading-2-line-height)'],
        'heading-3': ['var(--heading-3)', 'var(--heading-3-line-height)'],
        'heading-4': ['var(--heading-4)', 'var(--heading-4-line-height)'],
        'heading-5': ['var(--heading-5)', 'var(--heading-5-line-height)'],
        body: ['var(--body-text)', 'var(--body-text-line-height)'],
        'small-body': ['var(--small-body-text)', 'var(--small-body-text-line-height)'],
      },
      scale: {
        33: '0.33',
        66: '0.66',
      },
      width: {
        'full-without-padding': 'calc(100% - var(--padding) * 2)',
      },
      spacing: {
        padding: 'var(--padding)',
        '100vh': '100vh',
        '200vh': '200vh',
        '300vh': '300vh',
      },
      transitionTimingFunction: {
        'custom-ease-in': 'cubic-bezier(.12,0,.66,.04)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
};
