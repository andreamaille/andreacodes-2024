/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  theme: {
    colors: {
      pink: '#FFF6FB',
      orange: '#BB522F',
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
    },
    extend: {
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
