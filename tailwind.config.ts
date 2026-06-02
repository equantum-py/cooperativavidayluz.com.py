import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F8F4F',
        secondary: '#16A34A',
        accent: '#22C55E',
        dark: '#0B1A12',
        light: '#F8FAF8',
        gray: '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(34, 197, 94, 0.22)',
        soft: '0 24px 70px rgba(15, 143, 79, 0.12)',
      },
      backgroundImage: {
        aurora: 'radial-gradient(circle at 20% 15%, rgba(34,197,94,.35), transparent 28%), radial-gradient(circle at 80% 10%, rgba(15,143,79,.32), transparent 30%), linear-gradient(135deg, #F8FAF8 0%, #ECFDF5 45%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
