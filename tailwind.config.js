/** @type {import('tailwindcss').Config} */
module.exports = {
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'group-disabled', // Custom variant
    'disabled',
  ],
  content: [
    "./src/**/*.{html,ts}",
      './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {  
    extend: {  
      animation: {
      spin: 'spin 1s linear infinite',
     },
     colors: {
      transparent: 'transparent',
      current: 'currentColor', 
      'white': '#ffffff',
      'dark': '#000000',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'dtback': '#11963A',
      'dt': '#3dcd58',
      'dthover': '#20d046',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff', 
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'softblack':'rgb(16 33 62 / 95%);'
    },
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
       }
    },
  },
 
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
