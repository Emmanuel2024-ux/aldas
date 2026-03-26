// src/components/UI/SectionHeaderCentered.tsx
import React, { type JSX } from 'react';

export interface SectionHeaderCenteredProps {
  /** Petit texte au-dessus du titre (ex: "NOTRE EXPERTISE") */
  badge?: string;
  
  /** Titre principal de la section (obligatoire) */
  title: string;
  
  /** Description / sous-titre optionnel */
  description?: string;
  
  /** Largeur max du bloc texte (défaut: "max-w-4xl") */
  width?: string;
  
  /** Couleur d'accentuation pour les éléments décoratifs (défaut: "#00b894") */
  color?: string;
  
  /** 
   * ID unique pour l'ancrage, l'accessibilité et le SEO 
   * Si non fourni, sera généré automatiquement depuis le titre 
   */
  id?: string;
  
  /** Niveau de titre HTML (h2 par défaut, ajustable pour hiérarchie SEO) */
  headingLevel?: 2 | 3 | 4;
  
  /** Classe CSS supplémentaire pour personnalisation */
  className?: string;
}

const SectionHeaderCentered = ({ 
  badge, 
  title, 
  description, 
  width = "max-w-4xl",
  color = "#00b894",
  id,
  headingLevel = 2,
  className = ""
}: SectionHeaderCenteredProps) => {
  
  // ✅ Génération d'un ID unique si non fourni (slugify du titre)
  const sectionId = id || title.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')      // Supprime les caractères spéciaux
    .replace(/[\s_-]+/g, '-')      // Remplace espaces/underscores par tirets
    .replace(/^-+|-+$/g, '')       // Supprime tirets début/fin
    .replace(/-+/g, '-');          // Collapse tirets multiples
  
  // ✅ Composant Titre dynamique (h2, h3, ou h4)
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <div 
      className={`w-full mx-auto text-center pt-10 ${width} ${className}`}
      // ✅ Data attribute pour ciblage JS/CSS
      data-section={sectionId}
    >
      
      {/* Badge Optionnel (Style "Pillule") */}
      {badge && (
        <div className="mb-6 inline-block" data-aos="fade-down">
          <span 
            className="relative px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500 bg-slate-100 rounded-full border border-slate-200 overflow-hidden group-hover:border-slate-300 transition-colors"
            aria-label={badge}
          >
            <span className="relative z-10">{badge}</span>
            {/* Petit point coloré décoratif */}
            <span 
              className="absolute -right-1 -top-1 w-2 h-2 rounded-full" 
              style={{ backgroundColor: color }}
              aria-hidden="true"
            ></span>
          </span>
        </div>
      )}

      {/* ✅ Titre Principal Centré avec ID unique */}
      <HeadingTag 
        id={sectionId}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight capitalize"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {title}
      </HeadingTag>

      {/* Ligne Décorative Centrée (Fine et Élégante) */}
      <div 
        className="relative h-px w-24 mx-auto my-2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" 
        data-aos="fade-in" 
        data-aos-delay="200"
        aria-hidden="true"
      >
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" 
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}
          aria-hidden="true"
        ></div>
      </div>

      {/* Description / Sous-titre */}
      {description && (
        <p 
          className="text-lg md:text-xl text-slate-600 font-light leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default React.memo(SectionHeaderCentered);