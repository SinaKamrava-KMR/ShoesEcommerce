/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/**/*.{html,js}'],
  purge: ['./dist/**/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'Lilita': ['Lilita One', 'cursive']
      },
      colors: {
        'dark-txt':'#152536'
      },
      keyframes: {
        wide: {
          '0%': { width: '0' ,borderRight:"5px solid #152536"},
          '100%': { width: '67%',borderRight:"5px solid #152536" },
        },

        fadeOut: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1' },
          
        },
        fadeIn: {
          '0%': { opacity: '1'},
          '100%': { opacity: '0' },
          
        },
        comeLeft: {
          '0%': { transform: 'translateX(-300px)',  opacity:'0'},
          '100%': { transform: 'translateX(0)' ,opacity:'1'},
          
        },
        
      },
      animation: {
        'wide': 'wide 1s linear',
        'fadeOut': 'fadeOut .8s ease-in forwards',
        'fadeIn': 'fadeIn .8s ease-in forwards',
        'comeLeft': 'comeLeft .8s ease-in forwards',
      }
    },

  },
  plugins: [],
}

