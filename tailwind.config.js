/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aldas: {
          // 1. LA COULEUR PRINCIPALE (Action, Boutons, Icônes actives)
          // Un Cyan/Turquoise vibrant et moderne, très lisible sur fond sombre
          DEFAULT: '#06b6d4', // Cyan-500 equivalent but custom tuned
          
          // 2. LES VARIATIONS POUR LE HOVER ET L'ÉTAT ACTIF
          light: '#22d3ee',   // Plus clair, pour le survol (Cyan-400)
          bright: '#67e8f9',  // Très clair, pour les accents subtils ou lueurs
          
          // 3. LA COULEUR "DARK" (Remplacement de ton ancien vert sombre)
          // Un Bleu Nuit très profond, presque noir, pour le pied de page et les textes forts
          dark: '#0f172a',    // Slate-900 (Bleu nuit très élégant)
          navy: '#1e293b',    // Slate-800 (Pour les cartes ou secondes zones sombres)
          
          // 4. LE FOND SUBTIL
          // Un blanc très légèrement teinté de cyan pour casser la blancheur pure
          bg: '#f0f9ff',      // Sky-50 very light
        },
        
        // On garde aussi du gris neutre pour les textes secondaires
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          400: '#9ca3af',
          600: '#4b5563',
          900: '#111827',
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      boxShadow: {
        // Ombre douce et moderne avec une légère teinte bleutée
        'aldas': '0 10px 15px -3px rgba(6, 182, 212, 0.15), 0 4px 6px -2px rgba(6, 182, 212, 0.05)',
        'aldas-glow': '0 0 20px rgba(6, 182, 212, 0.4)', // Effet de lueur pour les boutons importants
      },
      
      // Ajout d'un dégradé personnalisé pour les backgrounds modernes
      backgroundImage: {
        'aldas-gradient': 'linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)',
        'aldas-gradient-reverse': 'linear-gradient(135deg, #06b6d4 0%, #0f172a 100%)',
      }
    },
  },
  plugins: [],
}