// src/components/Events/EventSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Star, Users, Lightbulb, ShieldCheck, Rocket, ThumbsUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Import des styles de base de Swiper
import 'swiper/swiper-bundle.css';

// --- TYPES & DONNÉES ---
interface SlideData {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface EventSliderProps {
  slides?: SlideData[];
  backgroundImage?: string;
}

const defaultSlides: SlideData[] = [
  { icon: Star, title: "Excellence Opérationnelle", text: "Une gestion millimétrée de chaque étape pour garantir une réalisation sans faille." },
  { icon: Users, title: "Accompagnement Sur-Mesure", text: "Une équipe dédiée à votre écoute pour concevoir des solutions parfaitement adaptées." },
  { icon: Lightbulb, title: "Créativité & Innovation", text: "Des concepts originaux et des idées fortes pour amplifier l'impact de vos projets." },
  { icon: ShieldCheck, title: "Fiabilité & Sécurité", text: "Des dispositifs rigoureux, conformes et sécurisés, adaptés aux exigences les plus élevées." },
  { icon: Rocket, title: "Réactivité & Performance", text: "Une capacité d'action rapide, même sur des projets complexes ou en délais serrés." },
  { icon: ThumbsUp, title: "Satisfaction Garantie", text: "Une expérience client premium, reconnue et appréciée par nos partenaires." },
];

// --- STYLES EXACTS (Copie du CSS fourni) ---
const styles = {
  container: {
    position: 'relative' as const,
    height: '280px', // Hauteur de base desktop
    width: '100%',
    overflow: 'hidden',
    background: '#fff',
  },
  rightPanel: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    filter: 'brightness(0.9)',
    transition: 'transform 1.5s ease',
  },
  leftPanel: {
    background: '#dfdfdf',
    padding: '40px 50px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    zIndex: 2,
    width: '60%',
    // La forme polygonale exacte
    clipPath: 'polygon(0 0, calc(100% - 105px) 0, 100% 50%, calc(100% - 105px) 100%, 0 100%)',
  },
  slideContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    opacity: 0,
    transform: 'translateY(-50px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  },
  slideContentActive: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  navButton: {
    position: 'absolute' as const,
    top: '50%',
    zIndex: 3,
    padding: '5px',
    width: 'clamp(26px, 3vw, 36px)',
    height: 'clamp(20px, 3vw, 30px)',
    background: 'rgba(255,255,255,0.85)',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,.18)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
    transition: 'all .25s ease',
    border: 'none',
    color: '#222',
    fontWeight: 700,
  },
};

const EventSlider = ({ slides = defaultSlides, backgroundImage }: EventSliderProps) => {
  return (
    <section className="slider-container m-2 md:m-5 w-full max-w-7xl mx-auto" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
      <div className="dual-slider" style={styles.container}>
        
        {/* Navigation Flèches (Positionnées absolument comme dans le CSS) */}
        <button className="custom-prev swiper-button-prev" aria-label="Événement précédent" style={{ ...styles.navButton, left: '15px' }} />
        <button className="custom-next swiper-button-next" aria-label="Événement suivant" style={{ ...styles.navButton, right: '15px' }} />

        {/* IMAGE FIXE (Right Panel) */}
        <div className="right-panel" style={styles.rightPanel}>
          <img 
            src={backgroundImage || "https://files.sbcdnsb.com/images/HXpFBpNr8YlxlU7lfpCetw/content/1614697676/1749456/2000/c7987c235349a9dafeab20210302-1593050-13mzr58.jpeg"} 
            alt="Événement premium Áldás" 
            style={styles.image}
            className="hover-scale-img" // Classe utilitaire pour le hover si besoin via CSS global, sinon géré par inline
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Pagination intégrée dans le panel droit */}
          <div className="swiper-pagination" style={{ position: 'absolute', bottom: '5px', right: '0px', zIndex: 4 }}></div>
        </div>

        {/* TEXTE SLIDER (Left Panel) */}
        <Swiper
          effect="fade"
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          speed={900}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ 
            el: '.swiper-pagination', 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          className="left-panel myTextSlider"
          style={styles.leftPanel}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
        >
          {slides.map((s, idx) => (
            <SwiperSlide key={idx} className="swiper-slide ps-3 ps-md-5 slide-content flex flex-col gap-2">
              {/* Contenu animé via classe active de Swiper */}
              <div className="slide-content-inner" 
                   style={{
                     ...styles.slideContent,
                     // Astuce : On utilise une clé pour forcer le re-render de l'animation ou on laisse Swiper gérer les classes
                   }}
                   // Note: Swiper ajoute automatiquement .swiper-slide-active. 
                   // Nous allons utiliser un effet ou simplement compter sur le CSS injecté ci-dessous pour la transition précise.
              >
                {/* Icône Lucide équivalente */}
                <s.icon size={46} className="text-[#174F44]" style={{ fontSize: 'clamp(28px, 4vw, 46px)', color: '#174F44' }} strokeWidth={1.5} />
                
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', fontWeight: 700, color: '#111', margin: 0 }}>
                  {s.title}
                </h3>
                
                <p style={{ fontSize: 'clamp(.9rem, 2.4vw, 1.05rem)', color: '#555', lineHeight: 1.45, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* CSS INLINT POUR LES ÉTATS ACTIFS ET MEDIA QUERIES */}
      <style>{`
        /* Animation quand la slide est active */
        .swiper-slide-active .slide-content-inner {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Styles spécifiques à la pagination pour coller au design */
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.75);
          opacity: 1;
          border: 2px solid #174F44;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #174F44;
        }

        /* Hover Image */
        .hover-scale-img {
          transition: transform 1.5s ease;
        }

        /* RESPONSIVE (Max-width 768px) */
        @media (max-width: 768px) {
          .dual-slider {
            height: auto;
            border-radius: 22px;
            position: relative;
          }
          .left-panel {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            clip-path: none !important;
            border-radius: 0;
            padding: 22px 20px !important;
            order: 2; /* Texte en dessous sur mobile si flex, ici Swiper gère */
          }
          .right-panel {
            position: relative !important;
            height: 220px !important;
            width: 100% !important;
            order: 1;
          }
          .custom-prev, .custom-next {
            top: 35% !important;
          }
          .swiper-pagination {
            bottom: 6px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default EventSlider;