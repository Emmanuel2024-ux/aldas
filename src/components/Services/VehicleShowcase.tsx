// src/components/Services/VehicleShowcase.tsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, DoorOpen, Gauge, Luggage } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import { carsData } from '../../data/carsData';

// --- Fonctions Utilitaires ---

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

const shuffleArray = (array: any[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- Composant Principal ---

const VehicleShowcase = () => {
  // Sélectionner 6 voitures aléatoires
  const randomCars = useMemo(() => {
    return shuffleArray(carsData).slice(0, 6);
  }, []);

  return (
    <section className="py-12 w-full bg-transparent overflow-hidden">
      <div className="container mx-auto px-0 md:px-4 relative z-10">
        
        {/* SWIPER SLIDER */}
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24} // Espace optimisé entre les cartes
            slidesPerView={'auto'}
            centeredSlides={false}
            loop={false} // Stop net aux extrémités
            freeMode={true} // Scroll fluide naturel
            resistanceRatio={0.85} // Résistance élastique douce
            slidesOffsetBefore={20} // Marge gauche
            slidesOffsetAfter={40} // Marge droite
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ 
              clickable: true, 
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            breakpoints={{
              320: { slidesOffsetBefore: 15, spaceBetween: 16 },
              768: { slidesOffsetBefore: 30, spaceBetween: 24 },
              1024: { slidesOffsetBefore: 50, spaceBetween: 30 },
            }}
            className="pb-16 !overflow-visible" 
          >
            {/* Slides Voitures */}
            {randomCars.map((car) => (
              <SwiperSlide 
                key={car.id} 
                className="!w-260 !max-w-[340px] md:!max-w-[360px] flex justify-center"
              >
                <Link 
                  to={`/services/catalogue?clcx=${car.code}`}
                  className="block group h-full"
                >
                  <article className="car-card-showcase relative w-full h-[440px] rounded-[22px] overflow-hidden cursor-pointer border-[2.5px] border-white bg-[#15313D] transition-all duration-500 ease-out hover:shadow-[0_15px_30px_rgba(0,210,255,0.15)] hover:border-white/70">
                    
                    {/* 1. Effet de lumière (Projecteur Top-Right) */}
                    <div className="absolute top-0 right-0 w-[150%] h-[120%] bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.2)_15%,transparent_40%)] blur-[1px] rotate-[-10deg] pointer-events-none z-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Contenu */}
                    <div className="relative z-10 h-full flex flex-col">
                      
                      {/* Partie Haute : Lumière & Image */}
                      <div className="car-light relative pt-4 ps-4 pe-4 z-0 flex-grow">
                        
                        {/* Halo lumineux sous la voiture */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-[15px] pointer-events-none"></div>
                        
                        {/* Marque */}
                        <h5 className="text-[20px] font-extrabold text-white mb-3 relative z-10 drop-shadow-md tracking-wide uppercase opacity-90">
                          {car.brand}
                        </h5>

                        {/* Specs - Badges compacts */}
                        <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                          <span className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                            <Users size={14} className="text-white/70" /> {car.seats}
                          </span>
                          <span className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                            <DoorOpen size={14} className="text-white/70" /> {car.doors}
                          </span>
                          <span className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                            <Gauge size={14} className="text-white/70" /> {car.transmission === 'A' ? 'Auto' : 'Man'}
                          </span>
                          <span className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                            <Luggage size={14} className="text-white/70" /> {car.luggage}
                          </span>
                        </div>

                        {/* Image Véhicule - Ajustement Parfait */}
                        <div className="mt-4 mb-2 relative z-10 flex justify-center items-end h-[240px]">
                          <img 
                            src={car.image} 
                            alt={car.name} 
                            className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=Véhicule'; }}
                          />
                        </div>
                      </div>

                      {/* Partie Basse : Infos & Prix */}
                      <div className="p-5 mt-auto relative z-10 bg-gradient-to-t from-black/50 to-transparent rounded-b-[20px] border-t border-white/5">
                        <h6 className="text-white font-bold text-lg mb-1 truncate drop-shadow-md group-hover:text-[#00d2ff] transition-colors duration-300">
                          {car.name}
                        </h6>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[18px] font-extrabold text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
                            {formatPrice(car.price)}
                          </span>
                          <span className="text-[10px] text-white/50 font-medium uppercase">/ jour</span>
                        </div>
                      </div>

                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}

            {/* Slide Spéciale "Tout le catalogue" */}
            <SwiperSlide className="!w-auto !max-w-[340px] md:!max-w-[360px] flex justify-center">
              <Link 
                to="/services/catalogue"
                className="block w-full h-full min-h-[440px] flex items-center justify-center p-6 group"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#00d2ff] to-[#0056b3] rounded-[22px] flex flex-col items-center justify-center text-center p-6 shadow-2xl relative overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-500">
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-white mb-2 relative z-10 leading-tight">Voir tout le catalogue</h3>
                  <p className="text-white/90 text-xs mb-6 font-medium relative z-10">+{carsData.length} véhicules</p>
                  
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-blue-900 font-bold rounded-full text-xs group-hover:bg-blue-900 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-900/30 transition-all duration-300 transform group-hover:-translate-y-1 relative z-10">
                    Explorer
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            </SwiperSlide>

          </Swiper>

          {/* Contrôles Personnalisés */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 max-w-5xl mx-auto px-4">
            
            {/* Pagination (Points) */}
            <div className="swiper-pagination-custom flex items-center gap-[6px]"></div>

            {/* Boutons Nav */}
            <div className="flex gap-3">
              <button className="swiper-button-prev-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 hover:border-white transition-all duration-300 cursor-pointer shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="swiper-button-next-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 hover:border-white transition-all duration-300 cursor-pointer shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VehicleShowcase;