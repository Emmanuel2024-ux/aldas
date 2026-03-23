// src/components/Home/ServicesSection.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarFront, ArrowLeftRight, Gem, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import SectionHeader from '../UI/SectionHeader';
import slideVerticalMobilite from '../../assets/images/slide-vertical-mobilite.jpg';
import slideVerticalNavette from '../../assets/images/slide-vertical-navette.jpg';
import slideVerticalConciergerie from '../../assets/images/slide-vertical-conciergerie.jpg';
import illustrationEventsRealize from '../../assets/images/illustration-events-realize.jpg';
// --- DONNÉES DES SERVICES ---
const servicesData = [
  {
    icon: CarFront,
    title: 'Location de voiture',
    desc: 'Une flotte moderne, confortable et rigoureusement entretenue pour vos déplacements personnels et professionnels.',
    link: '/services/mobilite',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: ArrowLeftRight,
    title: 'Service de navette',
    desc: 'Transferts fiables et ponctuels : aéroport, hôtels, entreprises et événements, assurés par des chauffeurs expérimentés.',
    link: '/services/navette',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Calendar,
    title: 'Agence événementielle',
    desc: "Organisation d'événements corporates, institutionnels et privés avec une coordination complète et élégante.",
    link: '/services/evenements',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Gem,
    title: 'Conciergerie haut de gamme',
    desc: 'Un accompagnement discret et personnalisé pour répondre aux exigences les plus élevées.',
    link: '/services/conciergerie',
    color: 'from-amber-500 to-orange-600'
  }
];

// --- IMAGES POUR LE FADE SLIDER ---
const serviceImages = [
  { src: slideVerticalMobilite, alt: 'Flotte de luxe Áldás' },
  { src: slideVerticalNavette, alt: 'Service de navette premium' },
  { src: illustrationEventsRealize, alt: 'Événementiel corporate' },
  { src: slideVerticalConciergerie, alt: 'Conciergerie de luxe' }
];

const ServicesSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);

  // Rotation automatique des images
  useEffect(() => {
    if (isHoveringSlider) return; // Pause au survol
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % serviceImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHoveringSlider]);

  return (
    <section id='services' className="py-20 md:py-28 overflow-hidden relative group/section" aria-labelledby="services-title">
      
      {/* Décos de fond avancées */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/40 to-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-100/40 to-emerald-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none opacity-60"></div>
      
      {/* Motif de grille subtil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none"></div>

      {/* --- HEADER --- */}
        <div data-aos="fade-up" data-aos-duration="1000">
          <SectionHeader 
            title="Nos Services"
            subtitle="Nous vous proposons un service de qualité !"
            gridCols={5}
            gridRows={2}
            color="#00b894"
          />
        </div>
      <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
        
        

        {/* --- CONTENU PRINCIPAL --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* COLONNE GAUCHE : GRILLE DE CARTES */}
          <div className="w-full h-full lg:w-2/3" data-aos="fade-right" data-aos-duration="1000">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {servicesData.map((service, idx) => (
                <article 
                  key={idx}
                  className="group relative bg-white p-8 lg:p-10 rounded-[20px_20px_50px_20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.25)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden h-full flex flex-col border border-slate-100 hover:border-emerald-200"
                  itemScope
                  itemProp="https://schema.org/Service"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  data-aos-duration="800"
                >
                  {/* Effet de lueur interne au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}></div>
                  
                  {/* Ligne décorative supérieure (apparait au survol) */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                  {/* Icône Flottante Premium */}
                  <div className="relative z-10 mb-8">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                      <service.icon size={32} strokeWidth={1.5} className="drop-shadow-md" />
                    </div>
                    {/* Cercle de lueur derrière l'icône */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                  </div>

                  {/* Titre */}
                  <h4 
                    className="relative z-10 text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300 leading-tight"
                    itemProp="name"
                  >
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p 
                    className="relative z-10 text-slate-500 leading-relaxed mb-8 flex-grow font-light text-base lg:text-lg"
                    itemProp="description"
                  >
                    {service.desc}
                  </p>

                  {/* Lien "En savoir plus" Transformable */}
                  <div className="relative z-10 mt-auto">
                    <Link 
                      to={service.link}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-emerald-600 border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 group/link"
                    >
                      En savoir plus
                      <ArrowRight size={18} className="transform group-hover/link:translate-x-2 transition-transform duration-300" />
                      {/* Stretched Link */}
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE : FADE IMAGE SLIDER CINÉMATIQUE */}
          <aside 
            className="w-full h-full lg:w-1/3 relative group/slider" 
            data-aos="fade-left" 
            data-aos-duration="1000" 
            data-aos-delay="400"
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
          >
            <div className="relative w-full aspect-[4/5] min-h-[700px] md:aspect-[3/4] rounded-[30px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] bg-slate-200 ring-4 ring-white/50">
              
              {/* Images avec Effet Ken Burns */}
              {serviceImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
                    idx === activeImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={`${img.alt} - ÁLDÁS`}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                      idx === activeImageIndex ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Overlay dégradé dynamique */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80"></div>
                </div>
              ))}
              
              {/* Badge Flottant "Nos Expertises" */}
              <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50 transform -translate-y-2 opacity-0 group-hover/slider:translate-y-0 group-hover/slider:opacity-100 transition-all duration-500 delay-100">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Nos Expertises</span>
                </div>
              </div>

              {/* Indicateurs de Progression Animés */}
              <div className="absolute bottom-6 left-6 z-30 flex flex-col gap-3">
                {serviceImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="group/dot relative w-10 h-1.5 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/40"
                    aria-label={`Voir image ${idx + 1}`}
                  >
                    {/* Barre de progression */}
                    <div 
                      className={`absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out ${
                        idx === activeImageIndex && !isHoveringSlider ? 'w-full animate-[progress_5s_linear]' : idx === activeImageIndex ? 'w-full' : 'w-0'
                      }`}
                      style={{ animationDuration: `${5}s`, animationPlayState: isHoveringSlider ? 'paused' : 'running' }}
                    ></div>
                  </button>
                ))}
              </div>
              
              {/* Compteur d'images (ex: 01 / 04) */}
              <div className="absolute bottom-6 right-6 z-30 text-white/80 text-xs font-mono font-bold tracking-widest bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                0{activeImageIndex + 1} / 0{serviceImages.length}
              </div>
            </div>
            
            {/* Ombre colorée sous le slider */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-emerald-500/20 blur-2xl rounded-full pointer-events-none"></div>
          </aside>

        </div>
      </div>

      {/* Keyframes Custom */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;