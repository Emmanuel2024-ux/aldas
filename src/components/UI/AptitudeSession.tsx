// src/components/Conciergerie/AptitudesSection.tsx
import { motion, type Variants } from 'framer-motion';
import { useMemo, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';

// --- TYPES ---
export interface AptitudeItem {
  iconSrc?: string; // URL de l'image
  iconComponent?: LucideIcon; // Ou une icône Lucide
  title: string;
  text: string;
  description?: string; // Pour Schema.org
}

export interface AptitudesSectionProps {
  items: AptitudeItem[];
  /** Titre de la section (défaut: "Nos aptitudes clés") */
  title?: string;
  /** Sous-titre de la section */
  subtitle?: string;
  /** Label ARIA pour la section (accessibilité) */
  ariaLabel?: string;
  /** ID unique pour l'ancrage et l'accessibilité */
  id?: string;
  /** Classe CSS supplémentaire */
  className?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.1,
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0.8, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.1,
    },
  },
};

const AptitudesSection = ({ 
  items,
  title = "Nos aptitudes clés",
  subtitle = "Trois piliers essentiels qui définissent l'excellence de notre conciergerie.",
  ariaLabel = "Nos aptitudes fondamentales en conciergerie haut de gamme",
  id = "aptitudes-section",
  className = ""
}: AptitudesSectionProps) => {
  
  // ✅ Mémoïsation des items pour éviter les re-renders
  const memoizedItems = useMemo(() => items, [items]);
  
  // ✅ Détection prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ IDs pour les liens ARIA
  const headingId = `${id}-heading`;
  const subtitleId = subtitle ? `${id}-subtitle` : undefined;

  // ✅ Helper pour rendre l'icône (image ou composant)
  const renderIcon = useCallback((apt: AptitudeItem, alt: string) => {
    if (apt.iconSrc) {
      return (
        <img 
          src={apt.iconSrc} 
          alt={alt}
          className="w-full h-full object-contain p-4"
          loading="lazy"
          decoding="async"
          width={190}
          height={190}
        />
      );
    }
    if (apt.iconComponent) {
      const IconComponent = apt.iconComponent;
      return <IconComponent size={80} className="text-[#00b894]" strokeWidth={1.5} aria-hidden="true" />;
    }
    return null;
  }, []);

  // ✅ Helper pour formater le texte avec HTML sécurisé (sanitization basique)
  const formatTextWithHighlights = useCallback((text: string) => {
    // Remplace <strong> par une version stylisée, en échappant le reste pour éviter XSS
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&amp;lt;strong&amp;gt;(.*?)&amp;lt;\/strong&amp;gt;/g, '<strong class="font-semibold text-[#0b2545]">$1</strong>');
  }, []);

  return (
    // ✅ Section sémantique avec ARIA et Schema.org
    <motion.section
      id={id}
      className={`relative py-12 md:py-20 overflow-hidden bg-white ${className}`}
      role="region"
      aria-labelledby={headingId}
      aria-label={ariaLabel}
      // Animation d'apparition de la section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // Styles de fond en ligne (conservés pour fidélité au design)
      style={{
        backgroundImage: `
          url("https://www.destiny-conciergerie.net/sites/default/files/frise-left.webp"),
          url("https://www.destiny-conciergerie.net/sites/default/files/frise-right.webp")
        `,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '22%, 22%',
        backgroundPosition: 'left bottom, right top'
      }}
    >
      {/* Schema.org JSON-LD pour la section d'aptitudes */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `https://www.aldas-ci.com/services/conciergerie#${id}`,
            name: title,
            description: subtitle,
            itemListElement: memoizedItems.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: item.title,
                description: item.description || item.text.replace(/<[^>]*>/g, ''),
                serviceType: 'Conciergerie',
                areaServed: 'Abidjan, Côte d\'Ivoire'
              }
            }))
          })
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* En-tête de section avec animations Framer Motion */}
        <motion.div 
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            id={headingId}
            className="font-bold text-[#0b2545] mb-2 md:mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)' }}
            variants={itemVariants}
          >
            Nos <span className="font-extrabold" style={{ color: '#00b894' }}>aptitudes clés</span>
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              id={subtitleId}
              className="text-[#5f6f82] font-light mx-auto"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '600px' }}
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Grille Dynamique avec animations en cascade */}
        <motion.div 
          className={`grid gap-8 md:gap-10 justify-center mx-auto ${
            items.length === 1 ? 'max-w-lg grid-cols-1' :
            items.length === 2 ? 'max-w-3xl grid-cols-1 md:grid-cols-2' :
            items.length === 3 ? 'max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            'max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
          role="list"
          aria-label={`Liste des ${memoizedItems.length} aptitudes clés d'ÁLDÁS CI`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {memoizedItems.map((apt, idx) => {
            // Extraction du texte sans HTML pour Schema.org
            const plainText = apt.text.replace(/<[^>]*>/g, '');
            const iconAlt = `Icône illustrant ${apt.title} - Aptitude de conciergerie ÁLDÁS`;
            
            return (
              <motion.article
                key={idx}
                className="bg-white rounded-[18px] p-6 md:p-8 text-center border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-xl h-full flex flex-col focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2"
                role="listitem"
                variants={itemVariants}
                // Hover uniquement si l'utilisateur n'a pas désactivé les animations
                whileHover={prefersReducedMotion ? undefined : { y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                // Focus pour navigation clavier
                whileFocus={{ boxShadow: '0 0 0 3px rgba(6,182,212,0.3)', scale: 1.02 }}
                tabIndex={0}
                // Microdata Schema.org pour chaque aptitude
                itemScope
                itemType="https://schema.org/Service"
                // ARIA pour accessibilité
                aria-labelledby={`${id}-item-${idx}-title`}
                aria-describedby={`${id}-item-${idx}-desc`}
              >
                {/* Meta Schema.org */}
                <meta itemProp="name" content={apt.title} />
                <meta itemProp="description" content={plainText} />
                <meta itemProp="serviceType" content="Conciergerie" />
                <meta itemProp="areaServed" content="Abidjan, Côte d'Ivoire" />
                
                {/* Icône avec animation */}
                <motion.div 
                  className="w-[150px] h-[150px] md:w-[190px] md:h-[190px] mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,184,148,0.12)' }}
                  variants={iconVariants}
                  // Animation hover sur l'icône seule
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {renderIcon(apt, iconAlt)}
                </motion.div>

                {/* Titre avec ID pour aria-labelledby */}
                <motion.h3 
                  id={`${id}-item-${idx}-title`}
                  className="font-bold text-[#0b2545] mb-3 md:mb-4"
                  style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)' }}
                  itemProp="name"
                  // Animation du titre
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                >
                  {apt.title}
                </motion.h3>

                {/* Texte avec HTML sécurisé et microdata */}
                <motion.p 
                  id={`${id}-item-${idx}-desc`}
                  className="text-[#5f6f82] font-light leading-[1.7] flex-grow"
                  style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                  dangerouslySetInnerHTML={{ __html: formatTextWithHighlights(apt.text) }}
                  itemProp="description"
                  // Animation du texte
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.05) }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* ✅ Styles CSS pour états focus et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        [role="listitem"]:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
          border-radius: 1.125rem;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          [role="listitem"],
          [role="listitem"] *,
          .transition-all {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default AptitudesSection;