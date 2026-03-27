// src/components/Events/RealizationsGrid.tsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Calendar, MapPin, Eye } from 'lucide-react';
import 'swiper/swiper-bundle.css';

import EventLightbox from '../UI/EventLightBox';
import SectionHeaderCentered from '../UI/SectionHeaderCenter';

// --- DONNÉES ENRICHIES AVEC GALERIES (CORRIGÉ: Ajout de 'alt') ---
const eventsData = [
  { 
    id: 1, 
    title: "Dîner Annuel des PPP", 
    category: "Institutionnel", 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", 
    short: "Conception et gestion intégrale du Dîner Annuel 2025 du CNP-PPP.",
    date: "12 Déc 2025",
    location: "Espace Crystal, Abidjan",
    gallery: [
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80", alt: "Vue d'ensemble de la salle", title: "Vue d'ensemble", description: "La salle principale décorée aux couleurs de l'événement.", meta: [{label: 'Capacité', value: '300 personnes'}] },
      { src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80", alt: "Détails de la table", title: "Détails de table", description: "Arts de la table et centrages floraux sur mesure.", meta: [] },
      { src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80", alt: "Discours officiel", title: "Discours officiel", description: "Allocution du président du CNP-PPP.", meta: [] }
    ]
  },
  { 
    id: 2, 
    title: "Gala des 50 ans de PETROCI", 
    category: "Corporate", 
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80", 
    short: "Organisation complète du dîner de gala célébrant les 50 ans.",
    date: "15 Oct 2025",
    location: "Sofitel Hôtel Ivoire",
    gallery: [
      { src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80", alt: "Scène principale avec écran LED", title: "Scène Principale", description: "Une scène de 15 mètres avec écran LED géant.", meta: [{label: 'Invités', value: '500+ VIP'}] },
      { src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1200&q=80", alt: "Performance live sur scène", title: "Showcase", description: "Performance live exclusive.", meta: [] }
    ]
  },
  { 
    id: 3, 
    title: "30e anniversaire du Groupe NSIA", 
    category: "Corporate", 
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", 
    short: "Célébration immersive des 30 ans au Palais d'Akwa.",
    date: "06 Déc 2025",
    location: "Palais d'Akwa",
    gallery: [
      { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", alt: "Espace d'accueil lumineux", title: "Accueil", description: "Espace d'accueil avec installation lumineuse.", meta: [] }
    ]
  },
  { 
    id: 4, 
    title: "Lancement Complexe HDS – SIR", 
    category: "Institutionnel", 
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", 
    short: "Cérémonie de pose de la première pierre du Complexe HDS.",
    date: "02 Oct 2025",
    location: "Vridi, Abidjan",
    gallery: [
      { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", alt: "Cérémonie de pose de la première pierre", title: "Cérémonie", description: "Pose symbolique de la première pierre.", meta: [{label: 'Budget', value: '545 Mrds FCFA'}] }
    ]
  },
  { 
    id: 5, 
    title: "Portail e-Cadastre Minier", 
    category: "Institutionnel", 
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", 
    short: "Lancement du portail e-Cadastre Minier sous haut patronage.",
    date: "22 Sep 2025",
    location: "Ministère des Mines",
    gallery: [
      { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", alt: "Conférence de presse officielle", title: "Conférence", description: "Présentation officielle aux partenaires.", meta: [] }
    ]
  },
  { 
    id: 6, 
    title: "Bold Conversations – Veuve Clicquot", 
    category: "Corporate", 
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80", 
    short: "Échange premium autour de l'audace féminine.",
    date: "19 Juil 2025",
    location: "La Parenthèse",
    gallery: [
      { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80", alt: "Panel de discussion entre femmes", title: "Panel", description: "Discussion entre femmes leaders.", meta: [] }
    ]
  },
];

const RealizationsGrid = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);

  const handleOpenLightbox = (event: typeof eventsData[0]) => {
    setSelectedEvent(event);
    setLightboxOpen(true);
  };

  return (
    <section aria-label='Galerie de nos événements réalisés : mariages, séminaires, galas' id='realizations-section' className="py-10 md:py-18 bg-white relative overflow-hidden">
      {/* Déco fond subtile */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Centré */}
        <SectionHeaderCentered
          badge="Portfolio"
          title="Nos Réalisations Événementielles"
          description="Découvrez quelques-uns des événements majeurs que nous avons orchestrés avec succès : conférences, galas, lancements et cérémonies institutionnelles."
        />

        {/* Swiper Slider */}
        <div className="relative mt-16 mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
            navigation={{
              nextEl: '.realizations-next',
              prevEl: '.realizations-prev',
            }}
            pagination={{ 
              el: '.realizations-pagination', 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            className="pb-16 !overflow-visible"
          >
            {eventsData.map((event) => (
              <SwiperSlide key={event.id} className="h-full">
                <div 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.25)] transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col cursor-pointer border border-slate-100"
                  onClick={() => handleOpenLightbox(event)}
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" 
                      loading="lazy" 
                    />
                    
                    {/* Overlay Graduel au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Badge Catégorie */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-emerald-700 rounded-full shadow-sm z-10">
                      {event.category}
                    </span>

                    {/* Bouton "Voir Galerie" */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                        <Eye size={18} />
                        <span className="text-sm font-bold uppercase tracking-wide">Voir la galerie</span>
                      </div>
                    </div>
                  </div>

                  {/* Contenu Texte */}
                  <div className="p-6 flex flex-col flex-grow relative bg-white">
                    {/* Ligne décorative supérieure */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-emerald-200 via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                      <Calendar size={14} className="text-emerald-500" />
                      <span>{event.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <MapPin size={14} className="text-emerald-500" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-light mb-6 line-clamp-3 flex-grow">
                      {event.short}
                    </p>

                    <div className="flex items-center text-emerald-600 text-xs font-bold uppercase tracking-widest group/link">
                      <span className="border-b-2 border-emerald-200 group-hover/link:border-emerald-600 transition-colors duration-300 pb-0.5">
                        Découvrir le projet
                      </span>
                      <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Contrôles Personnalisés */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
            <div className="realizations-pagination flex gap-2"></div>
            <div className="flex gap-4">
              <button className="realizations-prev w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="realizations-next w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODALE */}
      {selectedEvent && (
        <EventLightbox
          images={selectedEvent.gallery}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          eventTitle={selectedEvent.title}
        />
      )}

      {/* Styles Custom Pagination */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #059669;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default RealizationsGrid;