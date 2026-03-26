// src/components/UI/PageHero.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface PageHeroProps {
  /** Image de fond du hero (chemin relatif ou URL absolue) */
  image: string;
  
  /** Titre principal de la page (sera le H1) */
  title: string;
  
  /** Sous-titre avec support HTML limité (ex: "<span class='highlight'>texte</span>") */
  subtitle?: string;
  
  /** Texte du bouton CTA */
  btnText?: string;
  
  /** Lien de destination du bouton CTA */
  btnLink?: string;
  
  /** 
   * Label ARIA personnalisé pour la section hero 
   * Par défaut : "Section d'introduction : {title}" 
   */
  ariaLabel?: string;
  
  /** 
   * ID unique pour l'ancrage et l'accessibilité 
   * Par défaut : généré depuis le titre 
   */
  id?: string;
  
  /** Texte alternatif pour l'image de fond (si l'image a une valeur informative) */
  imageAlt?: string;
}

const PageHero = ({ 
  image, 
  title, 
  subtitle, 
  btnText, 
  btnLink,
  ariaLabel,
  id,
  imageAlt
}: PageHeroProps) => {
  
  // ✅ Génération d'un ID unique si non fourni
  const heroId = id || `hero-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
  const titleId = `${heroId}-title`;
  const descId = `${heroId}-desc`;
  
  // ✅ Label ARIA par défaut si non fourni
  const defaultAriaLabel = `Section d'introduction : ${title}`;

  return (
    // ✅ Header sémantique avec ARIA complet
    <header 
      id={heroId}
      className="relative w-full h-[96vh] min-h-[400px] flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label={ariaLabel || defaultAriaLabel}
      aria-labelledby={titleId}
    >
      
      {/* 🖼️ Image de fond - décorative par défaut */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-hidden={imageAlt ? "false" : "true"}
        // ✅ Si imageAlt est fourni, l'image est informative
        {...(imageAlt && { 'aria-label': imageAlt })}
      >
        {/* Overlay pour lisibilité du texte */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-aldas-dark/80 to-aldas-dark/40"
          aria-hidden="true"
        ></div>
      </div>

      {/* ✅ Contenu Centré avec structure accessible */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* 🎯 Titre H1 unique de la page */}
        <h1 
          id={titleId}
          className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up drop-shadow-lg leading-tight"
          itemProp="name"
        >
          {title}
        </h1>

        {/* 📝 Sous-titre avec HTML contrôlé */}
        {subtitle && (
          <p 
            id={descId}
            className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            itemProp="description"
            // ✅ Note de sécurité pour le contenu HTML
            // Assurez-vous que `subtitle` provient d'une source fiable ou est sanitizé
          />
        )}
        
        {/* 🔗 Bouton CTA avec aria-label descriptif */}
        {btnText && btnLink && (
          <Link 
            to={btnLink}
            className="inline-flex items-center gap-2 px-8 py-3 bg-aldas hover:bg-aldas-light text-white font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-aldas-glow focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 focus:ring-offset-aldas-dark"
            aria-label={`${btnText} - ${title}`}
            itemProp="url"
          >
            <span>{btnText}</span>
            <ArrowRight 
              size={20} 
              aria-hidden="true" 
              className="flex-shrink-0"
            />
          </Link>
        )}
      </div>
      
      {/* ✅ Indicateur sr-only pour les lecteurs d'écran */}
      <span className="sr-only" aria-live="polite">
        Section hero de la page : {title}
      </span>
    </header>
  );
};

export default PageHero;