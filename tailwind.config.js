/** @type {import('tailwindcss').Config} */

/**
 * Leibinn Consulting design system (v4 redesign).
 *
 * Every value comes from design_handoff README: quiet private-bank luxury,
 * navy and ivory surfaces that alternate down the page, one copper accent,
 * Host Grotesk for everything readable and Geist Mono for labels and figures.
 *
 * Write against these tokens rather than hex values. The type styles that
 * combine several properties (headlines, eyebrows, labels) live as component
 * classes in src/index.css.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    /*
     * The handoff's breakpoints. `lg` (1000px) is the one that matters most:
     * below it the nav collapses to "Menü" and every two-column split stacks.
     */
    screens: {
      xs: '600px',
      sm: '640px',
      md: '768px',
      lg: '1000px',
      xl: '1100px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        navy: {
          850: '#14233A', // inner panels on dark cards, image fallback
          900: '#0E1A2C', // cards on dark, sticky nav
          950: '#08111F', // page background, text on copper
          975: '#060D18', // footer
        },
        ink: '#0D1A2D', // text on light, dark buttons and cards inside light sections
        ivory: '#F4F2ED', // light panels, inner panels on white
        copper: {
          DEFAULT: '#B8875A', // primary CTA, accent bars, active tabs
          light: '#D6AE84', // accent text on dark, CTA hover
          dark: '#8A5E36', // accent text on light
        },
        sky: {
          DEFAULT: '#8FB3D9', // data bars
          deep: '#24406A', // start of the tax-rate gradient
        },
        /** Text on navy. */
        mist: {
          DEFAULT: '#A7B2C1', // body
          subtle: '#7F8A99', // labels, captions
          strong: '#E2E7EE', // secondary strong text
        },
        /** Text on ivory and white. */
        stone: {
          DEFAULT: '#4A5261', // body
          subtle: '#6E7480', // captions
          faint: '#8C919A', // placeholder labels, calendar weekdays
          off: '#B9B3A8', // unavailable calendar days
        },
        line: {
          DEFAULT: '#DDD8CE', // dividers on light
          soft: '#E6E1D8', // inner borders, track backgrounds
          faint: '#ECE8E1', // booking card divider
          dash: '#C9C2B6', // placeholder logo slots
          ring: '#CFC8BC', // empty checklist circles
        },
        sand: {
          DEFAULT: '#D9D3C8', // image fallback on light
          bar: '#D9CFC2', // calculator bars after year 1
        },
      },

      opacity: {
        6: '0.06',
        7: '0.07',
        8: '0.08',
        12: '0.12',
        16: '0.16',
        18: '0.18',
        72: '0.72',
        88: '0.88',
      },

      fontFamily: {
        sans: [
          '"Host Grotesk Variable"', '"Host Grotesk"', 'system-ui', '-apple-system',
          '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif',
        ],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      maxWidth: {
        shell: '1320px',
        nav: '1400px',
      },

      borderRadius: {
        panel: 'clamp(20px, 2.4vw, 32px)',
      },

      boxShadow: {
        // Floating cards on photos
        float: '0 30px 60px -24px rgba(0,0,0,.7)',
        // Light floating card
        'float-light': '0 24px 48px -24px rgba(13,26,45,.45)',
        // Booking card
        booking: '0 40px 80px -40px rgba(0,0,0,.7)',
        // Play button ring
        play: '0 0 0 10px rgba(184,135,90,.18)',
      },

      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
