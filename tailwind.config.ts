import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Confident Blue" — Ankerfarben aus der Design-Spec:
        // navy #0d3d6e (900) → mid #1a65b0 (600) → sky #2f8fe0 (400)
        brand: {
          50: '#f0f7fe',
          100: '#dcecfc',
          200: '#c2ddf8',
          300: '#8fc0ef',
          400: '#2f8fe0',
          500: '#2278cc',
          600: '#1a65b0',
          700: '#134f8a',
          800: '#0f4679',
          900: '#0d3d6e',
          950: '#08243f',
        },
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(13 61 110 / 0.06), 0 8px 24px rgb(13 61 110 / 0.08)',
        'card-hover': '0 2px 4px rgb(13 61 110 / 0.08), 0 16px 40px rgb(13 61 110 / 0.14)',
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
