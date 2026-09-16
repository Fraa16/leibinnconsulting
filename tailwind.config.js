/** @type {import('tailwindcss').Config} */

/*
 * Leibinn Consulting — design tokens.
 *
 * Every value the UI is allowed to use lives here. Components reference tokens
 * (`bg-paper-200`, `shadow-card`, `text-ink-600`) and never raw hex values, so
 * the whole site can be re-skinned from this one file.
 *
 * Contrast notes (WCAG 2.2 AA):
 *   primary-600 #016FB9 on white .......... 5.23:1  ✓ passes for all text
 *   accent-400  #75AED4 on white .......... 2.42:1  ✗ surfaces/borders ONLY —
 *     never place white or light text on accent-400. Use accent-700+ when the
 *     surface has to carry text, or put ink on a light accent tint.
 */

const ease = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Single ink. Replaces the old #0A0A0A / #1F2841 split. */
        ink: {
          50: '#F5F7FA',
          100: '#E9EDF3',
          200: '#CFD8E5',
          300: '#AAB8CD',
          400: '#7E8FAC',
          500: '#5C6E8D',
          600: '#445674',
          700: '#33425C',
          800: '#283349',
          900: '#1F2841', // brand ink
          950: '#131A2B',
        },
        /* Single CTA colour. AA-safe with white text from 600 up. */
        primary: {
          50: '#EFF8FF',
          100: '#DBEEFE',
          200: '#BFE2FE',
          300: '#93D0FD',
          400: '#60B5FA',
          500: '#3B98F1',
          600: '#016FB9', // brand primary
          700: '#014F87', // brand primary, hover
          800: '#063F6B',
          900: '#0A3559',
          950: '#07223B',
        },
        /* Accent: surfaces, rules, icon tints. See contrast note above. */
        accent: {
          50: '#F2F8FC',
          100: '#E3EFF8',
          200: '#C7DFF0',
          300: '#A2C9E4',
          400: '#75AED4', // brand accent
          500: '#5C9DC4',
          600: '#4382AB',
          700: '#386A8B', // 4.6:1 on white — safe for text
          800: '#325974',
          900: '#2D4B61',
          950: '#1E3140',
        },
        /* Neutral canvas ramp, light → dark. */
        paper: {
          50: '#FDFDFD',
          100: '#FAFAFA',
          200: '#F7F7F7', // main canvas
          300: '#F4F6F9', // cool tint
          400: '#F2F2F2', // alternate canvas
          500: '#E9EDEF',
          600: '#E2E7E8', // raised panel
          700: '#DFE7F0', // hairline / border tint
        },
      },

      fontFamily: {
        display: ['"Playfair Display Variable"', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          '"Inter Variable"',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },

      /* 1.250 major third, 16px base. Tracking tightens as size grows. */
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.1rem', letterSpacing: '0.01em' }],
        xs: ['0.8125rem', { lineHeight: '1.2rem', letterSpacing: '0.005em' }],
        sm: ['0.875rem', { lineHeight: '1.375rem' }],
        base: ['1rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.8rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.005em' }],
        '2xl': ['1.5625rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.9531rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.4414rem', { lineHeight: '2.875rem', letterSpacing: '-0.02em' }],
        '5xl': ['3.0518rem', { lineHeight: '3.4rem', letterSpacing: '-0.022em' }],
        '6xl': ['3.8147rem', { lineHeight: '4.1rem', letterSpacing: '-0.025em' }],
        '7xl': ['4.7684rem', { lineHeight: '5rem', letterSpacing: '-0.028em' }],
        /*
         * Fluid display sizes for hero + section openers.
         *
         * The clamp minimums are set for German compounds at 390px: words like
         * "Immobilienvermögen." are ~19 characters and overflowed the viewport
         * when the floor was higher.
         */
        'display-sm': [
          'clamp(1.625rem, 1.1rem + 2.2vw, 2.4414rem)',
          { lineHeight: '1.18', letterSpacing: '-0.02em' },
        ],
        'display-md': [
          'clamp(1.75rem, 1.05rem + 3.2vw, 3.0518rem)',
          { lineHeight: '1.14', letterSpacing: '-0.022em' },
        ],
        'display-lg': [
          'clamp(1.9rem, 0.95rem + 4.6vw, 3.8147rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em' },
        ],
      },

      letterSpacing: {
        eyebrow: '0.18em',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },

      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },

      /* Elevation scale. Replaces the five ad-hoc shadow strings. */
      boxShadow: {
        hairline: 'inset 0 0 0 1px rgb(31 40 65 / 0.06)',
        card: '0 1px 2px rgb(31 40 65 / 0.04), 0 8px 24px -8px rgb(31 40 65 / 0.10)',
        'card-hover': '0 2px 4px rgb(31 40 65 / 0.05), 0 20px 40px -12px rgb(31 40 65 / 0.16)',
        panel: '0 1px 3px rgb(31 40 65 / 0.05), 0 24px 64px -16px rgb(31 40 65 / 0.18)',
        float: '0 32px 80px -24px rgb(31 40 65 / 0.28)',
        header: '0 1px 2px rgb(31 40 65 / 0.04), 0 8px 32px -12px rgb(31 40 65 / 0.14)',
      },

      maxWidth: {
        content: '1400px',
        wide: '1600px',
        measure: '68ch',
      },

      transitionTimingFunction: ease,

      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'reveal-clip': {
          from: { opacity: '0', clipPath: 'inset(0 0 100% 0)' },
          to: { opacity: '1', clipPath: 'inset(0 0 -10% 0)' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },

      animation: {
        'reveal-up': `reveal-up 0.7s ${ease.entrance} both`,
        'reveal-clip': `reveal-clip 0.9s ${ease.entrance} both`,
        'line-grow': `line-grow 0.8s ${ease.entrance} both`,
        'fade-in': `fade-in 0.5s ${ease.standard} both`,
        'scale-in': `scale-in 0.5s ${ease.entrance} both`,
      },
    },
  },
  plugins: [],
};
