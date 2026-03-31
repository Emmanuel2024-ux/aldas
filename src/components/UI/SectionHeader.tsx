import React, { type JSX } from 'react';
import './SectionHeader.css'; // ← Styles extraits pour performance

export interface SectionHeaderProps {
  /** Titre principal de la section (obligatoire) */
  title: string;
  
  /** Sous-titre optionnel */
  subtitle?: string;
  
  /** ID unique pour l'accessibilité et l'ancrage (recommandé) */
  id?: string;
  
  /** Configuration de la grille de points décoratifs */
  gridConfig?: {
    rows?: number;  // Default: 2
    cols?: number;  // Default: 5
  };
  
  /** Couleur principale du thème (format hex, rgb, ou CSS variable) */
  color?: string;
  
  /** Boutons de navigation optionnels (ex: flèches slider) */
  navButtons?: React.ReactNode;
  
  /** Niveau de titre HTML (h2 par défaut, ajustable pour hiérarchie SEO) */
  headingLevel?: 2 | 3 | 4;
  
  /** Classe CSS supplémentaire pour personnalisation */
  className?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  id,
  gridConfig = { rows: 2, cols: 5 },
  color = '#00b894',
  navButtons,
  headingLevel = 2,
  className = ''
}: SectionHeaderProps) => {
  
  // Génération d'un ID unique si non fourni (pour accessibilité)
  const sectionId = id || `section-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const titleId = `${sectionId}-title`;
  
  // Configuration de la grille
  const { rows = 2, cols = 5 } = gridConfig;
  
  // Composant Titre dynamique (h2, h3, ou h4)
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    // Header sémantique avec ARIA
    <header 
      className={`section-header w-full py-6 mb-8 group ${className}`}
      aria-labelledby={titleId}
      data-section={sectionId}
    >
      {/* Conteneur avec marges responsives */}
      <div className="section-header__container mx-[16px] md:mx-[40px] lg:mx-[130px] relative">
        
        <div className="section-header__content flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 relative w-full max-w-full overflow-hidden">
          
          {/* GROUPE GAUCHE : Trait + Titre + Sous-titre */}
          <div className="section-header__left flex-grow z-10 min-w-0">
            
            {/* Titre principal avec ID unique pour ancrage et accessibilité */}
            <HeadingTag 
              id={titleId}
              className="section-header__title flex items-center gap-[clamp(10px,2.5vw,16px)] text-[clamp(1.3rem,4.5vw,2rem)] font-bold text-slate-800 leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-slate-900 flex-wrap capitalize"
            >
              {/* Trait décoratif animé */}
              <span 
                className="section-header__accent relative block w-[clamp(40px,8vw,80px)] h-[clamp(4px,0.8vw,5px)] rounded-full overflow-hidden flex-shrink-0 shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${color} 0%, ${color} 40%, ${color}33 70%, transparent 100%)`
                }}
                aria-hidden="true"
              >
                <span className="section-header__accent-shine absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
              </span>
              
              {/* Texte du titre */}
              <span className="section-header__title-text whitespace-nowrap lg:whitespace-normal">
                {title}
              </span>
            </HeadingTag>

            {/* Sous-titre optionnel */}
            {subtitle && (
              <p className="section-header__subtitle mt-3 text-[clamp(0.95rem,3vw,1.1rem)] text-slate-500 font-normal leading-relaxed max-w-2xl break-words">
                {subtitle}
              </p>
            )}
          </div>

          {/* GROUPE DROITE : Grille décorative + Navigation */}
          <div className="section-header__right flex items-center gap-6 shrink-0 lg:ml-auto z-20">
            
            {/* Grille de points décoratifs (cachée sur mobile) */}
            <DecorativeDotsGrid 
              rows={rows} 
              cols={cols} 
              color={color} 
              aria-hidden="true"
            />

            {/* Boutons de navigation (optionnels) */}
            {navButtons && (
              <div className="section-header__nav flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200/50">
                {navButtons}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

// Sous-composant : Grille de points décoratifs (extrait pour lisibilité)
interface DotsGridProps {
  rows: number;
  cols: number;
  color: string;
  'aria-hidden'?: 'true' | 'false';
}

const DecorativeDotsGrid = React.memo(({ rows, cols, color, 'aria-hidden': ariaHidden }: DotsGridProps) => {
  const totalDots = rows * cols;
  const dots = Array.from({ length: totalDots });

  return (
    <div 
      className="dots-grid grid gap-[clamp(6px,1.5vw,10px)] opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100 hidden sm:grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, clamp(6px,1.5vw,9px))`,
        gridTemplateRows: `repeat(${rows}, clamp(6px,1.5vw,9px))`
      }}
      aria-hidden={ariaHidden}
    >
      {dots.map((_, i) => {
        const isOdd = (i + 1) % 2 !== 0;
        const baseOpacity = isOdd ? 0.3 : 0.6;
        const delay = i * 30; // Réduit pour performance
        
        return (
          <span
            key={i}
            className="dot aspect-square w-full rounded-full transition-all duration-300 ease-out cursor-default transform scale-100"
            style={{
              '--dot-color': color,
              '--dot-opacity': baseOpacity,
              '--dot-delay': `${delay}ms`,
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), var(--dot-color) 60%)`,
              opacity: `var(--dot-opacity)`,
              boxShadow: `0 0 8px ${color}40`,
              animationDelay: `var(--dot-delay)`
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.opacity = '1';
              target.style.transform = 'scale(1.3)';
              target.style.boxShadow = `0 0 12px ${color}`;
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.opacity = `var(--dot-opacity)`;
              target.style.transform = 'scale(1)';
              target.style.boxShadow = `0 0 8px ${color}40`;
            }}
            // Accessibilité clavier
            tabIndex={-1} // Non focusable car décoratif
          />
        );
      })}
    </div>
  );
});

DecorativeDotsGrid.displayName = 'DecorativeDotsGrid';

export default React.memo(SectionHeader);