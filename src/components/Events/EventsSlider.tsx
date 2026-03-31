// src/components/Events/EventSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y } from 'swiper/modules';
import { useMemo, useCallback, useEffect } from 'react';
import { 
  Star, Users, Lightbulb, ShieldCheck, Rocket, ThumbsUp, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import fixeSlide from '../../assets/images/events/fixe-slide.jpeg';
import 'swiper/swiper-bundle.css';

// --- TYPES ---
export interface SlideData {
  icon: LucideIcon;
  title: string;
  text: string;
  description?: string;
}

export interface EventSliderProps {
  slides?: SlideData[];
  backgroundImage?: string;
  id?: string;
  ariaLabel?: string;
}

// --- DONNÉES PAR DÉFAUT ---
const defaultSlides: SlideData[] = [
  { 
    icon: Star, 
    title: "Excellence Opérationnelle", 
    text: "Une gestion millimétrée de chaque étape pour garantir une réalisation sans faille.",
    description: "Organisation événementielle avec suivi rigoureux et exécution parfaite"
  },
  { 
    icon: Users, 
    title: "Accompagnement Sur-Mesure", 
    text: "Une équipe dédiée à votre écoute pour concevoir des solutions parfaitement adaptées.",
    description: "Conciergerie événementielle personnalisée pour particuliers et entreprises"
  },
  { 
    icon: Lightbulb, 
    title: "Créativité & Innovation", 
    text: "Des concepts originaux et des idées fortes pour amplifier l'impact de vos projets.",
    description: "Scénographie innovante et concepts événementiels uniques"
  },
  { 
    icon: ShieldCheck, 
    title: "Fiabilité & Sécurité", 
    text: "Des dispositifs rigoureux, conformes et sécurisés, adaptés aux exigences les plus élevées.",
    description: "Sécurité événementielle et conformité réglementaire garanties"
  },
  { 
    icon: Rocket, 
    title: "Réactivité & Performance", 
    text: "Une capacité d'action rapide, même sur des projets complexes ou en délais serrés.",
    description: "Organisation événementielle en urgence avec résultats garantis"
  },
  { 
    icon: ThumbsUp, 
    title: "Satisfaction Garantie", 
    text: "Une expérience client premium, reconnue et appréciée par nos partenaires.",
    description: "Témoignages clients et retours d'expérience positifs"
  },
];

const EventSlider = ({ 
  slides = defaultSlides, 
  backgroundImage,
  id = 'event-slider-section',
  ariaLabel = 'Carrousel des valeurs et expertises d\'ÁLDÁS en organisation d\'événements'
}: EventSliderProps) => {
  
  const memoizedSlides = useMemo(() => slides, [slides]);
  
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Gestionnaire de changement de slide pour annonces ARIA
  const handleSlideChange = useCallback((swiper: { realIndex: number }) => {
    const announcement = document.getElementById(`${id}-announcement`);
    if (announcement) {
      const currentSlide = memoizedSlides[swiper.realIndex];
      announcement.textContent = `Slide ${swiper.realIndex + 1} sur ${memoizedSlides.length} : ${currentSlide?.title}`;
    }
  }, [memoizedSlides, id]);

  // ✅ Schema.org JSON-LD
  const sliderSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `https://www.aldas-ci.com/services/evenements#${id}`,
    name: 'Valeurs et expertises ÁLDÁS Événementiel',
    description: 'Nos engagements qualité en organisation d\'événements premium à Abidjan',
    itemListElement: memoizedSlides.map((slide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: slide.title,
        description: slide.description || slide.text,
        serviceType: 'Organisation événementielle',
        areaServed: 'Abidjan, Côte d\'Ivoire'
      }
    }))
  }), [memoizedSlides, id]);

  // ✅ Gestion du touch pour éviter les conflits de scroll
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const slider = document.getElementById(id);
      if (slider?.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, [id]);

  // ✅ Calcul dynamique du clipPath pour l'espace triangulaire
  const getTriangleClipPath = useCallback((side: 'left' | 'right') => {
    const triangleSize = 'clamp(80px, 10vw, 105px)';
    if (side === 'left') {
      // Forme originale du panneau gauche
      return `polygon(0 0, calc(100% - ${triangleSize}) 0, 100% 50%, calc(100% - ${triangleSize}) 100%, 0 100%)`;
    } else {
      // Forme INVERSE pour le panneau droit (comble l'espace triangulaire)
      return `polygon(${triangleSize} 0, 100% 0, 100% 100%, ${triangleSize} 100%, 0 50%)`;
    }
  }, []);

  return (
    <section 
      id={id}
      className="slider-container my-4 md:my-8 w-full max-w-7xl mx-auto px-2 md:px-4"
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sliderSchema) }}
      />
      
      {/* Annonce sr-only pour lecteurs d'écran */}
      <div 
        id={`${id}-announcement`} 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* Container principal */}
      <div 
        className="dual-slider relative w-full overflow-hidden bg-white rounded-none md:rounded-2xl shadow-lg md:shadow-xl"
        style={{ 
          height: 'clamp(280px, 45vh, 400px)',
          isolation: 'isolate'
        }}
      >
        
        {/* === PANNEAU DROITE : IMAGE FIXE === */}
        <div 
          className="right-panel absolute inset-0 md:inset-auto md:absolute md:top-0 md:right-0 md:w-2/5 md:h-full overflow-hidden z-10"
          aria-hidden="true"
          // ✅ Clip-path complémentaire pour combler l'espace triangulaire
          style={{
            clipPath: getTriangleClipPath('right')
          }}
        >
          <img 
            src={backgroundImage || fixeSlide} 
            alt="Événement premium organisé par ÁLDÁS CI à Abidjan" 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
          />
          {/* Overlay dégradé pour lisibilité */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"
          />
          
          {/* Pagination */}
          <div 
            className="swiper-pagination absolute bottom-3 md:bottom-4 right-3 md:right-4 z-50"
            role="tablist"
            aria-label="Navigation des slides du carrousel"
          />
        </div>

        {/* === PANNEAU GAUCHE : TEXTE SLIDER === */}
        <div 
          className="left-panel absolute inset-0 md:inset-auto md:absolute md:top-0 md:left-0 md:w-3/5 md:h-full bg-[#dfdfdf] z-20 flex items-center"
          style={{
            clipPath: getTriangleClipPath('left'),
          }}
        >
          {/* ✅ Swiper gère seul l'effet fade - PAS de AnimatePresence/Framer Motion ici */}
          <Swiper
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            autoplay={prefersReducedMotion ? false : { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={900}
            keyboard={{ enabled: true, onlyInViewport: true }}
            modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y]}
            navigation={{
              nextEl: `#${id}-next`,
              prevEl: `#${id}-prev`,
            }}
            pagination={{ 
              el: `#${id} .swiper-pagination`, 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            className="w-full h-full"
            a11y={{
              enabled: true,
              slideLabelMessage: 'Valeur {{index}} sur {{slides}} : {{slide}}',
              prevSlideMessage: 'Valeur précédente',
              nextSlideMessage: 'Valeur suivante',
            }}
            onSlideChange={handleSlideChange}
            allowTouchMove={false}
          >
            {memoizedSlides.map((s, idx) => (
              <SwiperSlide key={idx} className="swiper-slide flex items-center h-full">
                {/* ✅ Contenu simple - l'animation fade est gérée par Swiper CSS */}
                <div className="slide-content-inner flex flex-col gap-2 md:gap-3 px-4 md:px-6 lg:px-8 py-4 md:py-6">
                  
                  {/* Icône */}
                  <div className="flex items-center justify-start mb-1 md:mb-2">
                    <s.icon 
                      size={32} 
                      className="md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#174F44]" 
                      strokeWidth={1.5} 
                      aria-hidden="true"
                    />
                  </div>
                  
                  {/* Titre */}
                  <h3 
                    className="font-bold text-[#111] leading-tight tracking-tight"
                    style={{ 
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      lineHeight: '1.3'
                    }}
                  >
                    {s.title}
                  </h3>
                  
                  {/* Texte */}
                  <p 
                    className="text-[#555] font-light leading-relaxed"
                    style={{ 
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      lineHeight: '1.5',
                      maxWidth: '90%'
                    }}
                  >
                    {s.text}
                  </p>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* === BOUTONS DE NAVIGATION - Z-INDEX ÉLEVÉ === */}
        <button 
          id={`${id}-prev`}
          className="custom-prev swiper-button-prev absolute top-1/2 left-2 md:left-4 z-50 
                     w-8 h-8 md:w-10 md:h-10 
                     bg-white/90 hover:bg-white 
                     border-2 border-[#174F44]/30 hover:border-[#174F44]
                     rounded-lg md:rounded-xl 
                     flex items-center justify-center 
                     text-[#174F44] hover:text-[#174F44]
                     shadow-lg hover:shadow-xl
                     transition-all duration-200 ease-out
                     focus:outline-none focus:ring-2 focus:ring-[#174F44] focus:ring-offset-2 focus:ring-offset-white
                     backdrop-blur-sm
                     group"
          aria-label="Valeur précédente du carrousel"
          type="button"
        >
          <ChevronLeft 
            size={18} 
            className="md:w-5 md:h-5 transform group-hover:-translate-x-0.5 transition-transform" 
            aria-hidden="true" 
          />
          <span className="sr-only">Précédent</span>
        </button>

        <button 
          id={`${id}-next`}
          className="custom-next swiper-button-next absolute top-1/2 right-2 md:right-4 z-50 
                     w-8 h-8 md:w-10 md:h-10 
                     bg-white/90 hover:bg-white 
                     border-2 border-[#174F44]/30 hover:border-[#174F44]
                     rounded-lg md:rounded-xl 
                     flex items-center justify-center 
                     text-[#174F44] hover:text-[#174F44]
                     shadow-lg hover:shadow-xl
                     transition-all duration-200 ease-out
                     focus:outline-none focus:ring-2 focus:ring-[#174F44] focus:ring-offset-2 focus:ring-offset-white
                     backdrop-blur-sm
                     group"
          aria-label="Valeur suivante du carrousel"
          type="button"
        >
          <ChevronRight 
            size={18} 
            className="md:w-5 md:h-5 transform group-hover:translate-x-0.5 transition-transform" 
            aria-hidden="true" 
          />
          <span className="sr-only">Suivant</span>
        </button>

      </div>

      {/* ✅ Styles CSS pour animations, pagination et responsive */}
      <style>{`
        /* === ANIMATION FADE GÉRÉE PAR SWIPER + CSS === */
        .swiper-slide {
          opacity: 0;
          transition: opacity ${prefersReducedMotion ? '0s' : '0.6s'} ease-out;
          pointer-events: none;
        }
        .swiper-slide-active {
          opacity: 1;
          pointer-events: auto;
          z-index: 10;
        }
        .swiper-slide .slide-content-inner {
          transform: translateY(20px);
          transition: transform ${prefersReducedMotion ? '0s' : '0.6s'} ease-out;
        }
        .swiper-slide-active .slide-content-inner {
          transform: translateY(0);
        }

        /* === PAGINATION === */
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.85);
          opacity: 1;
          border: 2px solid #174F44;
          transition: all 0.3s ease;
          margin: 0 3px !important;
        }
        .swiper-pagination-bullet-active {
          background: #174F44;
          transform: scale(1.1);
        }
        .swiper-pagination-bullet:hover {
          background: rgba(23, 79, 68, 0.3);
        }
        .swiper-pagination-bullet:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        /* === HOVER IMAGE === */
        @media (prefers-reduced-motion: no-preference) {
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
        }

        /* === RESPONSIVE MOBILE (< 768px) === */
        @media (max-width: 767px) {
          .dual-slider {
            height: auto !important;
            border-radius: 16px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .right-panel {
            position: relative !important;
            width: 100% !important;
            height: 200px !important;
            order: 1;
            clip-path: none !important; /* Supprime la forme triangulaire sur mobile */
          }
          .left-panel {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            clip-path: none !important;
            padding: 20px 16px !important;
            order: 2;
            background: #f8fafc !important;
          }
          .custom-prev,
          .custom-next {
            top: auto !important;
            bottom: -12px !important;
            transform: none !important;
            left: 50% !important;
            right: auto !important;
            margin-left: -45px !important;
          }
          .custom-next {
            margin-left: 5px !important;
          }
          .swiper-pagination {
            position: static !important;
            margin-top: 8px;
            text-align: center;
          }
        }

        /* === RESPONSIVE TABLETTE (768px - 1023px) === */
        @media (min-width: 768px) and (max-width: 1023px) {
          .dual-slider {
            height: clamp(300px, 50vh, 380px);
          }
          .left-panel,
          .right-panel {
            width: 50% !important;
          }
          .left-panel {
            padding: 24px 20px !important;
          }
        }

        /* === REDUCED MOTION === */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }

        /* === FOCUS VISIBLE === */
        button:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        /* === SR-ONLY === */
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
    </section>
  );
};

export default EventSlider;