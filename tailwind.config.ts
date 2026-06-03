import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── Exact brand palette (user-spec) ─────────────────────────────
        'jungle-teal':  '#007f5f',
        'sea-green':    '#2b9348',
        'bright-fern':  '#55a630',
        'lime-moss':    '#80b918',
        'yellow-green': '#aacc00',
        'lemon-lime':   '#bfd200',
        'lemon-lime-2': '#d4d700',
        'lemon-lime-3': '#dddf00',
        'brand-yellow': '#eeef20',
        'brand-yellow-2': '#ffff3f',

        // ── Emerald overridden to brand palette ──────────────────────────
        // Rule: emerald-600 = sea-green (primary CTA), 700 = jungle-teal,
        //       500 = bright-fern (hover), 400 = lime-moss (on-dark accent),
        //       300 = yellow-green (micro-highlight only).
        // Light shades stay as very-muted green tints — never saturated.
        emerald: {
          50:  '#F2F9EE',   // near-white green  — card bg tints
          100: '#E0F2D5',   // light mint        — borders on white
          200: '#C1E5AB',   // soft green        — connecting lines
          300: '#aacc00',   // yellow-green       — micro-highlights ONLY
          400: '#80b918',   // lime-moss          — on-dark accents
          500: '#55a630',   // bright-fern        — hover states
          600: '#2b9348',   // sea-green ◀ PRIMARY CTA
          700: '#007f5f',   // jungle-teal        — dark primary / labels
          800: '#005f47',   // deep teal          — aurora, deep shadows
          900: '#003d2e',   // near-black teal
          950: '#00261c',   // darkest
        },

        // ── Dark section backgrounds (teal-derived) ──────────────────────
        void:    '#0C1C17',   // hero / CTA / portal bg
        'void-2': '#122218',  // footer / dark card bg
        surface:  '#1A3428',  // elevated surface on dark

        // ── Legacy aliases (used in layout.tsx) ──────────────────────────
        light: '#F3F9F5',    // page background — barely-perceptible mint
        dark:  '#0E1A14',    // body text

        // ── Accent / badge token ─────────────────────────────────────────
        gold:  '#bfd200',    // lemon-lime — badges & star ratings ONLY
      },

      fontFamily: {
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },

      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
      },

      boxShadow: {
        // Sea-green–tinted shadows give cards a cohesive brand feel
        glow:         '0 0 40px rgba(43,147,72,0.38)',
        'glow-sm':    '0 0 20px rgba(43,147,72,0.24)',
        card:         '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,127,95,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 24px 56px rgba(0,127,95,0.12)',
        'elevation-1':'0 2px 8px rgba(0,127,95,0.07)',
        'elevation-2':'0 8px 32px rgba(0,127,95,0.10)',
        'elevation-3':'0 24px 80px rgba(0,0,0,0.20)',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      animation: {
        float:          'float 6s ease-in-out infinite',
        'float-slow':   'floatSlow 8s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
        'aurora-move':  'auroraMove 14s ease-in-out infinite alternate',
        'aurora-move-2':'auroraMove2 18s ease-in-out infinite alternate',
        shimmer:        'shimmer 2.2s linear infinite',
        'slide-up':     'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-up':     'countUp 0.6s ease-out forwards',
      },

      keyframes: {
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        floatSlow: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseGlow: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.9' } },
        auroraMove: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(5%, -7%) scale(1.07)' },
          '66%':  { transform: 'translate(-4%, 4%) scale(0.96)' },
          '100%': { transform: 'translate(3%, -3%) scale(1.04)' },
        },
        auroraMove2: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(-6%, 4%) scale(1.05)' },
          '66%':  { transform: 'translate(3%, -5%) scale(0.98)' },
          '100%': { transform: 'translate(-2%, 2%) scale(1.02)' },
        },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        countUp:  { from: { opacity: '0', transform: 'translateY(8px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

export default config;
