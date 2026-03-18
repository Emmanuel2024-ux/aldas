// postcss.config.js
export default {
  plugins: {
    // 1. Le plugin de nesting DOIT être en premier
    'postcss-nesting': {},
    
    // 2. Tailwind vient ensuite
    tailwindcss: {},
    
    // 3. Autoprefixer à la fin
    autoprefixer: {},
  },
}