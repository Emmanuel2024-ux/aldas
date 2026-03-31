// src/components/Events/EventsPoles.tsx
import { motion, type Variants } from 'framer-motion';
import { useMemo, useCallback } from 'react';
import { Briefcase, Target, Users, Home, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Import des images locales optimisées
import corporate from '../../assets/images/events/corporate.webp';
import activation from '../../assets/images/events/activation.jpg';
import gp from '../../assets/images/events/gp.jpg';
import institutionnel from '../../assets/images/events/institutionnel.webp';

// --- TYPES ---
export interface PoleItem {
  badge: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  list: string[];
  link?: string;
  description?: string; // Pour Schema.org
}

export interface PolesSectionProps {
  items?: PoleItem[];
  /** ID unique pour l'ancrage et l'accessibilité */
  id?: string;
  /** Label ARIA pour la section */
  ariaLabel?: string;
  /** Titre de la section (pour Schema.org) */
  sectionTitle?: string;
  /** Classe CSS supplémentaire */
  className?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.1,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
      delay: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const PolesSection = ({ 
  items, 
  id = 'event-poles-section',
  ariaLabel = 'Nos pôles d\'expertise en organisation d\'événements premium',
  sectionTitle = 'Pôles d\'activité événementielle',
  className = ''
}: PolesSectionProps) => {
  
  // ✅ Données par défaut mémoïsées
  const defaultPoles: PoleItem[] = useMemo(() => [
    {
      badge: 'Corporate',
      icon: Briefcase,
      title: 'Solutions Corporate',
      desc: 'Un accompagnement complet pour structurer et sublimer la communication interne et externe des entreprises.',
      description: 'Organisation de séminaires, conventions, team-building et lancements corporate avec scénographie professionnelle',
      imageSrc: corporate,
      imageAlt: 'Événement corporate organisé par ÁLDÁS CI : séminaire d\'entreprise à Abidjan',
      list: ['Séminaires & conventions', 'Team-building & cohésion', 'Lancements corporate', 'Scénographie & technique'],
      link: '/contact'
    },
    {
      badge: 'Activation',
      icon: Target,
      title: 'Activation & Engagement',
      desc: 'Des dispositifs impactants pour renforcer la visibilité, l\'engagement et la proximité avec vos audiences.',
      description: 'Roadshows, brand activation et expériences immersives pour engager vos cibles',
      imageSrc: activation,
      imageAlt: 'Activation de marque par ÁLDÁS CI : roadshow et expérience interactive à Abidjan',
      list: ['Roadshows & tournées', 'Brand activation', 'Expériences immersives', 'Animations interactives'],
      link: '/contact'
    },
    {
      badge: 'Grand Public',
      icon: Users,
      title: 'Événements Grand Public',
      desc: 'Des événements d\'envergure conçus pour rassembler, divertir et créer des expériences mémorables.',
      description: 'Concerts, festivals et événements grand public avec gestion de flux et scénographie événementielle',
      imageSrc: gp,
      imageAlt: 'Festival grand public organisé par ÁLDÁS CI à Abidjan : concert et animations',
      list: ['Concerts & festivals', 'Gestion de flux', 'Installations techniques', 'Scénographie événementielle'],
      link: '/contact'
    },
    {
      badge: 'Institutionnel',
      icon: Home,
      title: 'Projets Institutionnels',
      desc: 'Une maîtrise rigoureuse des protocoles officiels et des enjeux stratégiques des institutions publiques.',
      description: 'Cérémonies officielles, inaugurations et dispositifs protocolaires premium pour institutions',
      imageSrc: institutionnel,
      imageAlt: 'Cérémonie institutionnelle organisée par ÁLDÁS CI : inauguration officielle à Abidjan',
      list: ['Cérémonies officielles', 'Inaugurations', 'Gestion protocolaire', 'Dispositifs premium'],
      link: '/contact'
    }
  ], []);

  // ✅ Utiliser les items passés en props ou les défauts
  const poles = useMemo(() => items || defaultPoles, [items, defaultPoles]);

  // ✅ Détection prefers-reduced-motion pour accessibilité
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Couleurs personnalisées "Bleu Nuit" (mémoïsées)
  const colors = useMemo(() => ({
    title: '#0f172a',      // Slate 900
    text: '#334155',       // Slate 700
    list: '#1e293b',       // Slate 800
    accent: '#21650e',     // Accent vert
    iconBg: '#f1f5f9',     // Slate 100
  }), []);

  // ✅ Gestionnaire de clic pour tracking optionnel
  const handlePoleLinkClick = useCallback((poleTitle: string) => {
    console.log(`📊 Pôle clicked: ${poleTitle}`);
    // Laisser le lien naviguer normalement
  }, []);

  // ✅ Helper pour générer un ID unique par pôle
  const getPoleId = useCallback((index: number) => `${id}-pole-${index}`, [id]);

  return (
    // ✅ Section sémantique avec ARIA et Schema.org
    <motion.section
      id={id}
      className={`py-10 md:py-14 bg-white relative overflow-hidden ${className}`}
      role="region"
      aria-labelledby={`${id}-heading`}
      aria-label={ariaLabel}
      // Animation d'apparition de la section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >

      {/* Titre H2 pour SEO (sr-only car visuellement géré par les cartes) */}
      <h2 
        id={`${id}-heading`} 
        className="sr-only"
        itemProp="name"
      >
        {sectionTitle}
      </h2>
      
      {/* Déco fond subtile - décorative donc aria-hidden */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-2 max-w-7xl relative z-10 space-y-5 md:space-y-10">
        
        {/* Grille des pôles avec animations en cascade */}
        <motion.div
          className="space-y-8 md:space-y-12"
          role="list"
          aria-label={`Liste des ${poles.length} pôles d'expertise événementielle`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {poles.map((pole, index) => {
            const isReverse = index % 2 !== 0;
            const poleId = getPoleId(index);
            // Texte sans HTML pour Schema.org
            const plainDesc = pole.desc.replace(/<[^>]*>/g, '');
            
            return (
              <motion.article
                key={pole.title}
                id={poleId}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 ${isReverse ? 'md:flex-row-reverse' : ''}`}
                role="listitem"
                variants={itemVariants}
                // Microdata Schema.org pour chaque pôle
                itemScope
                itemType="https://schema.org/Service"
                // ARIA pour accessibilité
                aria-labelledby={`${poleId}-title`}
                aria-describedby={`${poleId}-desc`}
              >
                {/* Meta Schema.org */}
                <meta itemProp="name" content={pole.title} />
                <meta itemProp="description" content={plainDesc} />
                <meta itemProp="serviceType" content={`Événementiel - ${pole.badge}`} />
                <meta itemProp="areaServed" content="Abidjan, Côte d'Ivoire" />
                {pole.link && (
                  <link itemProp="url" href={`https://www.aldas-ci.com${pole.link}?pole=${encodeURIComponent(pole.badge)}`} />
                )}
                
                {/* --- COLONNE IMAGE --- */}
                <motion.div 
                  className="w-full md:w-1/2 relative group shrink-0"
                  variants={imageVariants}
                >
                  {/* Cadre Dégradé Animé Subtil */}
                  <div 
                    className="relative p-[3px] rounded-[16px] md:rounded-[20px] shadow-md transition-shadow duration-500 group-hover:shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #3b82f6, #14b8a6)',
                      backgroundSize: '200% 200%',
                      animation: prefersReducedMotion ? 'none' : 'gradient-shift 8s ease infinite'
                    }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[3px] bg-white rounded-[14px] md:rounded-[18px] z-10" aria-hidden="true" />
                    
                    <img 
                      src={pole.imageSrc}
                      alt={pole.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                      className="relative z-20 w-full h-[240px] md:h-[300px] object-cover rounded-[12px] md:rounded-[16px] transition-transform duration-700 ease-out group-hover:scale-105 focus:scale-105"
                      itemProp="image"
                    />
                  </div>
                </motion.div>

                {/* --- COLONNE TEXTE --- */}
                <motion.div 
                  className="w-full md:w-1/2 flex flex-col justify-center mt-4 md:mt-0 text-left"
                  variants={textVariants}
                >
                  
                  {/* En-tête : Badge + Bouton */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    
                    {/* BADGE */}
                    <span 
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-slate-200 bg-slate-50 whitespace-nowrap"
                      style={{ color: colors.text }}
                      itemProp="serviceType"
                    >
                      <Sparkles size={10} className="text-emerald-600" aria-hidden="true" />
                      {pole.badge}
                    </span>

                    {/* BOUTON OUTLINE */}
                    {pole.link && (
                      <a 
                        href={pole.link}
                        onClick={() => handlePoleLinkClick(pole.title)}
                        className="group inline-flex items-center gap-2 px-4 py-2 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest border-2 rounded-lg md:rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        style={{ 
                          borderColor: colors.accent, 
                          color: colors.accent 
                        }}
                        onMouseEnter={(e) => {
                          if (!prefersReducedMotion) {
                            e.currentTarget.style.backgroundColor = colors.accent;
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!prefersReducedMotion) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.accent;
                          }
                        }}
                        title={`Demander un devis pour ${pole.title}`}
                        aria-label={`Demander un devis pour le service ${pole.title} - ${pole.badge}`}
                        itemProp="url"
                      >
                        Obtenir un devis
                        <motion.span
                          aria-hidden="true"
                          animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </a>
                    )}
                  </div>

                  {/* Titre avec ID pour aria-labelledby */}
                  <motion.h3 
                    id={`${poleId}-title`}
                    className="font-bold mb-4 md:mb-5 flex items-center gap-3 text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight"
                    style={{ color: colors.title }}
                    itemProp="name"
                  >
                    <div 
                      className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl" 
                      style={{ backgroundColor: colors.iconBg }}
                      aria-hidden="true"
                    >
                      <pole.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} style={{ color: colors.title }} />
                    </div>
                    {pole.title}
                  </motion.h3>

                  {/* Description avec ID pour aria-describedby */}
                  <motion.p 
                    id={`${poleId}-desc`}
                    className="mb-6 text-sm md:text-base leading-relaxed font-light max-w-xl"
                    style={{ color: colors.text }}
                    itemProp="description"
                  >
                    {pole.desc}
                  </motion.p>

                  {/* Liste des services avec microdata */}
                  <ul 
                    className="list-none p-0 m-0 space-y-2.5 mb-8" 
                    role="list"
                    aria-label={`Services inclus dans ${pole.title}`}
                  >
                    {pole.list.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2.5 text-sm md:text-base font-medium group/list"
                        style={{ color: colors.list }}
                        role="listitem"
                        // Animation en cascade pour chaque item
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.1 + (i * 0.05) }}
                      >
                        <CheckCircle 
                          className="shrink-0 mt-0.5" 
                          size={16} 
                          strokeWidth={2.5} 
                          style={{ color: '#10b981' }} 
                          aria-hidden="true" 
                        />
                        <span className="transition-colors duration-300 group-hover/list:text-emerald-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* ✅ Styles CSS pour animations et accessibilité */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Focus visible pour navigation clavier */
        a:focus, button:focus {
          outline: 2px solid #06b6d4;
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
          .group-hover\\:scale-105:hover {
            transform: none !important;
          }
          .group-hover\\:translate-x-1 {
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default PolesSection;