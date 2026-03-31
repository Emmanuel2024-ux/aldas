// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // ✅ Base URL pour le déploiement
  base: '/',
  
  // ✅ Plugins
  plugins: [
    react(), // ✅ Configuration simplifiée (babel retiré)
  ],
  
  // ✅ Résolution des imports (Aliases)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
      '@data': resolve(__dirname, './src/data'),
    },
  },
  
  // ✅ Optimisations de Build
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    
    // ✅ Minification avec Terser
    minify: 'terser',
    
    // ✅ Options Terser (structure correcte pour Vite 8)
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    
    // ✅ Limite de taille des chunks
    chunkSizeWarningLimit: 1000,
    
    // ✅ Rollup Options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
         manualChunks: (moduleId, { }) => {
          // ✅ Vérifier si c'est un module node_modules
          if (moduleId.includes('node_modules')) {
            // ✅ React + ReactDOM + React Router → vendor
            if (
              moduleId.includes('react') ||
              moduleId.includes('react-dom') ||
              moduleId.includes('react-router-dom')
            ) {
              return 'vendor';
            }
            
            // ✅ Swiper → swiper
            if (
              moduleId.includes('swiper')
            ) {
              return 'swiper';
            }
            
            // ✅ Lucide Icons → icons
            if (
              moduleId.includes('lucide-react')
            ) {
              return 'icons';
            }
            
            // ✅ Framer Motion → motion
            if (
              moduleId.includes('framer-motion')
            ) {
              return 'motion';
            }
          }
          
          // ✅ Retourner undefined pour laisser Rollup décider
          return undefined;
        },
        
        // ✅ Nommage des fichiers avec hash
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  
  // ✅ Optimisations CSS
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  
  // ✅ Serveur de Développement
  server: {
    port: 5173,
    open: true,
    host: true,
    
    // ✅ Warm-up pour HMR rapide
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/hooks/*.ts',
        './src/components/UI/*.tsx',
      ],
    },
  },
  
  // ✅ Prévisualisation
  preview: {
    port: 4173,
    host: true,
  },
  
  // ✅ Optimisations des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'swiper'],
  },
  
  // ✅ Logs
  logLevel: 'info',
  clearScreen: true,
});