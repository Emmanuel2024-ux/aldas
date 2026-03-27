// src/components/Services/ServiceGrid.tsx
import { Link, useLocation } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { useMemo} from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { getOtherServices, type ServiceItem } from '../../data/servicesData';
import ServiceHeroSection from './ServiceHeroSection';
import ModernHR from '../UI/ModernHR';

// --- TYPES ---
export interface ServiceGridProps {
  currentSlug?: string | null;
  title?: string;
  heroTitle?: string | null;
  sectionId: string;
  ariaLabel?: string;
  /** Classe CSS supplémentaire pour personnalisation */
  className?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
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

const ServiceGrid = ({ 
  currentSlug, 
  title = "Nos Autres Services", 
  heroTitle,
  ariaLabel,
  sectionId,
  className = ""
}: ServiceGridProps) => {
  const location = useLocation();
  
  // ✅ Détection du slug courant mémoïsée
  const activeSlug = useMemo(() => {
    if (currentSlug !== undefined) return currentSlug;
    const parts = location.pathname.split('/');
    return parts[parts.length - 1] || null;
  }, [currentSlug, location.pathname]);
  
  // ✅ Services à afficher (exclut le service courant)
  const displayedServices = useMemo(() => 
    getOtherServices(activeSlug), 
    [activeSlug]
  );

  // ✅ Détection prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Si aucun service à afficher, retourne null
  if (displayedServices.length === 0) return null;

  const isAboutPage = location.pathname === '/about';
  const sectionTitle = isAboutPage ? "Nos Services Principaux" : title;
  
  // ✅ IDs uniques pour l'accessibilité ARIA
  const titleId = `${sectionId}-title`;

  // ✅ Logique de grille dynamique mémoïsée
  const gridClass = useMemo(() => 
    isAboutPage 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    [isAboutPage]
  );

  // ✅ Schema.org JSON-LD pour la grille de services
  const servicesSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `https://www.aldas-ci.com${location.pathname}#${sectionId}`,
    name: sectionTitle,
    description: `Découvrez nos autres services premium chez ÁLDÁS CI`,
    itemListElement: displayedServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.details,
        serviceType: service.badge,
        areaServed: 'Abidjan, Côte d\'Ivoire',
        url: `https://www.aldas-ci.com${service.link}`
      }
    }))
  }), [displayedServices, sectionTitle, sectionId, location.pathname]);

  return (
    // ✅ Wrapper avec stacking context corrigé (z-0 pour ne pas chevaucher)
    <div className={`relative z-0 ${className}`}>
      
      {/* Affichage conditionnel du Hero */}
      {heroTitle && (
        <ServiceHeroSection 
          headline={heroTitle}
          ctaText="Contactez-nous"
          ctaLink="/contact"
        />
      )}
       
      {/* ✅ Section sémantique avec ARIA et Schema.org */}
      <motion.section 
        id={sectionId}
        className="py-14 bg-white relative overflow-hidden"
        role="region"
        aria-labelledby={titleId}
        aria-label={ariaLabel || `${sectionTitle} - ÁLDÁS CI`}
        // Animation d'apparition de la section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Injection du Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
       
        <div className="container mx-auto px-4 relative z-10">
          
          <ModernHR />
           
          {/* ✅ Titre H2 pour SEO (sr-only car ModernHR gère le visuel) */}
          <h2 
            id={titleId}
            className="text-3xl pb-2 sr-only"
            itemProp="name"
          >
            {sectionTitle}
          </h2>
          
          {/* Titre visible pour les utilisateurs (décoratif mais accessible) */}
          <motion.h3 
            className="text-3xl pb-2 font-bold text-slate-800"
            aria-hidden="true"
            // Animation du titre
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {sectionTitle}
          </motion.h3>

          {/* ✅ Grille avec rôle et label ARIA + animations en cascade */}
          <motion.div 
            className={gridClass}
            role="list"
            aria-label={`Liste des ${displayedServices.length} services : ${sectionTitle}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.slug}
                role="listitem"
                variants={cardVariants}
                // Hover uniquement si l'utilisateur n'a pas désactivé les animations
                whileHover={prefersReducedMotion ? undefined : { 
                  y: -8, 
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                // Focus pour navigation clavier
                whileFocus={{ boxShadow: '0 0 0 3px rgba(6,182,212,0.3)', scale: 1.02 }}
              >
                <ServiceCard 
                  service={service} 
                  index={index} 
                  total={displayedServices.length}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
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
            [role="listitem"] *,
            .transition-all,
            .transition-transform,
            .transition-opacity {
              transition: none !important;
              animation: none !important;
              transform: none !important;
            }
            .group-hover\\:scale-110:hover,
            .group-hover\\:-translate-y-2:hover,
            .group-hover\\:translate-y-0:hover,
            .group-hover\\:opacity-100:hover {
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </motion.section>
    </div>
  );
};

// --- SOUS-COMPOSANT CARTE PREMIUM (dans le même fichier) ---
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  total: number;
  prefersReducedMotion: boolean;
}

const ServiceCard = ({ service, index, total, prefersReducedMotion }: ServiceCardProps) => {
  // ✅ IDs uniques pour l'accessibilité
  const cardId = `service-card-${service.slug}`;
  const titleId = `${cardId}-title`;
  const descId = `${cardId}-desc`;

  // ✅ Variantes d'animation pour la carte
  const cardHoverVariants = {
    hover: {
      y: -8,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    // ✅ Article sémantique avec microdata Schema.org
    <motion.article 
      id={cardId}
      className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-aldas/20 transition-shadow duration-300 transform border border-gray-100 bg-gray-900 focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-900"
      itemScope
      itemType="https://schema.org/Service"
      aria-labelledby={titleId}
      aria-describedby={descId}
      role="article"
      whileFocus={{ boxShadow: '0 0 0 3px rgba(6,182,212,0.3)', scale: 1.02 }}
      tabIndex={0}
    >
      {/* ✅ Meta Schema.org */}
      <meta itemProp="name" content={service.title} />
      <meta itemProp="description" content={service.details} />
      <meta itemProp="serviceType" content={service.badge} />
      <link itemProp="url" href={`https://www.aldas-ci.com${service.link}`} />
      
      {/* Image de fond - décorative, donc aria-hidden */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <img 
          src={service.img} 
          alt={`Illustration du service ${service.title} chez ÁLDÁS CI`} 
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 group-hover:to-black/90 transition-colors duration-500"></div>
      </div>

      {/* Contenu toujours visible */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-start h-full pointer-events-none">
        {/* Badge */}
        <div className="self-start mb-4">
          <span 
            className="px-3 py-1 md:px-4 md:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg"
            itemProp="serviceType"
          >
            {service.badge}
          </span>
        </div>
        
        {/* Titre + Sous-titre */}
        <div className="mt-auto mb-4">
          <h3 
            id={titleId}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md"
            itemProp="name"
          >
            {service.title}
          </h3>
          <p 
            id={descId}
            className="text-aldas-light font-medium text-xs md:text-sm tracking-wide opacity-90"
            itemProp="description"
          >
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* Panneau de détails (Reveal Effect) - animé avec Framer Motion */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 z-30 h-full flex flex-col justify-end p-6 md:p-8 pt-32 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm"
        // Animation d'apparition au hover
        initial={{ y: 40, opacity: 0 }}
        whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="space-y-3 md:space-y-4 overflow-hidden">
          
          {/* Description détaillée */}
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-3 border-l-2 border-aldas pl-3 md:pl-4" itemProp="description">
            {service.details}
          </p>
          
          {/* Liste des fonctionnalités */}
          <ul className="space-y-1.5 md:space-y-2 pt-2" aria-label={`Fonctionnalités de ${service.title}`}>
            {service.features.map((feature, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-400"
                // Animation en cascade pour chaque feature
                initial={{ y: 20, opacity: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: prefersReducedMotion ? 0 : 0.1 + (idx * 0.05)
                }}
              >
                <div className={`p-1 rounded bg-white/5 ${feature.colorClass}`} aria-hidden="true">
                  <feature.icon className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} aria-hidden="true" />
                </div>
                <span className="font-medium line-clamp-1">{feature.text}</span>
              </motion.li>
            ))}
          </ul>
          
          {/* Bouton d'action */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: prefersReducedMotion ? 0 : 0.25
            }}
          >
            <Link 
              to={service.link} 
              className="group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-4 md:py-3.5 md:px-6 bg-aldas hover:bg-white text-white hover:text-aldas-dark font-bold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-aldas/40 overflow-hidden relative text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Découvrir le service ${service.title} - ${service.badge}`}
              itemProp="url"
            >
              <span className="relative z-10">Découvrir</span>
              <motion.span
                aria-hidden="true"
                animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4" />
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" aria-hidden="true"></div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur visuel "Plus" - décoratif */}
      <motion.div 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20"
        initial={{ opacity: 1 }}
        whileHover={prefersReducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
          <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} aria-hidden="true" />
        </div>
      </motion.div>
      
      {/* ✅ Informations pour les lecteurs d'écran (sr-only) */}
      <span className="sr-only" aria-live="polite">
        Service {index + 1} sur {total} : {service.title}, {service.badge}
      </span>
    </motion.article>
  );
};

export default ServiceGrid;