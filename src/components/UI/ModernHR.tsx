// src/components/UI/ModernHR.tsx
import { useEffect, useState } from 'react';

interface ModernHRProps {
  className?: string;
  colorFrom?: string; // Couleur de départ (défaut: transparent)
  colorVia?: string;  // Couleur centrale (défaut: ton thème principal)
  colorTo?: string;   // Couleur de fin (défaut: transparent)
  height?: string;    // Épaisseur (défaut: 1px)
  width?: string;     // Largeur (défaut: 100%)
  animated?: boolean; // Animation d'apparition
}

const ModernHR = ({
  className = "",
  colorFrom = "from-transparent",
  colorVia = "via-[#0f472e]", // Bleu nuit par défaut (à adapter selon ton thème)
  colorTo = "to-transparent",
  height = "h-[1.5px]",
  width = "w-full",
  animated = true
}: ModernHRProps) => {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      // Déclenche l'animation après le montage
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <div className={`relative flex items-center mx-12 justify-center py-4 ${className}`}>
      {/* Ligne Principale avec Dégradé */}
      <div 
        className={`relative w-full ${height} ${width} overflow-hidden rounded-full transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-95'}`}
      >
        {/* Fond subtil (optionnel, pour donner de la matière) */}
        <div className="absolute inset-0 bg-slate-100/50"></div>
        
        {/* Le Dégradé Coloré */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colorFrom} ${colorVia} ${colorTo} opacity-80`}></div>
        
        {/* Point de lumière central (Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[2px] bg-white blur-[1px] opacity-60"></div>
      </div>

      {/* Élément décoratif optionnel au centre (si tu veux un icône ou un texte) */}
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-white">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">***</span>
      </div> 
    
    </div>
  );
};

export default ModernHR;