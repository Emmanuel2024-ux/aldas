// src/pages/services/Mobilite.tsx
import { useMemo, useCallback, useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../seo/pageSEO';
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import VehicleShowcase from '../../components/Services/VehicleShowcase';
import { servicesData } from '../../data/servicesData';
import { 
  CheckCircle, AlertTriangle, Clock, UserCheck, CreditCard, MapPin, 
  ShieldCheck, Star, Award, Headphones, Zap 
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';

// Import des images locales optimisées (WebP recommandé)
import bgMobilite from '../../assets/images/bg-mobilite.jpg';
import bgMobilite2 from '../../assets/images/bg-mobilite2.jpg';

// --- TYPES ---
interface RentalCondition {
  number: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

interface Engagement {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  text: string;
  description?: string;
}

// --- DONNÉES MÉMOÏSÉES ---
const rentalConditions: RentalCondition[] = [
  {
    number: '01',
    title: 'Réservation & Confirmation',
    text: 'Toute réservation doit être confirmée par écrit. Un acompte est requis pour bloquer le véhicule.',
    icon: CheckCircle
  },
  {
    number: '02',
    title: 'Pièces Requises',
    text: 'Présentation obligatoire d\'une pièce d\'identité valide et d\'un permis de conduire en cours de validité.',
    icon: UserCheck
  },
  {
    number: '03',
    title: 'Paiement Sécurisé',
    text: 'Le paiement intégral est requis avant la prise en charge. Transferts mobiles et virements acceptés.',
    icon: CreditCard
  },
  {
    number: '04',
    title: 'Zone de Circulation',
    text: 'Circulation autorisée sur tout le territoire national. Tout déplacement hors Abidjan doit être signalé.',
    icon: MapPin
  }
];

const engagementsData: Engagement[] = [
  { 
    icon: Award, 
    title: 'Qualité Premium', 
    text: 'Des véhicules récents, entretenus et nettoyés après chaque location pour votre confort absolu.',
    description: 'Flotte premium entretenue rigoureusement'
  },
  { 
    icon: ShieldCheck, 
    title: 'Sécurité Maximale', 
    text: 'Assurance tous risques incluse et assistance 24h/24 et 7j/7 sur tout le territoire.',
    description: 'Protection complète et assistance permanente'
  },
  { 
    icon: Headphones, 
    title: 'Service Client Élite', 
    text: 'Une équipe dédiée à votre écoute pour répondre à toutes vos demandes, même les plus spécifiques.',
    description: 'Support personnalisé et réactif'
  },
  { 
    icon: Zap, 
    title: 'Réactivité Instantanée', 
    text: 'Réservation rapide, confirmation immédiate et mise à disposition dans les plus brefs délais.',
    description: 'Processus de réservation optimisé'
  },
  { 
    icon: Star, 
    title: 'Expérience Unique', 
    text: 'Nous ne louons pas juste une voiture, nous offrons une expérience de mobilité sans compromis.',
    description: 'Expérience client premium à chaque étape'
  }
];

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const iconPop: Variants = {
  hidden: { scale: 0.8, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.1 },
  },
};

const Mobilite = () => {
  // ✅ 1. SEO : Injection des meta tags via useSEO (EN PREMIER)
  useSEO(pageSEO['/services/mobilite']);
  
  const pageData = servicesData['mobilite'];
  
  // ✅ 2. État pour le parallaxe léger (optimisé)
  const [scrollY, setScrollY] = useState(0);
  
  // ✅ 3. Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ 4. Gestion du parallaxe optimisée (throttled)
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // ✅ 5. Schema.org JSON-LD pour CarRental + Catalogue
  const mobiliteSchema = useMemo(() => {
    const baseUrl = 'https://www.aldas-ci.com';
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CarRental',
          '@id': `${baseUrl}/services/mobilite#carrental`,
          name: pageSEO['/services/mobilite'].title,
          description: pageSEO['/services/mobilite'].description,
          image: pageSEO['/services/mobilite'].ogImage,
          url: `${baseUrl}/services/mobilite`,
          telephone: '+2250747265693',
          priceRange: '60000-800000 XOF',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abidjan',
            addressCountry: 'CI'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '5.3600',
            longitude: '-4.0083'
          },
          openingHours: 'Mo-Su 08:00-20:00',
          areaServed: { '@type': 'City', name: 'Abidjan' },
          availableLanguage: ['fr', 'en'],
          makesOffer: {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Car',
              name: 'Véhicules de location premium',
              vehicleConfiguration: 'Économique, Premium, SUV, Luxe',
              fuelType: ['Essence', 'Hybride', 'Diesel'],
              transmissionType: ['Automatique', 'Manuelle'],
              seatingCapacity: { min: 4, max: 8 }
            }
          },
          amenityFeature: engagementsData.map(eng => ({
            '@type': 'LocationFeatureSpecification',
            name: eng.title,
            value: true,
            description: eng.description
          }))
        },
        {
          '@type': 'ItemList',
          '@id': `${baseUrl}/services/mobilite#engagements`,
          name: 'Engagements qualité ÁLDÁS',
          itemListElement: engagementsData.map((eng, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Service',
              name: eng.title,
              description: eng.text,
              serviceType: 'Location de voitures premium'
            }
          }))
        }
      ]
    };
  }, []);

  // ✅ 6. Gestionnaire de changement de slide pour annonces ARIA
  const handleEngagementSlideChange = useCallback((swiper: any) => {
    const announcement = document.getElementById('engagements-announcement');
    if (announcement) {
      const currentEngagement = engagementsData[swiper.realIndex - 1]; // -1 car slide 0 = intro
      if (currentEngagement) {
        announcement.textContent = `Engagement ${swiper.realIndex} sur ${engagementsData.length + 1} : ${currentEngagement.title}`;
      }
    }
  }, []);

  // ✅ 7. Helper pour formatage de prix (si besoin)
  const formatPrice = useCallback((price: number) => 
    new Intl.NumberFormat('fr-FR').format(price) + ' FCFA', []);

  return (
    // ✅ Structure sémantique principale avec ARIA et microdata
    <motion.main 
      className="bg-white font-sans antialiased selection:bg-emerald-900 selection:text-white"
      role="main"
      aria-label="Location de voitures premium à Abidjan - ÁLDÁS CI"
      itemScope
      itemType="https://schema.org/CarRental"
      // Animation d'apparition de la page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ✅ 8. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobiliteSchema) }}
      />
      
      {/* ✅ 9. H1 unique pour SEO (sr-only car PageHero gère le visuel) */}
      <h1 className="sr-only" itemProp="name">
        {pageSEO['/services/mobilite'].title}
      </h1>
      <meta itemProp="description" content={pageSEO['/services/mobilite'].description} />
      <meta itemProp="image" content={pageSEO['/services/mobilite'].ogImage} />
      <link itemProp="url" href="https://www.aldas-ci.com/services/mobilite" />
      
      {/* --- 1. HERO --- */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Réserver maintenant"
        btnLink="/contact"
        id="mobilite-hero"
        ariaLabel="Section d'introduction - Location de voitures premium ÁLDÁS"
        imageAlt="Flotte de véhicules premium ÁLDÁS disponible à la location à Abidjan"
      />

      {/* --- 2. SECTION ENGAGEMENTS (Avec Framer Motion) --- */}
      <motion.section 
        className="engagements-section w-full relative overflow-hidden py-12 md:py-20"
        role="region"
        aria-labelledby="engagements-heading"
        aria-label="Engagements qualité de Áldás Location de voitures"
        // Animation d'apparition de la section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        {/* Fond Complexe */}
        <div 
          className="absolute inset-0 z-0 w-full h-full engagements-bg"
          style={{
            background: `
              linear-gradient(to bottom, rgba(15, 22, 32, 0.95) 0%, rgba(15, 22, 32, 0.6) 40%, rgba(15, 22, 32, 0.2) 70%, transparent 100%),
              url(${bgMobilite2})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: 'min(100vh, 100svh)',
            paddingTop: 'clamp(140px, 20vh, 300px)',
            paddingBottom: 'clamp(40px, 6vw, 80px)',
            paddingLeft: 'clamp(20px, 4vw, 40px)',
            paddingRight: 'clamp(20px, 4vw, 40px)',
          }}
          aria-hidden="true"
        >
          {/* Surcouche de dégradé */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] via-[#1a253a]/40 to-black pointer-events-none" aria-hidden="true" />
          {/* Effet de grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* En-tête avec animations Framer Motion */}
          <motion.div 
            className="text-center lg:text-left mb-16"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-sm rounded-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Notre Promesse
            </motion.span>
            <motion.h2 
              id="engagements-heading"
              className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-md leading-tight"
              variants={fadeInRight}
              transition={{ delay: 0.2 }}
            >
              Engagement <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Qualité</span>
            </motion.h2>
            <motion.div 
              className="w-20 h-px bg-gradient-to-r from-emerald-500 to-transparent mt-6 hidden lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Annonce sr-only pour lecteurs d'écran */}
          <div id="engagements-announcement" className="sr-only" aria-live="polite" aria-atomic="true" />

          {/* Swiper Container avec accessibilité */}
          <div className="swiper engagements-swiper mt-4 pb-20">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 1.3, spaceBetween: 20 },
                768: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 2.8, spaceBetween: 30 },
                1280: { slidesPerView: 3.2, spaceBetween: 40 },
              }}
              navigation={{
                nextEl: '.engagements-button-next',
                prevEl: '.engagements-button-prev',
              }}
              pagination={{ 
                el: '.engagements-pagination', 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
              }}
              autoplay={prefersReducedMotion ? false : { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={false}
              rewind={true}
              speed={800}
              className="!overflow-visible"
              keyboard={{ enabled: true, onlyInViewport: true }}
              a11y={{
                enabled: true,
                slideLabelMessage: 'Engagement {{index}} sur {{slides}}',
                prevSlideMessage: 'Engagement précédent',
                nextSlideMessage: 'Engagement suivant',
                firstSlideMessage: 'Premier engagement',
                lastSlideMessage: 'Dernier engagement',
              }}
              onSlideChange={handleEngagementSlideChange}
            >
              {/* Slide Intro Spéciale */}
              <SwiperSlide>
                <motion.div 
                  className="engagement-card intro-card !bg-transparent !border-none !shadow-none flex items-center justify-center md:justify-start h-[200px] md:h-[450px] p-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div>
                    <motion.h3 
                      className="eng-title-big text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.1] text-white drop-shadow-2xl"
                      variants={fadeInUp}
                    >
                      Pourquoi <br/>
                      <b className="col text-transparent bg-clip-text bg-gradient-to-r from-[#00e0ff] via-[#2ac280] to-[#66faff] block mt-2">Áldás</b> <br/>
                      <span className="text-gray-400 text-2xl md:text-4xl block mt-4 font-light tracking-wide">Location de voiture premium?</span>
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400 text-lg mt-6 max-w-xl font-light leading-relaxed hidden md:block"
                      variants={fadeInUp}
                      transition={{ delay: 0.2 }}
                    >
                      Découvrez l'excellence du service automobile en Côte d'Ivoire. Fiabilité, luxe et tranquillité d'esprit à chaque kilomètre.
                    </motion.p>
                  </div>
                </motion.div>
              </SwiperSlide>

              {/* Slides Engagements avec animations en cascade */}
              {engagementsData.map((eng, idx) => (
                <SwiperSlide key={eng.title}>
                  <motion.article 
                    className="engagement-card w-full h-[280px] md:h-[400px] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl rounded-[24px] p-8 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 hover:border-emerald-500/30 hover:bg-[rgba(255,255,255,0.06)] transition-shadow duration-300 ease-out group relative overflow-hidden focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-[#0f1620]"
                    role="article"
                    tabIndex={0}
                    // Animation au scroll
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.1 + (idx * 0.08) }}
                    // Animation au hover (désactivée si reduced-motion)
                    whileHover={prefersReducedMotion ? undefined : { 
                      y: -4, 
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                    // Microdata Schema.org
                    itemScope
                    itemType="https://schema.org/Service"
                  >
                    {/* Meta Schema.org */}
                    <meta itemProp="name" content={eng.title} />
                    <meta itemProp="description" content={eng.text} />
                    <meta itemProp="serviceType" content="Location de voitures premium" />
                    
                    {/* Effet de lueur interne au survol - décoratif */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />
                    
                    {/* Icône Animée */}
                    <motion.div 
                      className="mb-8 relative z-10"
                      variants={iconPop}
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center shadow-inner"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <eng.icon size={40} strokeWidth={1.5} className="text-[#2ac280] transition-colors duration-300 drop-shadow-[0_0_15px_rgba(42,194,128,0.4)]" aria-hidden="true" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Titre */}
                    <motion.h4 
                      className="eng-title text-xl md:text-2xl font-bold text-white uppercase mb-4 tracking-wide transition-colors duration-300 relative z-10 group-hover:text-emerald-300"
                      itemProp="name"
                      variants={fadeInUp}
                    >
                      {eng.title}
                    </motion.h4>
                    
                    {/* Texte */}
                    <motion.p 
                      className="eng-text text-gray-400 text-sm md:text-base leading-relaxed font-light px-4 transition-colors duration-300 relative z-10 line-clamp-3 group-hover:text-gray-300"
                      itemProp="description"
                      variants={fadeInUp}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
                    >
                      {eng.text}
                    </motion.p>
                  </motion.article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Contrôles avec accessibilité */}
            <div className="swiper-bottom-controls container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mt-8 relative z-20">
              {/* Pagination */}
              <div 
                className="engagements-pagination flex justify-center md:justify-start w-full md:w-auto"
                role="tablist"
                aria-label="Navigation des engagements"
              />
              
              {/* Flèches */}
              <div className="flex gap-4" role="navigation" aria-label="Navigation du carrousel d'engagements">
                <button 
                  className="engagements-button-prev group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(42,194,128,0.4)] transition-all duration-300 cursor-pointer overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0f1620]"
                  aria-label="Engagement précédent"
                  type="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                  <span className="sr-only">Précédent</span>
                </button>
                <button 
                  className="engagements-button-next group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(42,194,128,0.4)] transition-all duration-300 cursor-pointer overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0f1620]"
                  aria-label="Engagement suivant"
                  type="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                  <span className="sr-only">Suivant</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Spécifique */}
        <style>{`
          .engagements-swiper {
            width: 100%;
            overflow: visible !important;
          }
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            opacity: 1;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
          }
          .swiper-pagination-bullet-active {
            background: #2ac280;
            width: 24px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(42, 194, 128, 0.6);
          }
          .swiper-pagination-bullet:focus {
            outline: 2px solid #06b6d4;
            outline-offset: 2px;
          }
          @media (max-width: 768px) {
            .engagements-bg {
              padding-top: clamp(100px, 15vh, 180px);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .engagement-card,
            .engagements-button-prev,
            .engagements-button-next {
              transition: none !important;
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>
      </motion.section>

      {/* --- 3. CATALOGUE VÉHICULES --- */}
      <motion.section 
        className="bg-gray-50 py-16 md:py-20"
        role="region"
        aria-labelledby="catalogue-heading"
        aria-label="Catalogue de véhicules de location premium à Abidjan"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeaderCentered 
            id="catalogue-heading"
            badge="Catalogue"
            title="Notre Catalogue de Véhicules de Location"
            description="Large gamme de véhicules premium à Abidjan : Mercedes, BMW, Cadillac, Audi, Hyundai, Toyota, Nissan… Tarifs de 60.000 à 800.000 FCFA par jour. Sélection basée sur confort, transmission, nombre de places et équipements."
            headingLevel={2}
          />
          <VehicleShowcase  />
        </div>
      </motion.section>

      {/* --- 4. CONDITIONS DE LOCATION (Layout Split avec Parallaxe) --- */}
      <motion.section 
        className="relative w-full bg-white overflow-hidden"
        role="region"
        aria-labelledby="conditions-heading"
        aria-label="Conditions de location de véhicules chez ÁLDÁS CI"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row min-h-[800px] lg:h-[900px]">
          
          {/* --- COLONNE GAUCHE : LISTE DES CONDITIONS --- */}
          <motion.div 
            className="w-full lg:w-5/12 bg-[#0b0f14] text-white p-8 md:p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-20 shadow-2xl overflow-hidden"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Déco Fond Subtile */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent" aria-hidden="true" />
            
            {/* Titre avec Filigrane */}
            <div className="relative mb-16">
              <span className="text-emerald-500/20 text-[120px] md:text-[160px] font-bold absolute -top-12 -left-4 select-none pointer-events-none leading-none" aria-hidden="true">
                01
              </span>
              <motion.h3 
                id="conditions-heading"
                className="relative text-3xl md:text-4xl font-light text-white tracking-wide uppercase"
                variants={fadeInUp}
              >
                Conditions <br/>
                <span className="font-bold text-emerald-400 block mt-2">Générales</span>
              </motion.h3>
              <motion.div 
                className="w-20 h-px bg-emerald-500 mt-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                aria-hidden="true"
              />
            </div>
            
            {/* Liste des conditions avec animations en cascade */}
            <motion.div 
              className="space-y-12 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {rentalConditions.map((condition, idx) => (
                <motion.div 
                  key={condition.number} 
                  className="group flex items-start gap-6 cursor-default"
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Numéro Stylisé */}
                  <motion.div 
                    className="shrink-0 w-14 h-14 rounded-none border border-emerald-500/30 bg-emerald-900/10 flex items-center justify-center text-emerald-400 font-mono text-xl transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500"
                    aria-hidden="true"
                  >
                    {condition.number}
                  </motion.div>
                  
                  {/* Contenu Texte */}
                  <div className="pt-2">
                    <h4 className="text-lg font-medium text-white mb-3 tracking-wide transition-colors duration-300 group-hover:text-emerald-300">
                      {condition.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light max-w-md transition-colors duration-300 group-hover:text-slate-300">
                      {condition.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Signature Bas de Page */}
            <motion.div 
              className="mt-20 pt-8 border-t border-white/5 flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest"
              variants={fadeInUp}
            >
              <ShieldCheck size={16} className="text-emerald-500" aria-hidden="true" />
              <span>Transparence & Confiance</span>
            </motion.div>
          </motion.div>

          {/* --- COLONNE DROITE : IMAGE PARALLAXE + CARTES --- */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2 overflow-hidden bg-black">
            
            {/* Image de Fond avec Parallaxe léger et optimisé */}
            <div 
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
              style={{
                backgroundImage: `url(${bgMobilite})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // Parallaxe uniquement si animations activées
                transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.03}px)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out'
              }}
              aria-hidden="true"
            >
              {/* Overlays pour lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" aria-hidden="true" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" aria-hidden="true" />
            </div>

            {/* Contenu Flottant Scrollable */}
            <div className="relative z-10 h-full overflow-y-auto custom-scrollbar-hide p-6 md:p-12 lg:p-20 flex flex-col justify-center gap-10 scroll-smooth">
              
              {/* En-tête Flottant */}
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span 
                  className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-sm rounded-sm"
                  variants={fadeInUp}
                >
                  Informations Pratiques
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                  variants={fadeInUp}
                  transition={{ delay: 0.1 }}
                >
                  Louer en toute <br/>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Sérénité</span>
                </motion.h2>
              </motion.div>

              {/* Grille des cartes avec animations */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                
                {/* Carte AVEC CHAUFFEUR */}
                <motion.div 
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm hover:bg-white/10 hover:border-emerald-500/30 transition-shadow duration-300 ease-out overflow-hidden focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-black"
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  tabIndex={0}
                  role="article"
                  aria-label="Conditions de location avec chauffeur"
                >
                  {/* Effet de lueur */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <motion.div 
                        className="p-3 bg-emerald-500/20 rounded-sm text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                        aria-hidden="true"
                      >
                        <Star size={24} strokeWidth={1.5} />
                      </motion.div>
                      <h5 className="font-bold text-white text-xl tracking-wide">Avec Chauffeur</h5>
                    </div>
                    
                    <ul className="space-y-4 text-sm text-gray-300 font-light" role="list" aria-label="Conditions pour la location avec chauffeur">
                      {[
                        { text: 'Pièce d\'identité (CNI/Passeport)', icon: CheckCircle, color: 'text-emerald-400' },
                        { text: 'Pré-paiement obligatoire', icon: CreditCard, color: 'text-emerald-400' },
                        { text: '+20.000 FCFA/jour hors Abidjan', icon: AlertTriangle, color: 'text-amber-400' },
                        { text: 'Supplément nuit (après 21h30)', icon: Clock, color: 'text-blue-400' }
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 group/li"
                          role="listitem"
                          whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                        >
                          <item.icon size={18} className={`shrink-0 mt-0.5 ${item.color} transition-transform duration-300 group-hover/li:scale-110`} strokeWidth={1.5} aria-hidden="true" />
                          <span className="transition-colors duration-300 group-hover/li:text-white">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Carte SANS CHAUFFEUR */}
                <motion.div 
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm hover:bg-white/10 hover:border-cyan-500/30 transition-shadow duration-300 ease-out overflow-hidden focus-within:ring-2 focus-within:ring-cyan-400 focus-within:ring-offset-2 focus-within:ring-offset-black"
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  tabIndex={0}
                  role="article"
                  aria-label="Conditions de location sans chauffeur"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <motion.div 
                        className="p-3 bg-cyan-500/20 rounded-sm text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                        aria-hidden="true"
                      >
                        <UserCheck size={24} strokeWidth={1.5} />
                      </motion.div>
                      <h5 className="font-bold text-white text-xl tracking-wide">Sans Chauffeur</h5>
                    </div>
                    
                    <ul className="space-y-4 text-sm text-gray-300 font-light" role="list" aria-label="Conditions pour la location sans chauffeur">
                      {[
                        { text: 'Âge minimum : 25 ans', icon: UserCheck, color: 'text-cyan-400' },
                        { text: 'Permis depuis min. 3 ans', icon: ShieldCheck, color: 'text-cyan-400' },
                        { text: 'Pièce d\'identité + Permis originaux', icon: CheckCircle, color: 'text-cyan-400' },
                        { text: 'Pré-paiement + caution requise', icon: CreditCard, color: 'text-cyan-400' }
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 group/li"
                          role="listitem"
                          whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                        >
                          <item.icon size={18} className={`shrink-0 mt-0.5 ${item.color} transition-transform duration-300 group-hover/li:scale-110`} strokeWidth={1.5} aria-hidden="true" />
                          <span className="transition-colors duration-300 group-hover/li:text-white">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </motion.div>

              {/* Note Légale */}
              <motion.p 
                className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-500 font-light italic"
                variants={fadeInUp}
              >
                * Ces conditions sont susceptibles d'évoluer. Veuillez consulter votre contrat pour plus de détails.
              </motion.p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* --- 5. AUTRES SERVICES --- */}
      <ServiceGrid 
        heroTitle={pageData.heroHeadline}
        ariaLabel="Découvrez nos autres services premium : navettes, conciergerie, événementiel"
        sectionId="autres-services-mobilite"
      />
      
      {/* CSS Custom pour scrollbar et reduced-motion */}
      <style>{`
        .custom-scrollbar-hide::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-hide::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
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
          .group-hover\\:-translate-y-2:hover,
          .group-hover\\:translate-x-1:hover {
            transform: none !important;
          }
        }
        
        /* Focus visible pour navigation clavier */
        [tabindex]:focus,
        button:focus,
        a:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
      `}</style>
    </motion.main>
  );
};

export default Mobilite;