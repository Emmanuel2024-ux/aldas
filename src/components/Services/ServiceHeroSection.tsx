// src/components/Services/ServiceHeroSection.tsx
import { motion, type Variants } from 'framer-motion';
import { useMemo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import contactFixed from '../../assets/images/contact-fixe.jpeg';

// --- TYPES ---
export interface ServiceHeroSectionProps {
  headline: string;
  ctaLink?: string;
  ctaText?: string;
  backgroundImage?: string;
  /** Label ARIA pour la section (accessibilité) */
  ariaLabel?: string;
  /** ID unique pour l'ancrage */
  id?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const ServiceHeroSection = ({
  headline,
  ctaLink = "/contact",
  ctaText = "Contactez-nous",
  backgroundImage = contactFixed,
  ariaLabel = "Section d'appel à l'action - Contactez ÁLDÁS CI",
  id = "service-hero-section"
}: ServiceHeroSectionProps) => {
  
  // ✅ Détection prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Fonction pour parser et styliser le texte (mémoïsée)
  const renderHeadline = useMemo(() => {
    if (!headline) return null;
    
    const parts = headline.split(/(<span class="highlight">.*?<\/span>)/g);
    
    return parts.map((part, index) => {
      if (part.includes('<span class="highlight">')) {
        const text = part.replace(/<span class="highlight">|<\/span>/g, '');
        return (
          <motion.span 
            key={`highlight-${index}`} 
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f2ff] via-[#00c3ff] to-[#00f26c] font-extrabold drop-shadow-[0_0_15px_rgba(0,195,255,0.4)] mx-1 break-words inline-block"
            // Animation uniquement si l'utilisateur n'a pas désactivé les animations
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.2 + (index * 0.1),
              type: prefersReducedMotion ? 'tween' : 'spring',
              stiffness: 200
            }}
          >
            {text}
          </motion.span>
        );
      }
      return (
        <motion.span 
          key={`text-${index}`} 
          className="text-white/90 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        >
          {part}
        </motion.span>
      );
    });
  }, [headline, prefersReducedMotion]);

  // ✅ Gestionnaire de clic pour le CTA (tracking optionnel)
  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Optionnel : ajouter du tracking ici
    console.log(`📊 CTA clicked: ${ctaText} → ${ctaLink}`);
    // Laisser React Router gérer la navigation
  }, [ctaText, ctaLink]);

  return (
    // ✅ Section avec isolation de stacking context pour le background fixed
    // isolation: isolate crée un nouveau stacking context local
    // z-0 garantit que cette section ne chevauche pas les sections adjacentes
    <motion.section 
      id={id}
      className="relative w-full h-[75vh] flex items-center bg-white overflow-hidden isolation-isolate z-0"
      role="region"
      aria-label={ariaLabel}
      // Animation d'apparition de la section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      
      {/* 
        ✅ BACKGROUND FIXED - Isolé dans son propre stacking context
        - isolation: isolate empêche le fixed de "sortir" de cette section
        - z-0 sur le parent + z-10 sur le contenu garantit l'ordre correct
        - pointer-events: none pour ne pas bloquer les interactions
      */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none isolation-isolate"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        aria-hidden="true"
      >
        {/* Overlay Dégradé Intelligent */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 backdrop-blur-[1px]"
          aria-hidden="true"
          // Animation subtile de l'overlay
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: 'easeInOut' }}
        />
      </div>

      {/* --- CONTENU (Z-Index Supérieur) --- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 md:space-y-12 px-4">
        
        {/* Titre avec Hiérarchie Visuelle et animations Framer Motion */}
        <motion.h2 
          className="text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-light tracking-wide drop-shadow-lg"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {renderHeadline}
        </motion.h2>

        {/* Double Soulignement "Néon Fin" avec animation */}
        <motion.div 
          className="relative w-24 md:w-32 h-2 mx-auto"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff] to-[#00c3ff] rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00c3ff] via-[#00f2ff] to-transparent rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]" aria-hidden="true" />
        </motion.div>

        {/* Bouton Outline "Glass" avec animations */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
        >
          <Link 
            to={ctaLink}
            onClick={handleCtaClick}
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-3.5 border border-white/30 text-white font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs rounded-full hover:bg-white hover:text-gray-900 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] backdrop-blur-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label={`${ctaText} - Contactez ÁLDÁS CI pour en savoir plus`}
          >
            {/* Effet de brillance - décoratif */}
            <motion.span 
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              aria-hidden="true"
              // Animation de brillance uniquement si animations activées
              animate={prefersReducedMotion ? {} : { 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatDelay: 0.5
              }}
            />
            
            <span className="relative z-10">{ctaText}</span>
            <motion.span
              aria-hidden="true"
              // Petite oscillation de la flèche
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={16} className="relative z-10" />
            </motion.span>
          </Link>
        </motion.div>

      </div>

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Isolation de stacking context pour le background fixed */
        .isolation-isolate {
          isolation: isolate;
        }
        
        /* Focus visible pour navigation clavier */
        a:focus {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
            scroll-behavior: auto !important;
          }
          .group-hover\\:-translate-y-1:hover {
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default ServiceHeroSection;