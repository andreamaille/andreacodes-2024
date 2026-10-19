/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  theme: {
    colors: {
      pink: '#FFF6FB',
      orange: {
        DEFAULT: '#BB522F',
        dark: '#8F3A1F',
        light: '#DE9C84',
      },
      white: '#fff',
      black: '#333',
      transparent: 'transparent',
    },
    fontSize: {
      xxs: '0.625rem', // 10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      '2xl': '2rem', // 32px
      '3xl': '2.5rem', // 40px
      '4xl': '3rem', // 48px
      '5xl': '3.25rem', // 52px
      '6xl': '4rem', // 64px
      // Design tokens: fluid sizes defined in styles/tailwind.css
      display: ['var(--text-display)', { lineHeight: 'var(--leading-tight)' }],
      h2: ['var(--text-h2)', { lineHeight: 'var(--leading-tight)' }],
      h3: ['var(--text-h3)', { lineHeight: 'var(--leading-tight)' }],
      title: ['var(--text-title)', { lineHeight: 'var(--leading-snug)' }],
      'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body)' }],
      body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
      small: ['var(--text-small)', { lineHeight: 'var(--leading-snug)' }],
      eyebrow: [
        'var(--text-eyebrow)',
        { lineHeight: 'var(--leading-snug)', letterSpacing: '0.16em' },
      ],
    },
    extend: {
      spacing: {
        section: 'var(--space-section)',
        block: 'var(--space-block)',
        heading: 'var(--space-heading)',
        gutter: 'var(--gutter)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      fontFamily: {
        butlerSemibold: ['Butler SemiBold', 'serif'],
        workSans: ['Work Sans', 'sans-serif'],
        workSansMedium: ['Work Sans Medium', 'sans-serif'],
        workSansSemibold: ['Work Sans SemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
