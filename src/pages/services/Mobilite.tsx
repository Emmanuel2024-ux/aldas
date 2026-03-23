// src/pages/services/Mobilite.tsx
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import VehicleShowcase from '../../components/Services/VehicleShowcase';
import { servicesData } from '../../data/servicesData';
import { CheckCircle, AlertTriangle, Clock, UserCheck, CreditCard, MapPin, ShieldCheck, Star, Award, Headphones, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';
import bgMobilite from '../../assets/images/bg-mobilite.jpg';
import bgMobilite2 from '../../assets/images/bg-mobilite2.jpg';

// --- DONNÉES DES CONDITIONS ---
const rentalConditions = [
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

// --- DONNÉES DES ENGAGEMENTS ---
const engagementsData = [
  { icon: Award, title: 'Qualité Premium', text: 'Des véhicules récents, entretenus et nettoyés après chaque location pour votre confort absolu.' },
  { icon: ShieldCheck, title: 'Sécurité Maximale', text: 'Assurance tous risques incluse et assistance 24h/24 et 7j/7 sur tout le territoire.' },
  { icon: Headphones, title: 'Service Client Élite', text: 'Une équipe dédiée à votre écoute pour répondre à toutes vos demandes, même les plus spécifiques.' },
  { icon: Zap, title: 'Réactivité Instantanée', text: 'Réservation rapide, confirmation immédiate et mise à disposition dans les plus brefs délais.' },
  { icon: Star, title: 'Expérience Unique', text: 'Nous ne louons pas juste une voiture, nous offrons une expérience de mobilité sans compromis.' }
];

const Mobilite = () => {
  const pageData = servicesData['mobilite'];
  const [scrollY, setScrollY] = useState(0);

  // Gestion du Parallaxe fluide
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white font-sans antialiased selection:bg-emerald-900 selection:text-white">
      
      {/* 1. HERO */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Réserver maintenant"
        btnLink="/contact"
      />

      {/* 2. SECTION ENGAGEMENTS (Design Exact PHP/CSS) */}
            {/* 2. SECTION ENGAGEMENTS (ULTRA PREMIUM FINAL) */}
      <section className="engagements-section w-full relative overflow-hidden py-12 md:py-20" aria-label="Engagements qualité de Áldás Location de voitures">
        {/* H1 SEO Invisible */}
        <h1 className="sr-only" itemProp="name">Location de voitures premium à Abidjan avec ÁldÁS</h1>

        {/* Fond Complexe : Image + Dégradé Noir + Dégradé Bleu Profond */}
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
        >
          {/* Surcouche de dégradé bleu subtil (#0f1620 vers transparent) pour l'ambiance */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] via-[#1a253a]/40 to-black pointer-events-none"></div>
          
          {/* Effet de grain subtil pour texture "cinéma" */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* En-tête avec Animation */}
          <div className="text-center lg:text-left mb-16" data-aos="fade-right" data-aos-duration="1000">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-sm rounded-sm">
              Notre Promesse
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-md leading-tight">
              Engagement <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Qualité</span>
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-emerald-500 to-transparent mt-6 hidden lg:block"></div>
          </div>

          {/* Swiper Container */}
          <div className="swiper engagements-swiper mt-4 pb-20">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
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
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={false}
              rewind={true}
              speed={800}
              className="!overflow-visible"
            >
              {/* Slide Intro Spéciale */}
              <SwiperSlide>
                <div className="engagement-card intro-card !bg-transparent !border-none !shadow-none flex items-center justify-center md:justify-start h-[200px] md:h-[450px] p-4">
                  <div data-aos="fade-up" data-aos-delay="200">
                    <h3 className="eng-title-big text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.1] text-white drop-shadow-2xl">
                      Pourquoi <br/>
                      <b className="col text-transparent bg-clip-text bg-gradient-to-r from-[#00e0ff] via-[#2ac280] to-[#66faff] block mt-2">Áldás</b> <br/>
                      <span className="text-gray-400 text-2xl md:text-4xl block mt-4 font-light tracking-wide">Location de voiture premium?</span>
                    </h3>
                    <p className="text-gray-400 text-lg mt-6 max-w-xl font-light leading-relaxed hidden md:block" data-aos="fade-up" data-aos-delay="400">
                      Découvrez l'excellence du service automobile en Côte d'Ivoire. Fiabilité, luxe et tranquillité d'esprit à chaque kilomètre.
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slides Engagements */}
              {engagementsData.map((eng, idx) => (
                <SwiperSlide key={idx}>
                  <article 
                    className="engagement-card w-full h-[280px] md:h-[400px] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl rounded-[24px] p-8 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 hover:border-emerald-500/30 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-500 ease-out group relative overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={100 + (idx * 100)}
                  >
                    {/* Effet de lueur interne au survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Icône Animée */}
                    <div className="mb-8 relative z-10">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-inner">
                        <eng.icon size={40} strokeWidth={1.5} className="text-[#2ac280] group-hover:text-[#00e0ff] transition-colors duration-500 drop-shadow-[0_0_15px_rgba(42,194,128,0.4)]" />
                      </div>
                    </div>
                    
                    {/* Titre */}
                    <h4 className="eng-title text-xl md:text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-emerald-300 transition-colors duration-300 relative z-10">
                      {eng.title}
                    </h4>
                    
                    {/* Texte */}
                    <p className="eng-text text-gray-400 text-sm md:text-base leading-relaxed font-light px-4 group-hover:text-gray-300 transition-colors duration-300 relative z-10 line-clamp-3">
                      {eng.text}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Contrôles (Pagination + Flèches) */}
            <div className="swiper-bottom-controls container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mt-8 relative z-20">
              {/* Pagination */}
              <div className="engagements-pagination flex justify-center md:justify-start w-full md:w-auto"></div>
              
              {/* Flèches Ultra Premium */}
              <div className="flex gap-4">
                <button className="engagements-button-prev group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(42,194,128,0.4)] transition-all duration-300 cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button className="engagements-button-next group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(42,194,128,0.4)] transition-all duration-300 cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Spécifique Ultra Premium */}
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
          @media (max-width: 768px) {
            .engagements-bg {
              padding-top: clamp(100px, 15vh, 180px);
            }
          }
        `}</style>
      </section>

      <section className="bg-gray-50" aria-label="Catalogue de véhicules de location premium à Abidjan">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <SectionHeaderCentered 
            badge="Catalogue"
            title="Notre Catalogue de Véhicules de Location"
            description="Large gamme de véhicules premium à Abidjan : Mercedes, BMW, Cadillac, Audi, Hyundai, Toyota, Nissan… Tarifs de 60.000 à 800.000 FCFA par jour. Sélection basée sur confort, transmission, nombre de places et équipements."
          />
          <VehicleShowcase />

        </div>
      </section>

      {/* 4. SECTION CONDITIONS DE LOCATION (ULTRA PREMIUM) */}
      <section className="relative w-full bg-white overflow-hidden" aria-label="Conditions de location de véhicules">
        
        <div className="flex flex-col lg:flex-row min-h-[800px] lg:h-[900px]">
          
          {/* --- COLONNE GAUCHE : LISTE DES CONDITIONS (Design Éditorial) --- */}
          <div className="w-full lg:w-5/12 bg-[#0b0f14] text-white p-8 md:p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-20 shadow-2xl overflow-hidden">
            
            {/* Déco Fond Subtile (Lignes) */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent"></div>
            
            {/* Titre avec Filigrane */}
            <div className="relative mb-16">
              <span className="text-emerald-500/20 text-[120px] md:text-[160px] font-bold absolute -top-12 -left-4 select-none pointer-events-none leading-none">
                01
              </span>
              <h3 className="relative text-3xl md:text-4xl font-light text-white tracking-wide uppercase">
                Conditions <br/>
                <span className="font-bold text-emerald-400 block mt-2">Générales</span>
              </h3>
              <div className="w-20 h-px bg-emerald-500 mt-6"></div>
            </div>
            
            <div className="space-y-12 relative z-10">
              {rentalConditions.map((condition, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-start gap-6 cursor-default"
                  data-aos="fade-right"
                  data-aos-delay={idx * 100}
                  data-aos-duration="1000"
                >
                  {/* Numéro Stylisé "Luxe" */}
                  <div className="shrink-0 w-14 h-14 rounded-none border border-emerald-500/30 bg-emerald-900/10 flex items-center justify-center text-emerald-400 font-mono text-xl group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 ease-out">
                    {condition.number}
                  </div>
                  
                  {/* Contenu Texte */}
                  <div className="pt-2">
                    <h4 className="text-lg font-medium text-white mb-3 tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
                      {condition.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light max-w-md group-hover:text-slate-300 transition-colors duration-300">
                      {condition.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature Bas de Page */}
            <div className="mt-20 pt-8 border-t border-white/5 flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Transparence & Confiance</span>
            </div>
          </div>

          {/* --- COLONNE DROITE : IMAGE PARALLAXE + CARTES FLOTTANTES --- */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2 overflow-hidden bg-black">
            
            {/* Image de Fond avec Effet Parallaxe */}
            <div 
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
              style={{
                backgroundImage: `url(${bgMobilite})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translateY(${scrollY * 0.05}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Overlay Complexe pour Lisibilité Maximale */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            </div>

            {/* Contenu Flottant Scrollable */}
            <div className="relative z-10 h-full overflow-y-auto custom-scrollbar-hide p-6 md:p-12 lg:p-20 flex flex-col justify-center gap-10 scroll-smooth">
              
              {/* En-tête Flottant */}
              <div className="mb-8" data-aos="fade-down">
                <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-sm rounded-sm">
                  Informations Pratiques
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  Louer en toute <br/>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Sérénité</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Carte AVEC CHAUFFEUR */}
                <div 
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 ease-out overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="p-3 bg-emerald-500/20 rounded-sm text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        <Star size={24} strokeWidth={1.5} />
                      </div>
                      <h5 className="font-bold text-white text-xl tracking-wide">Avec Chauffeur</h5>
                    </div>
                    
                    <ul className="space-y-4 text-sm text-gray-300 font-light">
                      {[
                        { text: 'Pièce d\'identité (CNI/Passeport)', icon: CheckCircle, color: 'text-emerald-400' },
                        { text: 'Pré-paiement obligatoire', icon: CreditCard, color: 'text-emerald-400' },
                        { text: '+20.000 FCFA/jour hors Abidjan', icon: AlertTriangle, color: 'text-amber-400' },
                        { text: 'Supplément nuit (après 21h30)', icon: Clock, color: 'text-blue-400' }
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group/li">
                          <item.icon size={18} className={`shrink-0 mt-0.5 ${item.color} group-hover/li:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                          <span className="group-hover/li:text-white transition-colors duration-300">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Carte SANS CHAUFFEUR */}
                <div 
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 ease-out overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="p-3 bg-cyan-500/20 rounded-sm text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                        <UserCheck size={24} strokeWidth={1.5} />
                      </div>
                      <h5 className="font-bold text-white text-xl tracking-wide">Sans Chauffeur</h5>
                    </div>
                    
                    <ul className="space-y-4 text-sm text-gray-300 font-light">
                      {[
                        { text: 'Âge minimum : 25 ans', icon: UserCheck, color: 'text-cyan-400' },
                        { text: 'Permis depuis min. 3 ans', icon: ShieldCheck, color: 'text-cyan-400' },
                        { text: 'Pièce d\'identité + Permis originaux', icon: CheckCircle, color: 'text-cyan-400' },
                        { text: 'Pré-paiement + caution requise', icon: CreditCard, color: 'text-cyan-400' }
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group/li">
                          <item.icon size={18} className={`shrink-0 mt-0.5 ${item.color} group-hover/li:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                          <span className="group-hover/li:text-white transition-colors duration-300">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Note Légale Discrète */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center" data-aos="fade-in" data-aos-delay="600">
                <p className="text-xs text-gray-500 font-light italic">
                  * Ces conditions sont susceptibles d'évoluer. Veuillez consulter votre contrat pour plus de détails.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. AUTRES SERVICES */}
      <ServiceGrid heroTitle={pageData.heroHeadline}/>
      
      {/* CSS Custom pour masquer la scrollbar */}
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
      `}</style>
    </div>
  );
};

export default Mobilite;