const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
  ],

  plugins: [require('@tailwindcss/forms')],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Clash Grotesk', ...defaultTheme.fontFamily.sans],
        headline: ['General Sans', ...defaultTheme.fontFamily.sans],
      },

      backgroundImage: {
        'white-noise': "url('/img/white-noise.png')",
        'black-noise': "url('/img/black-noise.png')",
      },

      boxShadow: {
        solid: '#111827 2px 2px 0 0',
      },
    },
  },
}
