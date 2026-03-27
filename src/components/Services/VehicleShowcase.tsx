// src/components/Services/VehicleShowcase.tsx
import { useMemo, useCallback, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import { carsData } from '../../data/carsData';
import VehicleCard from './VehicleCard';

// --- TYPES ---
interface CarData {
  id: string | number;
  code: string;
  brand: string;
  name: string;
  price: number;
  seats: number;
  doors: number;
  transmission: 'A' | 'M';
  luggage: number;
  image: string;
  category?: string;
}

// --- UTILITAIRE DE MÉLANGE (mémoïsé) ---
const shuffleArray = (array: CarData[]): CarData[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- ID UNIQUE POUR L'ACCESSIBILITÉ ---
const SHOWCASE_ID = 'vehicle-showcase-carousel';

const VehicleShowcase = () => {
  // ✅ Véhicules aléatoires mémoïsés (évite les re-renders)
  const randomCars = useMemo(() => shuffleArray(carsData).slice(0, 6), []);
  
  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Référence pour l'annonce ARIA live
  const announcementRef = useRef<HTMLDivElement>(null);

  // ✅ Gestionnaire de changement de slide pour annonces accessibles
  const handleSlideChange = useCallback((swiper: any) => {
    if (announcementRef.current) {
      const currentIndex = swiper.realIndex + 1;
      const totalSlides = randomCars.length + 1; // +1 pour le slide "Catalogue"
      const carName = randomCars[swiper.realIndex]?.name || 'Catalogue complet';
      announcementRef.current.textContent = `Véhicule ${currentIndex} sur ${totalSlides} : ${carName}`;
    }
  }, [randomCars]);

  // ✅ Gestionnaire de focus pour navigation clavier
  const handleNavKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, direction: 'prev' | 'next') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Déclencher le clic du bouton de navigation Swiper
      const navButton = document.querySelector(direction === 'prev' 
        ? '.swiper-button-prev-custom' 
        : '.swiper-button-next-custom'
      ) as HTMLButtonElement;
      navButton?.click();
    }
  }, []);

  // ✅ Schema.org JSON-LD pour le showcase de véhicules
  const showcaseSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `https://www.aldas-ci.com/services/mobilite#${SHOWCASE_ID}`,
    name: 'Sélection de véhicules premium ÁLDÁS',
    description: 'Découvrez notre sélection de véhicules de location premium disponibles immédiatement à Abidjan',
    itemListElement: randomCars.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Car',
        name: `${car.brand} ${car.name}`,
        description: `Location de ${car.brand} ${car.name} à Abidjan`,
        offers: {
          '@type': 'Offer',
          price: car.price,
          priceCurrency: 'XOF',
          availability: 'https://schema.org/InStock'
        },
        seatingCapacity: car.seats,
        vehicleTransmission: car.transmission === 'A' ? 'Automatic' : 'Manual'
      }
    }))
  }), [randomCars]);

  // ✅ Bloquer le scroll horizontal du body pendant le swipe (mobile)
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const showcase = document.getElementById(SHOWCASE_ID);
      if (showcase?.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return (
    // ✅ Section sémantique avec ARIA et Schema.org
    <section 
      id={SHOWCASE_ID}
      className="w-full py-10 bg-transparent overflow-hidden"
      role="region"
      aria-labelledby={`${SHOWCASE_ID}-heading`}
      aria-roledescription="carousel"
      aria-label="Carrousel de véhicules premium disponibles à la location"
    >
      {/* ✅ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseSchema) }}
      />
      
      {/* ✅ Titre H2 pour SEO et accessibilité */}
      <h2 
        id={`${SHOWCASE_ID}-heading`} 
        className="sr-only"
      >
        Sélection de véhicules premium ÁLDÁS
      </h2>
      
      {/* ✅ Annonce dynamique pour lecteurs d'écran */}
      <div 
        ref={announcementRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        id={`${SHOWCASE_ID}-announcement`}
      />

      <div className="container mx-auto px-0 md:px-4 relative z-10">
        
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y]}
          spaceBetween={24}
          slidesPerView={'auto'}
          centeredSlides={false}
          loop={false}
          freeMode={true}
          resistanceRatio={0.85}
          slidesOffsetBefore={20}
          slidesOffsetAfter={40}
          navigation={{ 
            nextEl: '.swiper-button-next-custom', 
            prevEl: '.swiper-button-prev-custom' 
          }}
          pagination={{ 
            clickable: true, 
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            enabled: true,
            slideLabelMessage: 'Véhicule {{index}} sur {{slides}} : {{slide}}',
            prevSlideMessage: 'Véhicule précédent',
            nextSlideMessage: 'Véhicule suivant',
            firstSlideMessage: 'Premier véhicule',
            lastSlideMessage: 'Dernier véhicule',
            paginationBulletMessage: 'Aller au véhicule {{index}}',
          }}
          breakpoints={{
            320: { slidesOffsetBefore: 15, spaceBetween: 16 },
            768: { slidesOffsetBefore: 30, spaceBetween: 24 },
            1024: { slidesOffsetBefore: 50, spaceBetween: 30 },
          }}
          className="pb-16 !overflow-visible"
          onSlideChange={handleSlideChange}
          // ✅ Désactiver le drag si reduced-motion
          allowTouchMove={!prefersReducedMotion}
          // ✅ Ralentir la vitesse si reduced-motion
          speed={prefersReducedMotion ? 0 : 300}
        >
          {/* Slides Voitures */}
          {randomCars.map((car, index) => (
            <SwiperSlide 
              key={car.id} 
              className="!w-auto !max-w-[340px] md:!max-w-[360px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Véhicule ${index + 1} : ${car.brand} ${car.name}, ${car.price} FCFA par jour`}
            >
              {/* VehicleCard avec props d'accessibilité */}
              <VehicleCard 
                car={car} 
                variant="slider"
                // Props ARIA supplémentaires si VehicleCard les supporte
                ariaLabel={`Réserver ${car.brand} ${car.name} à ${new Intl.NumberFormat('fr-FR').format(car.price)} FCFA par jour`}
              />
            </SwiperSlide>
          ))}

          {/* Slide Spéciale "Catalogue" */}
          <SwiperSlide 
            className="!w-auto !max-w-[340px] md:!max-w-[360px]"
            role="group"
            aria-roledescription="slide"
            aria-label="Dernier élément : Voir tout le catalogue de véhicules"
          >
            <a 
              href="/services/catalogue" 
              className="block w-full h-[440px] bg-gradient-to-br from-[#00d2ff] to-[#0056b3] rounded-[22px] flex flex-col items-center justify-center text-center p-6 shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-4 focus:ring-offset-[#0056b3]"
              aria-label="Voir tout le catalogue de véhicules de location ÁLDÁS - Accéder à la page catalogue"
            >
               <div 
                 className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                 aria-hidden="true"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
               </div>
               <h3 className="text-xl font-extrabold text-white mb-2">Voir tout le catalogue</h3>
               <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-blue-900 font-bold rounded-full text-xs group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                 Explorer 
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
                   <path d="M5 12h14M12 5l7 7-7 7"/>
                 </svg>
               </span>
            </a>
          </SwiperSlide>
        </Swiper>

        {/* Contrôles avec accessibilité complète */}
        <div 
          className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 max-w-5xl mx-auto px-4"
          role="navigation"
          aria-label={`Navigation du carrousel de véhicules - ${randomCars.length + 1} éléments`}
        >
          {/* Pagination accessible */}
          <div 
            className="swiper-pagination-custom flex items-center gap-[6px]"
            role="tablist"
            aria-label="Pages du carrousel de véhicules"
          >
            {/* Les bullets sont générés par Swiper avec aria attributes */}
          </div>
          
          {/* Boutons de navigation */}
          <div className="flex gap-3">
            <button 
              className="swiper-button-prev-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b0f14]"
              aria-label="Véhicule précédent dans le carrousel"
              aria-controls={SHOWCASE_ID}
              onKeyDown={(e) => handleNavKeyDown(e, 'prev')}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span className="sr-only">Précédent</span>
            </button>
            
            <button 
              className="swiper-button-next-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b0f14]"
              aria-label="Véhicule suivant dans le carrousel"
              aria-controls={SHOWCASE_ID}
              onKeyDown={(e) => handleNavKeyDown(e, 'next')}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"/>
              </svg>
              <span className="sr-only">Suivant</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Pagination bullets accessibles */
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 50%;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
          transform: scale(1.2);
        }
        .swiper-pagination-bullet:focus {
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
          .group-hover\\:scale-110:hover,
          .group-hover\\:rotate-12:hover,
          .hover\\:scale-110:hover {
            transform: none !important;
          }
        }
        
        /* Focus visible pour navigation clavier */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
        
        /* Masquer visuellement mais garder accessible */
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

export default VehicleShowcase;