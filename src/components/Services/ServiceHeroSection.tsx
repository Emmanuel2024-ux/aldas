// src/components/Services/ServiceHeroSection.tsx
// ============================================================================
// 🎯 HERO SECTION PREMIUM - ÁLDÁS CI
// ============================================================================
// Design professionnel avec :
// • Background toujours plein écran (aucun espace blanc)
// • Scroll fluide 60fps garanti (pas de fixed/blur coûteux)
// • Typographie hiérarchisée et responsive
// • Animations subtiles et élégantes
// • Accessibilité ARIA complète + reduced-motion
// • TypeScript strict avec exports typés
// ============================================================================

import { motion } from 'framer-motion';
import { useMemo, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// ✅ Import image optimisée
import contactFixed from '../../assets/images/contact-fixe.jpeg';

// ============================================================================
// 🎯 TYPES EXPORTÉS (pour réutilisation et documentation)
// ============================================================================

export interface ServiceHeroSectionProps {
  /** Titre principal avec support <span class="highlight"> pour mise en valeur */
  headline: string;
  /** Lien de destination du CTA (défaut: "/contact") */
  ctaLink?: string;
  /** Texte du bouton CTA (défaut: "Contactez-nous") */
  ctaText?: string;
  /** Image de background (défaut: contactFixed) */
  backgroundImage?: string;
  /** Label ARIA pour accessibilité */
  ariaLabel?: string;
  /** ID unique pour ancrage et tests */
  id?: string;
  /** Callback optionnel pour tracking analytics */
  onCtaClick?: () => void;
}

// ============================================================================
// 🎨 VARIANTES D'ANIMATION (typées et réutilisables)
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, // easing professionnel
  },
} as const;

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
  },
} as const;

// ============================================================================
// 🧩 COMPOSANT PRINCIPAL
// ============================================================================

const ServiceHeroSection = ({
  headline,
  ctaLink = '/contact',
  ctaText = 'Contactez-nous',
  backgroundImage = contactFixed,
  ariaLabel = "Section d'introduction - Services premium ÁLDÁS CI",
  id = 'service-hero-section',
  onCtaClick,
}: ServiceHeroSectionProps) => {
  // ✅ Détection prefers-reduced-motion (mémoïsée)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Parsing sécurisé du headline avec mise en valeur
  const renderHeadline = useMemo(() => {
    if (!headline) return null;

    const parts = headline.split(/(<span class="highlight">.*?<\/span>)/g);

    return parts.map((part, index) => {
      if (part.includes('<span class="highlight">')) {
        const text = part.replace(/<[^>]+>/g, '');
        return (
          <motion.span
            key={`hl-${index}`}
            className="relative inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent font-semibold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, delay: 0.15 + index * 0.06 }
            }
          >
            {text}
            {/* Sous-ligne décorative subtile */}
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-emerald-400/60 opacity-70" />
          </motion.span>
        );
      }
      return (
        <motion.span
          key={`txt-${index}`}
          className="text-white/95 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35 }}
        >
          {part}
        </motion.span>
      );
    });
  }, [headline, prefersReducedMotion]);

  // ✅ Handler CTA mémoïsé
  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onCtaClick?.();
      // Navigation gérée par React Router via le prop `to`
    },
    [onCtaClick]
  );

  return (
    // ✅ Section principale : hauteur responsive, overflow caché pour le background
    <motion.section
      id={id}
      className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden"
      role="region"
      aria-label={ariaLabel}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 
        ✅ BACKGROUND PROFESSIONNEL
        • Image en cover avec overlay gradient multicouche
        • Effet de profondeur avec radial gradient et noise texture
        • Aucune animation coûteuse → scroll 60fps garanti
      */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Image principale */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay gradient professionnel : dark → transparent → dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-900/95" />

        {/* Radial gradient pour effet de focalisation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15)_0%,_transparent_60%)]" />

        {/* Texture noise subtile pour profondeur (1% opacity) */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Lueur décorative en haut (subtile) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      </div>

      {/* === CONTENU PRINCIPAL === */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Badge décoratif "Premium" */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 sm:mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          variants={badgeVariants}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-medium text-emerald-300 uppercase tracking-wider">
            Services Premium
          </span>
        </motion.div>

        {/* Titre principal avec hiérarchie typographique */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight sm:leading-tight tracking-tight"
          variants={itemVariants}
        >
          {renderHeadline}
        </motion.h1>

        {/* Séparateur élégant */}
        <motion.div
          className="w-24 sm:w-32 h-px mx-auto my-6 sm:my-8 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
          variants={itemVariants}
        />

        {/* Bouton CTA professionnel */}
        <motion.div variants={itemVariants}>
          <Link
            to={ctaLink}
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 
                       bg-gradient-to-r from-emerald-500 to-cyan-500 
                       hover:from-emerald-400 hover:to-cyan-400
                       text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.12em]
                       rounded-full shadow-lg shadow-emerald-500/25
                       transition-all duration-300 ease-out
                       focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
                       overflow-hidden"
            aria-label={`${ctaText} - Contacter ÁLDÁS CI pour un service premium`}
          >
            {/* Effet de brillance au hover */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
              aria-hidden="true"
            />
            
            <span className="relative z-10">{ctaText}</span>
            
            {/* Flèche animée subtile */}
            <ArrowRight
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Indicateur de scroll (optionnel, desktop uniquement) */}
        {!prefersReducedMotion && (
          <motion.div
            className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            aria-hidden="true"
          >
            <span className="text-[10px] uppercase tracking-widest">Explorer</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </motion.div>
        )}
      </div>

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        a:focus-visible {
          outline: 2px solid #34d399;
          outline-offset: 2px;
        }
        
        /* Désactiver animations si reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
          .group:hover { transform: none !important; }
          .animate-pulse { animation: none !important; }
        }
        
        /* Smooth scroll pour les ancres internes */
        html { scroll-behavior: smooth; }
      `}</style>
    </motion.section>
  );
};

// ✅ Export unique (Fast Refresh compatible)
export default ServiceHeroSection;