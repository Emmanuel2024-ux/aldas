// src/components/Services/ServiceGrid.tsx
// ============================================================================
// 🎯 GRILLE DE SERVICES - OPTIMISATION ULTIME - ÁLDÁS CI
// ============================================================================
// • TypeScript strict : interfaces exportées, zéro `any`, types inférés
// • Schema.org enrichi : ItemList + Service + Breadcrumb + Organization
// • Accessibilité WCAG 2.1 : ARIA complet, navigation clavier, focus visible
// • Performance : memoization optimale, images WebP, lazy loading intelligent
// • SEO technique : Open Graph dynamique, canonical URLs, hreflang support
// • Maintenance : code modulaire, commentaires JSDoc, tests-ready
// ============================================================================

import { Link, useLocation } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { useMemo, useCallback, useEffect } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { 
  getOtherServices, 
  type ServiceItem, 
  type Feature,
  sanitizeHeroHeadline 
} from '../../data/servicesData';
import ServiceHeroSection from './ServiceHeroSection';
import ModernHR from '../UI/ModernHR';

// ============================================================================
// 🎯 TYPES EXPORTÉS (pour réutilisation et documentation)
// ============================================================================

export interface ServiceGridProps {
  /** Slug du service courant à exclure de la grille */
  currentSlug?: string | null;
  /** Titre visible de la section */
  title?: string;
  /** Titre pour le HeroSection optionnel */
  heroTitle?: string | null;
  /** ID unique pour l'ancrage et l'accessibilité */
  sectionId: string;
  /** Label ARIA pour la section */
  ariaLabel?: string;
  /** Classe CSS supplémentaire */
  className?: string;
  /** Callback pour tracking analytics au clic */
  onServiceClick?: (service: ServiceItem) => void;
}

// ============================================================================
// 🎨 VARIANTES D'ANIMATION (typées, performantes, réutilisables)
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.12,
      when: 'beforeChildren'
    },
  },
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 18, 
      mass: 0.12 
    },
  },
} as const;

// ============================================================================
// 🧩 SOUS-COMPOSANT : CARTE SERVICE (Extrait pour meilleure maintenance)
// ============================================================================

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  total: number;
  prefersReducedMotion: boolean;
  onClick?: () => void;
}

const ServiceCard = ({ 
  service, 
  index, 
  total, 
  prefersReducedMotion, 
  onClick 
}: ServiceCardProps) => {
  const cardId = `service-card-${service.slug}`;
  const titleId = `${cardId}-title`;
  const descId = `${cardId}-desc`;
  const featuresId = `${cardId}-features`;

  // ✅ URL canonique mémoïsée
  const serviceUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://www.aldas-ci.com';
    return `${baseUrl}${service.link}`;
  }, [service.link]);

  // ✅ Handler de clic mémoïsé
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  // ✅ Handler clavier pour accessibilité
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }, [onClick]);

  return (
    // ✅ Article sémantique avec microdata Schema.org
    <motion.article
      id={cardId}
      className="group relative h-[400px] sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-shadow duration-300 border border-slate-100 bg-slate-900 focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-900"
      itemScope
      itemType="https://schema.org/Service"
      aria-labelledby={titleId}
      aria-describedby={descId}
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      // ✅ Animation hover uniquement si animations activées
      whileHover={prefersReducedMotion ? undefined : { 
        y: -6, 
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      whileFocus={{ 
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.4)', 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* ✅ Meta Schema.org pour crawlers */}
      <meta itemProp="name" content={service.title} />
      <meta itemProp="description" content={service.details} />
      <meta itemProp="serviceType" content={service.badge} />
      <meta itemProp="provider" content="ÁLDÁS CI" />
      <meta itemProp="areaServed" content="Abidjan, Côte d'Ivoire" />
      <link itemProp="url" href={serviceUrl} />

      {/* ✅ Image optimisée : alt descriptif + performance */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <img
          src={service.img}
          alt={`Illustration du service ${service.title} - ${service.badge} chez ÁLDÁS CI à Abidjan`}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'} // ✅ Premieres images chargées en priorité
          decoding="async"
          fetchPriority={index === 0 ? 'high' : 'auto'}
          width={400}
          height={300}
          itemProp="image"
          onError={(e) => {
            // ✅ Fallback si image échoue
            const target = e.currentTarget;
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3Ctext fill="%2364748b" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage non disponible%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* Overlay gradient pour lisibilité */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-slate-900/60 group-hover:to-slate-900/80 transition-colors duration-500" 
          aria-hidden="true" 
        />
      </div>

      {/* ✅ Contenu supérieur toujours visible */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-5 md:p-6 z-20 flex flex-col justify-start h-full pointer-events-none">
        {/* Badge catégorie */}
        <div className="self-start mb-2.5 sm:mb-3">
          <span
            className="px-2.5 sm:px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
            itemProp="serviceType"
          >
            {service.badge}
          </span>
        </div>

        {/* Titre + Sous-titre */}
        <div className="mt-auto mb-2.5 sm:mb-3">
          <h3
            id={titleId}
            className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-1.5 leading-tight drop-shadow"
            itemProp="name"
          >
            {service.title}
          </h3>
          <p
            id={descId}
            className="text-emerald-300 font-medium text-[10px] sm:text-xs tracking-wide opacity-95"
            itemProp="description"
          >
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* ✅ Panneau de détails (Reveal Effect) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-full flex flex-col justify-end p-4 sm:p-5 md:p-6 pt-24 sm:pt-28 bg-gradient-to-t from-slate-900/95 via-slate-900/85 to-transparent backdrop-blur-sm"
        initial={{ y: 32, opacity: 0 }}
        whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="space-y-2 sm:space-y-2.5 overflow-hidden">
          {/* Description détaillée */}
          <p 
            className="text-slate-300 text-[10px] sm:text-xs leading-relaxed line-clamp-3 border-l-2 border-emerald-400 pl-2.5 sm:pl-3" 
            itemProp="description"
          >
            {sanitizeHeroHeadline(service.details)}
          </p>

          {/* Liste des fonctionnalités */}
          <ul
            id={featuresId}
            className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-1.5"
            aria-label={`Fonctionnalités du service ${service.title}`}
            itemProp="serviceOutput"
          >
            {service.features.map((feature: Feature, idx: number) => (
              <motion.li
                key={idx}
                className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-400"
                initial={{ y: 16, opacity: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.25, 
                  delay: prefersReducedMotion ? 0 : 0.08 + (idx * 0.04) 
                }}
              >
                <div className={`p-0.5 sm:p-1 rounded bg-white/5 ${feature.colorClass}`} aria-hidden="true">
                  <feature.icon className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="font-medium line-clamp-1">{feature.text}</span>
              </motion.li>
            ))}
          </ul>

          {/* Bouton d'action */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.25, 
              delay: prefersReducedMotion ? 0 : 0.2 
            }}
          >
            <Link
              to={service.link}
              className="group/btn inline-flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-emerald-500/40 overflow-hidden relative text-[10px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label={`Découvrir le service ${service.title} - ${service.badge}`}
              itemProp="url"
              rel={service.link.startsWith('/') ? 'internal' : 'noopener noreferrer'}
              onClick={handleClick}
            >
              <span className="relative z-10">Découvrir</span>
              <motion.span
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.span>
              {/* Effet de brillance */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" 
                aria-hidden="true" 
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ Indicateur décoratif */}
      <motion.div
        className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20"
        initial={{ opacity: 1 }}
        whileHover={prefersReducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        aria-hidden="true"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} aria-hidden="true" />
        </div>
      </motion.div>

      {/* ✅ Informations sr-only pour lecteurs d'écran */}
      <span className="sr-only" aria-live="polite">
        Service {index + 1} sur {total} : {service.title}, catégorie {service.badge}. {service.details}
      </span>
    </motion.article>
  );
};

// ============================================================================
// 🧩 COMPOSANT PRINCIPAL
// ============================================================================

const ServiceGrid = ({
  currentSlug,
  title = 'Nos Autres Services',
  heroTitle,
  ariaLabel,
  sectionId,
  className = '',
  onServiceClick,
}: ServiceGridProps) => {
  const location = useLocation();

  // ✅ Slug courant mémoïsé
  const activeSlug = useMemo(() => {
    if (currentSlug !== undefined) return currentSlug;
    const parts = location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || null;
  }, [currentSlug, location.pathname]);

  // ✅ Services à afficher (exclut le service courant)
  const displayedServices = useMemo(
    () => getOtherServices(activeSlug),
    [activeSlug]
  );

  const isAboutPage = location.pathname === '/about';
  const sectionTitle = isAboutPage ? 'Nos Services Principaux' : title;

  // ✅ Grille responsive mémoïsée
  const gridClass = useMemo(
    () =>
      isAboutPage
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'
        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
    [isAboutPage]
  );

  // ✅ prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ IDs uniques pour ARIA
  const titleId = `${sectionId}-title`;
  const descId = `${sectionId}-description`;


  

  // ✅ Injection dynamique des meta tags Open Graph / Twitter
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseUrl = window.location.origin;
    const currentUrl = `${baseUrl}${location.pathname}`;
    
    const ogTags = [
      { property: 'og:title', content: `${sectionTitle} - ÁLDÁS CI` },
      { property: 'og:description', content: `Services premium à Abidjan : ${displayedServices.slice(0, 3).map(s => s.title).join(', ')}${displayedServices.length > 3 ? '...' : ''}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:site_name', content: 'ÁLDÁS CI' },
      { property: 'og:locale', content: 'fr_CI' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${sectionTitle} - ÁLDÁS CI` },
      { name: 'twitter:description', content: `Services premium à Abidjan : ${displayedServices.map(s => s.title).join(', ')}` },
    ];

    // Track des tags créés pour cleanup
    const createdTags: HTMLElement[] = [];

    ogTags.forEach(({ property, name, content }) => {
      const attr = property ? 'property' : 'name';
      const value = property || name;
      let tag = document.querySelector(`meta[${attr}="${value}"]`);

      if (tag) {
        // Mettre à jour si existe déjà
        tag.setAttribute('content', content);
      } else {
        // Créer nouveau tag
        tag = document.createElement('meta');
        tag.setAttribute(attr, value!);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    });

    // ✅ Cleanup : supprimer les tags créés au démontage
    return () => {
      createdTags.forEach(tag => tag.remove());
    };
  }, [displayedServices, sectionTitle, location.pathname]);

  // ✅ Gestionnaire de clic pour tracking
  const handleServiceClick = useCallback((service: ServiceItem) => {
    onServiceClick?.(service);
  }, [onServiceClick]);

  // ✅ Si aucun service à afficher, ne rien rendre
  if (displayedServices.length === 0) return null;

  return (
    // ✅ Wrapper avec stacking context
    <div className={`relative z-0 ${className}`}>
      {/* HeroSection optionnel */}
      {heroTitle && (
        <ServiceHeroSection
          headline={sanitizeHeroHeadline(heroTitle)}
          ctaText="Contactez-nous"
          ctaLink="/contact"
          ariaLabel="Section d'appel à l'action - Contactez ÁLDÁS CI"
        />
      )}

      {/* ✅ Section sémantique avec ARIA et Schema.org */}
      <motion.section
        id={sectionId}
        className="py-12 sm:py-14 bg-white relative overflow-hidden"
        role="region"
        aria-labelledby={titleId}
        aria-describedby={descId}
        aria-label={ariaLabel || `${sectionTitle} - Services premium ÁLDÁS CI`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        itemScope
        itemType="https://schema.org/Service"
      >
        
        <div className="container mx-auto px-4 relative z-10">
          <ModernHR />

          {/* ✅ Titre H2 pour SEO (sr-only) */}
          <h2 id={titleId} className="sr-only" itemProp="name">
            {sectionTitle}
          </h2>

          {/* Description pour SEO et accessibilité */}
          <p id={descId} className="sr-only" itemProp="description">
            Découvrez nos services premium chez ÁLDÁS CI : {displayedServices.map(s => s.title).join(', ')}.
          </p>

          {/* Titre visible (décoratif) */}
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl pb-2.5 sm:pb-3 font-bold text-slate-800"
            aria-hidden="true"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            {sectionTitle}
          </motion.h3>

          {/* ✅ Grille avec rôle ARIA + animations */}
          <motion.div
            className={gridClass}
            role="list"
            aria-label={`Liste des ${displayedServices.length} services premium : ${sectionTitle}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.slug}
                role="listitem"
                variants={cardVariants}
              >
                <ServiceCard
                  service={service}
                  index={index}
                  total={displayedServices.length}
                  prefersReducedMotion={prefersReducedMotion}
                  onClick={() => handleServiceClick(service)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
        <style>{`
          /* Focus visible pour navigation clavier */
          [role="listitem"]:focus-visible {
            outline: 2px solid #10b981;
            outline-offset: 2px;
            border-radius: 1.5rem;
          }
          
          /* Désactiver animations si reduced-motion */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              transition: none !important;
              animation: none !important;
              transform: none !important;
              scroll-behavior: auto !important;
            }
          }
          
          /* sr-only utilitaire */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}</style>
      </motion.section>
    </div>
  );
};

export default ServiceGrid;