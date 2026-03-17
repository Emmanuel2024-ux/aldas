// src/components/Services/VehicleShowcase.tsx
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { carsData } from '../../data/carsData';
import VehicleCard from './VehicleCard'; // Import de la carte séparée

// Utilitaire de mélange
const shuffleArray = (array: any[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const VehicleShowcase = () => {
  const randomCars = useMemo(() => shuffleArray(carsData).slice(0, 6), []);

  return (
    <section className="w-full py-10 bg-transparent overflow-hidden">
      <div className="container mx-auto px-0 md:px-4 relative z-10">
        
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={'auto'}
          centeredSlides={false}
          loop={false}
          freeMode={true}
          resistanceRatio={0.85}
          slidesOffsetBefore={20}
          slidesOffsetAfter={40}
          navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
          pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
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
              className="!w-auto !max-w-[340px] md:!max-w-[360px]"
            >
              {/* Utilisation de la carte avec variant="slider" */}
              <VehicleCard car={car} variant="slider" />
            </SwiperSlide>
          ))}

          {/* Slide Spéciale "Catalogue" */}
          <SwiperSlide className="!w-auto !max-w-[340px] md:!max-w-[360px]">
             {/* Tu peux aussi créer un composant CatalogCard si besoin, ou laisser ce code inline */}
            <a href="/services/catalogue" className="block w-full h-[440px] bg-gradient-to-br from-[#00d2ff] to-[#0056b3] rounded-[22px] flex flex-col items-center justify-center text-center p-6 shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500 group">
               <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               </div>
               <h3 className="text-xl font-extrabold text-white mb-2">Voir tout le catalogue</h3>
               <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-blue-900 font-bold rounded-full text-xs group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">Explorer →</span>
            </a>
          </SwiperSlide>
        </Swiper>

        {/* Contrôles (Identiques) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 max-w-5xl mx-auto px-4">
          <div className="swiper-pagination-custom flex items-center gap-[6px]"></div>
          <div className="flex gap-3">
            <button className="swiper-button-prev-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="swiper-button-next-custom w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;