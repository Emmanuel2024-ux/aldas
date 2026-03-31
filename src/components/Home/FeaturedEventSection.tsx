// src/components/Home/FeaturedEventSection.tsx
// ============================================================================
// 🎯 SECTION ÉVÉNEMENT À LA UNE - ÁLDÁS CI
// ============================================================================
// • Icônes Lucide responsives avec Tailwind (w-* h-*)
// • TypeScript strict : interfaces exportées, pas de any
// • Schema.org Event pour rich results Google
// • Accessibilité : ARIA, navigation clavier, focus visible, reduced-motion
// • Performance : images lazy loading, decoding async, memoization
// ============================================================================

import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import EventLightbox from '../UI/EventLightBox';
import illustrationEventsRealize from '../../assets/images/illustration-events-realize.jpg';

// ============================================================================
// 🎯 TYPES EXPORTÉS
// ============================================================================

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  meta?: Array<{ label: string; value: string }>;
}

export interface FeaturedEventSectionProps {
  title: string;
  date: string;
  location: string;
  attendees: string;
  description: string;
  imageUrl: string;
  link: string;
  onGalleryOpen?: () => void;
  sectionId?: string;
}

// ============================================================================
// 🧩 COMPOSANT PRINCIPAL
// ============================================================================

const FeaturedEventSection = ({
  title = "Gala des 50 ans de PETROCI",
  date = "15 Octobre 2025",
  location = "Sofitel Hôtel Ivoire, Abidjan",
  attendees = "500+ Invités VIP",
  description = "Une soirée d'exception célébrant un demi-siècle d'excellence. Scénographie immersive, logistique millimétrée et expérience inoubliable pour les plus hautes autorités du secteur.",
  imageUrl = illustrationEventsRealize,
  link = "/services/evenements",
  onGalleryOpen,
  sectionId = "featured-event-section",
}: FeaturedEventSectionProps) => {
  // ✅ État du lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // ✅ Données de la galerie (mémoïsées)
  const galleryImages = useMemo<GalleryImage[]>(() => [
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      alt: "Vue d'ensemble de la salle du Gala des 50 ans de PETROCI avec scénographie lumineuse",
      title: "La Grande Salle de Bal",
      description: "Une scénographie lumineuse transformant le hall principal en un écrin de verre et de lumière, accueillant 500 convives dans une ambiance feutrée.",
      meta: [
        { label: 'Moment', value: 'Début de soirée' },
        { label: 'Ambiance', value: 'Électrique & Chic' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      alt: "Détail des arts de la table avec porcelaine fine et centrages floraux sur mesure",
      title: "Arts de la Table",
      description: "Des centres de table floraux sur mesure et une vaisselle en porcelaine fine, reflétant l'exigence de prestige de l'événement.",
      meta: [
        { label: 'Décorateur', value: 'Maison Fleuriste' },
        { label: 'Style', value: 'Néo-Classique' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
      alt: "Allocution du PDG de PETROCI lors du gala des 50 ans avec écran LED géant",
      title: "Allocution du PDG",
      description: "Un moment solennel retraçant 50 années d'innovation et de leadership, projeté sur un écran LED géant de 15 mètres.",
      meta: [
        { label: 'Intervenant', value: 'M. le Directeur Général' },
        { label: 'Durée', value: '15 min' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1200&q=80",
      alt: "Performance live exclusive d'un orchestre symphonique lors du gala PETROCI",
      title: "Showcase Artistique",
      description: "Une performance live exclusive ayant clôturé la soirée, réunissant artistes locaux et internationaux.",
      meta: [
        { label: 'Artiste', value: 'Orchestre Symphonique' },
        { label: 'Clou du spectacle', value: "Feu d'artifice intérieur" }
      ]
    }
  ], []);

  // ✅ Handlers
  const handleOpenGallery = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLightboxOpen(true);
    onGalleryOpen?.();
  }, [onGalleryOpen]);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setTimeout(() => {
      const btn = document.querySelector<HTMLButtonElement>(`[aria-controls="event-lightbox"]`);
      btn?.focus();
    }, 100);
  }, []);

  // ✅ Keyboard handling pour fermeture (Escape)
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseLightbox();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleCloseLightbox]);


  // ✅ Helper pour icônes responsives (optionnel, pour DRY code)
  const responsiveIconClass = "w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0";

  return (
    <>
     

      {/* Section principale */}
      <section
        id={sectionId}
        className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden bg-slate-900 text-white"
        role="region"
        aria-labelledby={`${sectionId}-heading`}
        aria-label={`Événement à la une : ${title}`}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={imageUrl}
            alt={`Illustration de l'événement ${title} organisé par ÁLDÁS CI`}
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 ease-linear"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-10 sm:gap-12">
            
            {/* Contenu texte */}
            <div className="w-full lg:w-3/5 space-y-6 sm:space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-lg">
                <Star className="w-4 h-4 text-emerald-400 fill-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                  Dernière Réalisation
                </span>
              </div>

              {/* Titre H2 */}
              <h2
                id={`${sectionId}-heading`}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-white"
              >
                {title}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl border-l-2 border-emerald-500 pl-4 sm:pl-6">
                {description}
              </p>

              {/* ✅ Grille d'infos - ICÔNES CORRIGÉES */}
              <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4" itemScope itemType="https://schema.org/Event">
                
                {/* Date */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Calendar className={responsiveIconClass} aria-hidden="true" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Date</span>
                    <time 
                      className="text-sm font-bold text-white truncate" 
                      itemProp="startDate"
                      dateTime={new Date(date.replace(/(\d{1,2})\s+(\w+)\s+(\d{4})/, '$3-$2-$1')).toISOString()}
                    >
                      {date}
                    </time>
                  </div>
                </div>

                {/* Lieu */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MapPin className={responsiveIconClass} aria-hidden="true" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Lieu</span>
                    <span className="text-sm font-bold text-white truncate" itemProp="location">{location}</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Users className={responsiveIconClass} aria-hidden="true" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Participants</span>
                    <span className="text-sm font-bold text-white truncate" itemProp="attendee">{attendees}</span>
                  </div>
                </div>
              </div>

              {/* ✅ Boutons - ICÔNES CORRIGÉES */}
              <div className="pt-4 sm:pt-6 flex flex-wrap gap-3 sm:gap-4">
                <button 
                  onClick={handleOpenGallery}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenGallery(e as unknown as React.MouseEvent<HTMLButtonElement>);
                    }
                  }}
                  aria-controls="event-lightbox"
                  aria-expanded={isLightboxOpen}
                  className="group/btn inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span>Détails du projet</span>
                  <ArrowRight 
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/btn:translate-x-1 transition-transform flex-shrink-0" 
                    aria-hidden="true" 
                  />
                </button>
                
                <Link 
                  to={link}
                  className="group/btn inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label={`Voir tous nos projets événementiels - Accéder à la page ${link}`}
                >
                  Liste des projets
                </Link>
              </div>
            </div>

            {/* ✅ Bloc Satisfaction - ICÔNES CORRIGÉES */}
            <div className="hidden lg:block w-full lg:w-2/5">
              <div 
                className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
                aria-label="Taux de satisfaction client ÁLDÁS CI"
              >
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-300 mb-1 sm:mb-2">
                  100%
                </p>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-400">
                  Satisfaction Client
                </p>
                <div className="mt-4 sm:mt-6 flex justify-center gap-0.5 sm:gap-1 text-amber-400" aria-label="Note de 5 étoiles">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star 
                      key={i} 
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" 
                      fill="currentColor" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Styles CSS */}
        <style>{`
          button:focus-visible, a:focus-visible {
            outline: 2px solid #34d399;
            outline-offset: 2px;
          }
          @media (prefers-reduced-motion: reduce) {
            * { transition: none !important; animation: none !important; transform: none !important; }
          }
        `}</style>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <EventLightbox
          images={galleryImages}
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          eventTitle={title}
          ariaLabel={`Galerie photos de l'événement ${title}`}
          id="event-lightbox"
        />
      )}
    </>
  );
};

export default FeaturedEventSection;