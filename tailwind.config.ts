import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
      },
      spacing: {
        '30': '7.5rem', // 120px for section padding
      },
    },
  },
  plugins: [],
};

export default config;

