// src/components/UI/SectionHeader.tsx
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gridRows?: number;
  gridCols?: number;
  color?: string;
  navButtons?: React.ReactNode; // Tes boutons de navigation
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  gridRows = 2, 
  gridCols = 5,
  color = '#00b894',
  navButtons
}: SectionHeaderProps) => {
  
  const totalDots = gridRows * gridCols;
  const dots = Array.from({ length: totalDots });

  return (
    // 1. Le Header Principal prend TOUTE la largeur (pas de mx ici)
    <header className="w-full py-6 mb-8 group" aria-labelledby="section-title">
      
      {/* 2. Le Conteneur Interne gère les marges et l'alignement de TOUT le contenu */}
      <div className="mx-[16px] md:mx-[40px] lg:mx-[130px] relative">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 relative w-full max-w-full overflow-hidden">
          
          {/* GROUPE GAUCHE : Trait + Titre + Sous-titre */}
          <div className="flex-grow z-10 min-w-0"> {/* min-w-0 empêche le débordement du texte */}
            <h2 
              id="section-title"
              className="flex items-center gap-[clamp(10px,2.5vw,16px)] text-[clamp(1.3rem,4.5vw,2rem)] font-bold text-slate-800 leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-slate-900 flex-wrap"
            >
              {/* Trait Décoratif */}
              <span 
                className="relative block w-[clamp(40px,8vw,80px)] h-[clamp(4px,0.8vw,5px)] rounded-full overflow-hidden flex-shrink-0 shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${color} 0%, ${color} 40%, rgba(0,184,148,0.3) 70%, transparent 100%)`
                }}
                aria-hidden="true"
              >
                <span className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
              </span>
              
              {/* Texte du Titre */}
              <span className="capitalize whitespace-nowrap lg:whitespace-normal">{title}</span>
            </h2>

            {/* Sous-titre */}
            {subtitle && (
              <p className="mt-3 text-[clamp(0.95rem,3vw,1.1rem)] text-slate-500 font-normal leading-relaxed max-w-2xl break-words">
                {subtitle}
              </p>
            )}
          </div>

          {/* GROUPE DROITE : Grille de Points + BOUTONS DE NAVIGATION */}
          {/* On regroupe points et boutons dans un même bloc pour qu'ils restent alignés */}
          <div className="flex items-center gap-6 shrink-0 lg:ml-auto z-20">
            
            {/* Grille de Points */}
            <div 
              className="grid gap-[clamp(6px,1.5vw,10px)] opacity-90 transition-all duration-500 ease-out group-hover:opacity-100 hidden sm:grid"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, clamp(6px,1.5vw,9px))`,
                gridTemplateRows: `repeat(${gridRows}, clamp(6px,1.5vw,9px))`
              }}
              aria-hidden="true"
            >
              {dots.map((_, i) => {
                const isOdd = (i + 1) % 2 !== 0;
                const baseOpacity = isOdd ? 0.3 : 0.6;
                const delay = i * 50;
                
                return (
                  <span
                    key={i}
                    className="aspect-square w-full rounded-full transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-default transform scale-100"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), ${color} 60%)`,
                      opacity: baseOpacity,
                      boxShadow: `0 0 8px ${color}40`,
                      animation: `fadeInDot 0.6s ease-out ${delay}ms backwards`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'scale(1.4)';
                      e.currentTarget.style.boxShadow = `0 0 12px ${color}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = String(baseOpacity);
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 0 8px ${color}40`;
                    }}
                  ></span>
                );
              })}
            </div>

            {/* Boutons de Navigation (Si fournis) */}
            {navButtons && (
              <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200/50 lg:border-l lg:border-slate-200/50">
                {navButtons}
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInDot {
          from { opacity: 0; transform: scale(0.5) translateY(10px); }
          to { opacity: ${0.3}; transform: scale(1) translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default SectionHeader;