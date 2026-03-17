// src/components/Home/HeroSlider.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeSlides } from '../../data/homeData'; // Suppression de 'type Slide' car non utilisé directement

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  // Suppression de 'direction' car non utilisé dans cette version
  const [isHovering, setIsHovering] = useState(false);

  // Autoplay avec pause au survol
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [current, isHovering]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === homeSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? homeSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const slide = homeSlides[current];
  const isRight = slide.align === 'right';

  return (
    <section 
      className="relative w-full h-[96vh] min-h-[600px] overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* --- BACKGROUND SLIDER (Effet Ken Burns) --- */}
      <div className="absolute inset-0 w-full h-full">
        {homeSlides.map((s, index) => {
          const isActive = index === current;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${
                  isActive ? 'scale-100' : 'scale-110'
                }`}
                style={{ backgroundImage: `url(${s.bg})` }}
              >
                {/* Overlay Dégradé Intelligent */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  isRight 
                    ? 'from-black/10 via-black/40 to-black/80' 
                    : 'from-black/80 via-black/40 to-black/10'
                }`}></div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- CONTENU DU SLIDE (Zone de 50%) --- */}
      <div className={`
        absolute top-20 bottom-0 z-20 flex flex-col justify-center
        w-full md:w-[50%] lg:w-[60%]
        transition-all duration-700 ease-out
        ${isRight ? 'right-0 items-end' : 'left-0 items-start'}
      `}>
        
        {/* Conteneur interne avec Padding responsive */}
        <div className={`
          relative w-full max-w-3xl
          animate-slide-in-${isRight ? 'right' : 'left'}
        `}>
          
          {/* Carte "Glass" optimisée */}
          <div 
            key={current}
            className={`
              relative p-6 sm:p-8 rounded-2xl 
              backdrop-blur-md border border-white/10 shadow-2xl
              transform transition-all duration-1000 delay-200 ease-out
              hover:border-white/20
              ${isRight 
                ? 'bg-gradient-to-l from-black/90 via-black/70 to-black/50' 
                : 'bg-gradient-to-r from-black/90 via-black/70 to-black/50'}
            `}
          >
            {/* Tagline */}
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-aldas/20 text-aldas-light border border-aldas/30 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-fade-in-up">
              {slide.tagline}
            </span>

            {/* Titre */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg animate-fade-in-up delay-100">
              {slide.title}
            </h1>

            {/* Description */}
            <div className="max-h-[40vh] overflow-y-auto custom-scrollbar mb-6 sm:mb-8 animate-fade-in-up delay-200">
              <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed opacity-95">
                {slide.desc}
              </p>
            </div>

            {/* Bouton d'action */}
            <Link 
              to={slide.link}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded-full transition-all duration-300 hover:bg-aldas hover:text-white hover:pl-10 hover:pr-6 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-fade-in-up delay-300 whitespace-nowrap"
            >
              <span>{slide.align === 'right' ? 'En savoir plus' : 'Découvrir'}</span>
              {/* CORRECTION ICI : Utilisation de classes Tailwind pour la taille responsive au lieu de props invalides */}
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION (Flèches) --- */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500 hover:bg-aldas hover:border-aldas hover:scale-110 hidden md:flex items-center justify-center"
        aria-label="Précédent"
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0 transition-all duration-500 hover:bg-aldas hover:border-aldas hover:scale-110 hidden md:flex items-center justify-center"
        aria-label="Suivant"
      >
        <ChevronRight size={28} strokeWidth={2.5} />
      </button>

      {/* --- PAGINATION (Dots) --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4 p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
        {homeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`relative h-1.5 rounded-full transition-all duration-500 ease-out overflow-hidden ${
              idx === current ? 'w-12 bg-aldas' : 'w-1.5 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          >
            {idx === current && (
              <span className="absolute inset-0 bg-white/30 animate-progress-bar"></span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;