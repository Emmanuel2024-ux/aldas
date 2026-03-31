// src/components/UI/ValuesSection.tsx
import type { LucideIcon } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';

// --- TYPES ---
export interface ValueItem {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string; // ex: 'text-amber-500'
  bg: string;    // ex: 'bg-amber-50'
}

export interface ValuesSectionProps {
  title?: string;
  subtitle?: string;
  values: ValueItem[];
  className?: string;
  /** Label ARIA pour la section (accessibilité) */
  ariaLabel?: string;
  /** ID unique pour l'ancrage et l'accessibilité */
  id?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Délai entre chaque carte
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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
      damping: 10,
      delay: 0.1,
    },
  },
};

const hoverVariants = {
  hover: {
    y: -8,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
} as const;

const ValuesSection = ({ 
  title = "Nos Valeurs", 
  subtitle, 
  values, 
  className = "",
  ariaLabel = "Nos valeurs fondamentales qui guident ÁLDÁS CI",
  id = "valeurs-section"
}: ValuesSectionProps) => {
  
  // ✅ Mémoïsation des valeurs pour éviter les re-renders
  const memoizedValues = useMemo(() => values, [values]);

  // ✅ Détection prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ ID pour les liens ARIA
  const headingId = `${id}-heading`;
  const subtitleId = subtitle ? `${id}-subtitle` : undefined;

  return (
    // ✅ Section sémantique avec ARIA complet
    <motion.section
      id={id}
      className={`py-24 bg-gray-50 relative overflow-hidden ${className}`}
      role="region"
      aria-labelledby={headingId}
      aria-label={ariaLabel}
      // Animation d'apparition de la section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Décorations de fond - purement visuelles */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-aldas/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* En-tête de section avec animations Framer Motion */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle && (
            <motion.span 
              className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-aldas uppercase bg-aldas/10 rounded-full border border-aldas/20"
              id={subtitleId}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
          )}
          
          <motion.h2 
            id={headingId}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {title}
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-transparent via-aldas to-transparent mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Grille des valeurs avec animations en cascade */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label={`Liste des ${memoizedValues.length} valeurs fondamentales d'ÁLDÁS CI`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {memoizedValues.map((v, idx) => {
            // Extraction sûre de la couleur pour l'effet de lueur
            const colorBase = v.color.split(' ').find(c => c.startsWith('text-'))?.replace('text-', '').split('-')[0] || 'gray';
            
            return (
              <motion.article
                key={idx}
                className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-aldas/10 transition-shadow duration-300 transform border border-gray-100 flex flex-col items-center text-center relative overflow-hidden focus-within:ring-2 focus-within:ring-aldas focus-within:ring-offset-2"
                role="listitem"
                variants={cardVariants}
                // Hover uniquement si l'utilisateur n'a pas désactivé les animations
                whileHover={prefersReducedMotion ? undefined : hoverVariants.hover}
                // Focus pour navigation clavier
                whileFocus={{ boxShadow: '0 0 0 3px rgba(6,182,212,0.3)' }}
                tabIndex={0}
                // Schema.org pour chaque valeur
                itemScope
                itemType="https://schema.org/Thing"
              >
                {/* Meta Schema.org */}
                <meta itemProp="name" content={v.title} />
                <meta itemProp="description" content={v.text} />
                
                {/* Effet de lueur interne au survol - décoratif */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-${colorBase}-50/30 to-transparent pointer-events-none`}
                  aria-hidden="true"
                />
                
                <div className="relative z-10 w-full">
                  {/* Icône dans un conteneur animé */}
                  <motion.div 
                    className={`w-20 h-20 mx-auto rounded-2xl ${v.bg} ${v.color} flex items-center justify-center mb-6 shadow-inner border border-white/50`}
                    variants={iconVariants}
                    // Animation hover sur l'icône seule
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <v.icon 
                      size={36} 
                      strokeWidth={1.5} 
                      className="transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 tracking-tight"
                    itemProp="name"
                    // Animation du titre
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                  >
                    {v.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed font-light"
                    itemProp="description"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                  >
                    {v.text}
                  </motion.p>
                </div>

                {/* Ligne décorative bas de carte - animation au hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  aria-hidden="true"
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
          border-radius: 1.5rem;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          [role="listitem"],
          [role="listitem"] * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default ValuesSection;