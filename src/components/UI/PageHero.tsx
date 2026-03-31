// src/components/UI/PageHero.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';

export interface PageHeroProps {
  /** Image de fond du hero (chemin relatif ou URL absolue) */
  image: string;
  
  /** Titre principal de la page (sera le H1) */
  title: string;
  
  /** Sous-titre avec support HTML limité (ex: "<span class='highlight'>texte</span>") */
  subtitle?: string;
  
  /** Texte du bouton CTA */
  btnText?: string;
  
  /** 
   * Lien de destination du bouton CTA :
   * - Ancre interne : "#services-about" → scroll smooth sur la page
   * - Route React : "/contact" → navigation React Router
   * - URL externe : "https://..." → nouvel onglet
   */
  btnLink?: string;
  
  /** Label ARIA personnalisé pour la section hero */
  ariaLabel?: string;
  
  /** ID unique pour l'ancrage et l'accessibilité */
  id?: string;
  
  /** Texte alternatif pour l'image de fond */
  imageAlt?: string;
  
  /** 
   * Comportement du scroll pour les ancres internes 
   * @default 'smooth'
   */
  scrollBehavior?: 'smooth' | 'auto';
}

const PageHero = ({ 
  image, 
  title, 
  subtitle, 
  btnText, 
  btnLink,
  ariaLabel,
  id,
  imageAlt,
  scrollBehavior = 'smooth'
}: PageHeroProps) => {

  // ✅ Génération d'un ID unique si non fourni
  const heroId = useMemo(() => 
    id || `hero-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`, 
    [id, title]
  );
  
  const titleId = `${heroId}-title`;
  const descId = `${heroId}-desc`;
  
  // ✅ Label ARIA par défaut
  const defaultAriaLabel = useMemo(() => 
    `Section d'introduction : ${title}`, 
    [title]
  );

  // ✅ Détection du type de lien
  const getLinkType = useCallback((link?: string): 'anchor' | 'route' | 'external' | null => {
    if (!link) return null;
    if (link.startsWith('#')) return 'anchor';
    if (link.startsWith('http://') || link.startsWith('https://')) return 'external';
    return 'route';
  }, []);

  // ✅ Gestionnaire de clic intelligent
  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnLink) return;
    
    const linkType = getLinkType(btnLink);
    
    // 🎯 Cas 1 : Ancre interne → scroll smooth
    if (linkType === 'anchor') {
      e.preventDefault();
      
      // Extraire l'ID cible (sans le #)
      const targetId = btnLink.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Scroll smooth vers l'élément
        targetElement.scrollIntoView({
          behavior: scrollBehavior,
          block: 'start',
          inline: 'nearest'
        });
        
        // ✅ Mise à jour de l'URL pour le partage et l'historique
        history.replaceState(null, '', btnLink);
        
        // ✅ Focus sur l'élément cible pour accessibilité clavier
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      } else {
        console.warn(`⚠️ Élément avec id="${targetId}" non trouvé pour le scroll`);
      }
      return;
    }
    
    // 🌐 Cas 2 : Lien externe → ouvrir dans nouvel onglet
    if (linkType === 'external') {
      e.preventDefault();
      window.open(btnLink, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // 🔄 Cas 3 : Route React → laisser React Router gérer
    // (ne pas appeler e.preventDefault() pour permettre la navigation)
  }, [btnLink, getLinkType, scrollBehavior]);

  // ✅ Gestionnaire clavier pour accessibilité
  const handleCtaKeyDown = useCallback((e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Simuler un clic pour réutiliser la logique de handleCtaClick
      handleCtaClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
    }
  }, [handleCtaClick]);

  // ✅ Préparation des props du bouton selon le type de lien
  const linkType = getLinkType(btnLink);
  const isExternal = linkType === 'external';

  return (
    // ✅ Header sémantique avec ARIA complet
    <header 
      id={heroId}
      className="relative w-full h-[96vh] min-h-[400px] flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label={ariaLabel || defaultAriaLabel}
      aria-labelledby={titleId}
    >
      
      {/* 🖼️ Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-hidden={imageAlt ? "false" : "true"}
        {...(imageAlt && { 'aria-label': imageAlt })}
      >
        {/* Overlay pour lisibilité */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-aldas-dark/80 to-aldas-dark/40"
          aria-hidden="true"
        />
      </div>

      {/* ✅ Contenu Centré */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* 🎯 Titre H1 */}
        <h1 
          id={titleId}
          className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up drop-shadow-lg leading-tight"
          itemProp="name"
        >
          {title}
        </h1>

        {/* 📝 Sous-titre */}
        {subtitle && (
          <p 
            id={descId}
            className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            itemProp="description"
          />
        )}
        
        {/* 🔗 Bouton CTA intelligent */}
        {btnText && btnLink && (
          <Link
            to={isExternal ? '#' : btnLink}
            onClick={handleCtaClick}
            onKeyDown={handleCtaKeyDown}
            className="inline-flex items-center gap-2 px-8 py-3 bg-aldas hover:bg-aldas-light text-white font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-aldas-glow focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 focus:ring-offset-aldas-dark"
            aria-label={`${btnText} - ${title}`}
            itemProp="url"
            // Pour les liens externes, on utilise les attributs HTML standards
            {...(isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                window.open(btnLink, '_blank', 'noopener,noreferrer');
              }
            })}
          >
            <span>{btnText}</span>
            <ArrowRight 
              size={20} 
              aria-hidden="true" 
              className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
      
      {/* ✅ Indicateur sr-only pour lecteurs d'écran */}
      <span className="sr-only" aria-live="polite">
        Section hero de la page : {title}
      </span>
    </header>
  );
};

export default PageHero;