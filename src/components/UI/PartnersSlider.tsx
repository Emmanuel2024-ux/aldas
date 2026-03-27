// src/components/UI/PartnersSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { motion, type Variants } from 'framer-motion'; // ✅ Import Variants pour le typage
import { useMemo, useCallback } from 'react';
import 'swiper/swiper-bundle.css';

import SectionHeaderCentered from './SectionHeaderCenter';

// --- TYPES ---
export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  description?: string;
}

// --- DONNÉES DES PARTENAIRES ---
export const partnersData: Partner[] = [
  { id: 'partner-0', name: 'Partenaire 1', logo: '/images/partners/a.jpg', description: 'Partenaire stratégique ÁLDÁS' },
  { id: 'partner-1', name: 'Partenaire 2', logo: '/images/partners/b.jpg', description: 'Collaborateur premium' },
  { id: 'partner-2', name: 'Partenaire 3', logo: '/images/partners/c.jpg', description: 'Partenaire de confiance' },
  { id: 'partner-3', name: 'Partenaire 4', logo: '/images/partners/d.png', description: 'Allié stratégique' },
  { id: 'partner-4', name: 'Partenaire 5', logo: '/images/partners/e.jpg', description: 'Partenaire exclusif' },
  { id: 'partner-5', name: 'Partenaire 6', logo: '/images/partners/f.png', description: 'Collaborateur certifié' },
  { id: 'partner-6', name: 'Partenaire 7', logo: '/images/partners/g.jpg', description: 'Partenaire privilégié' },
  { id: 'partner-7', name: 'Partenaire 8', logo: '/images/partners/h.png', description: 'Allié de longue date' },
  { id: 'partner-8', name: 'Partenaire 9', logo: '/images/partners/i.jpg', description: 'Partenaire international' },
  { id: 'partner-9', name: 'Partenaire 10', logo: '/images/partners/j.png', description: 'Collaborateur local' },
  { id: 'partner-10', name: 'Partenaire 11', logo: '/images/partners/k.jpg', description: 'Partenaire événementiel' },
  { id: 'partner-11', name: 'Partenaire 12', logo: '/images/partners/l.jpg', description: 'Partenaire mobilité' },
];

// ✅ VARIANTES TYÉES CORRECTEMENT
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
      mass: 0.1,
    },
  },
};

// ✅ Variante hover séparée (utilisée directement, pas via variants)
const hoverEffect = {
  scale: 1.1,
  filter: 'grayscale(0%)',
  opacity: 1,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
} as const;

interface PartnersSliderProps {
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  id?: string;
}

const PartnersSlider = ({ 
  title = 'Ils nous font confiance',
  subtitle = 'Découvrez les entreprises et organisations qui nous font confiance pour leurs besoins.',
  ariaLabel = 'Carrousel des partenaires de confiance d\'ÁLDÁS CI',
  id = 'partenaires-slider'
}: PartnersSliderProps) => {
  
  const partners = useMemo(() => partnersData, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80" viewBox="0 0 150 80"%3E%3Crect fill="%23f1f5f9" width="150" height="80"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="12" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ELogo%3C/text%3E%3C/svg%3E';
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <motion.section
      id={id}
      className="py-16 bg-gray-50 relative overflow-hidden"
      role="region"
      aria-label={ariaLabel}
      aria-labelledby={`${id}-heading`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        
        <SectionHeaderCentered
          badge="Partenaires"
          title={title}
          description={subtitle}
          id={`${id}-heading`}
          headingLevel={2}
          className="mb-8"
        />

        <div 
          className="w-full max-w-7xl mt-12 mx-auto"
          role="list"
          aria-label="Liste des logos de nos partenaires"
        >
          <Swiper
            modules={[Autoplay, Keyboard, A11y]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            a11y={{
              enabled: true,
              slideLabelMessage: 'Logo partenaire {{index}} sur {{slides}}',
              prevSlideMessage: 'Partenaire précédent',
              nextSlideMessage: 'Partenaire suivant',
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              576: { slidesPerView: 3, spaceBetween: 25 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              992: { slidesPerView: 5, spaceBetween: 35 },
              1200: { slidesPerView: 6, spaceBetween: 40 },
            }}
            className="pb-8"
            onSlideChange={(swiper) => {
              const announcement = document.getElementById(`${id}-announcement`);
              if (announcement) {
                announcement.textContent = `Partenaire ${swiper.realIndex + 1} sur ${partners.length}`;
              }
            }}
          >
            <div 
              id={`${id}-announcement`} 
              className="sr-only" 
              aria-live="polite" 
              aria-atomic="true"
            />

            {partners.map((partner) => (
              <SwiperSlide key={partner.id} className="flex justify-center items-center h-24 md:h-32">
                <motion.div
                  className="group relative w-full h-full flex items-center justify-center p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-gray-50 rounded-xl"
                  role="listitem"
                  // ✅ Variantes pour l'apparition
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  // ✅ Hover : objet direct OU undefined (pas de référence à une variante non déclarée)
                  whileHover={prefersReducedMotion ? undefined : hoverEffect}
                  // ✅ Focus visible
                  whileFocus={{ scale: 1.05, boxShadow: '0 0 0 3px rgba(6,182,212,0.3)' }}
                  transition={{ duration: 0.3 }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (partner.url) window.open(partner.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  title={`${partner.name}${partner.description ? ` - ${partner.description}` : ''}`}
                >
                  <img
                    src={partner.logo}
                    alt={`Logo de ${partner.name}${partner.description ? `, ${partner.description}` : ''}, partenaire d'ÁLDÁS CI`}
                    loading="lazy"
                    decoding="async"
                    width={60}
                    height={60}
                    className="max-h-full max-w-full object-contain transition-all duration-300 ease-out filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 drop-shadow-sm group-hover:drop-shadow-md"
                    onError={handleImageError}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-aldas/5 rounded-xl opacity-0 group-hover:opacity-100 -z-10 blur-xl pointer-events-none"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {partner.url && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="absolute inset-0 z-10"
                      aria-label={`Visiter le site de ${partner.name}`}
                      tabIndex={-1}
                    />
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'ÁLDÁS CI',
              'knowsAbout': 'Partenariats stratégiques',
              'partner': partners.map(p => ({
                '@type': 'Organization',
                'name': p.name,
                'description': p.description,
                'url': p.url,
                'logo': `https://www.aldas-ci.com${p.logo}`
              }))
            })
          }}
        />
      </div>

      <style>{`
        .swiper-slide:focus-within {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
          border-radius: 0.75rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .swiper-slide,
          .swiper-slide img {
            transition: none !important;
            animation: none !important;
          }
          .group:hover img {
            transform: none !important;
            filter: grayscale(100%) !important;
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </motion.section>
  );
};

export default PartnersSlider;