/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./dist/**/**/*.{html,js}'],
  purge: ['./dist/**/**/*.{html,js}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // added new 4 column grid as new4
        'mobile-responsive': 'repeat(auto-fit, minmax(300px, 1fr))',
        'main-mobile-responsive': 'repeat(auto-fit, minmax(150px, 1fr))',
        'responsive': 'repeat(auto-fit, minmax(400px, 1fr))',
        
        },
      gridTemplateRows: {
        // added new 4 column grid as new4
        'mobile-responsive': 'repeat(auto-fit, minmax(150px, 150px))',
        'responsive': 'repeat(auto-fit, minmax(150px, 200px))',
        },
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
        comeUp: {
          '0%': { transform: 'translateY(-300px) translateX(-50%)'},
          '100%': { transform: 'translateY(0) translateX(-50%)' },
          
        },
        backUp: {
          '0%': { transform: 'translateY(0) translateX(-50%)'},
          '100%': { transform: 'translateY(-300px) translateX(-50%)' },
          
        },
        
      },
      animation: {
        'wide': 'wide 1s linear',
        'fadeOut': 'fadeOut .8s ease-in forwards',
        'fadeIn': 'fadeIn .8s ease-in forwards',
        'comeLeft': 'comeLeft 1s ease-in forwards',
        'comeUp': 'comeUp .6s ease-in forwards',
        'backUp': 'backUp 1s ease-in forwards',
      }
    },

  },
  plugins: [],
}

