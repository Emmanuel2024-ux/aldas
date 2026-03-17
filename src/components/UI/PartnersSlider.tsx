// src/components/UI/PartnersSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SectionHeaderCentered from './SectionHeaderCenter';

// --- CONFIGURATION DES PARTENAIRES ---
// Remplace ce tableau par tes propres images situées dans /public/images/partners/
// L'ordre n'a pas d'importance, le slider les mélangera ou les affichera en boucle.
const partners = [
  { name: 'Partenaire 1', logo: '/images/partners/a.jpg' },
  { name: 'Partenaire 2', logo: '/images/partners/b.jpg' },
  { name: 'Partenaire 3', logo: '/images/partners/c.jpg' },
  { name: 'Partenaire 4', logo: '/images/partners/d.png' },
  { name: 'Partenaire 5', logo: '/images/partners/e.jpg' },
  { name: 'Partenaire 6', logo: '/images/partners/f.png' },
  { name: 'Partenaire 7', logo: '/images/partners/g.jpg' },
  { name: 'Partenaire 1', logo: '/images/partners/h.png' },
  { name: 'Partenaire 2', logo: '/images/partners/i.jpg' },
  { name: 'Partenaire 3', logo: '/images/partners/j.png' },
  { name: 'Partenaire 4', logo: '/images/partners/k.jpg' },
  { name: 'Partenaire 5', logo: '/images/partners/l.jpg' },
  { name: 'Partenaire 6', logo: '/images/partners/m.png' },
  { name: 'Partenaire 7', logo: '/images/partners/n.jpg' },
  { name: 'Partenaire 6', logo: '/images/partners/n.png' },
  { name: 'Partenaire 7', logo: '/images/partners/o.png' },
  { name: 'Partenaire 6', logo: '/images/partners/p.jpg' },
  { name: 'Partenaire 7', logo: '/images/partners/q.png' },
  { name: 'Partenaire 7', logo: '/images/partners/r.jpg' },

];

const PartnersSlider = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Déco fond subtile */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeaderCentered
          badge="Partenaires"
          title='Ils nous font confiance'
          description="Découvrez les entreprises et organisations qui nous font confiance pour leurs besoins."
        />

        {/* SWIPER SLIDER */}
        <div className="w-full max-w-7xl mt-12 mx-auto">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true} // Boucle infinie
            speed={800} // Vitesse de transition fluide
            autoplay={{
              delay: 2000, // Délai entre les slides (plus lent pour apprécier les logos)
              disableOnInteraction: false, // Continue après un swipe manuel
              pauseOnMouseEnter: true, // Pause au survol (comme ton code JS)
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              576: { slidesPerView: 3, spaceBetween: 25 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              992: { slidesPerView: 5, spaceBetween: 35 },
              1200: { slidesPerView: 6, spaceBetween: 40 },
            }}
            className="pb-8"
          >
            {partners.map((partner, idx) => (
              <SwiperSlide key={idx} className="flex justify-center items-center h-24 md:h-32">
                <div 
                  className="group relative w-full h-full flex items-center justify-center p-4 cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 50}
                >
                  {/* Image du Logo */}
                  <img
                    src={partner.logo}
                    alt={`Logo Partenaire ${partner.name}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-all duration-500 ease-out filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl"
                    onError={(e) => {
                      // Fallback si l'image n'existe pas
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x80?text=Partner';
                    }}
                  />
                  
                  {/* Effet de lueur subtile au survol (Optionnel) */}
                  <div className="absolute inset-0 bg-aldas/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;