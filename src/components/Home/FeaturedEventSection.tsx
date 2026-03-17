// src/components/Home/FeaturedEventSection.tsx
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import EventLightbox from '../UI/EventLightBox';

const FeaturedEventSection = ({
  title = "Gala des 50 ans de PETROCI", 
  date = "15 Octobre 2025",
  location = "Sofitel Hôtel Ivoire, Abidjan",
  attendees = "500+ Invités VIP",
  description = "Une soirée d'exception célébrant un demi-siècle d'excellence. Scénographie immersive, logistique millimétrée et expérience inoubliable pour les plus hautes autorités du secteur.",
  imageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80",
  link = "/services/evenements"
}: any) => {
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Données complètes pour la Lightbox
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      alt: "Vue d'ensemble de la salle",
      title: "La Grande Salle de Bal",
      description: "Une scénographie lumineuse transformant le hall principal en un écrin de verre et de lumière, accueillant 500 convives dans une ambiance feutrée.",
      meta: [
        { label: 'Moment', value: 'Début de soirée' },
        { label: 'Ambiance', value: 'Électrique & Chic' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      alt: "Détail de la table",
      title: "Arts de la Table",
      description: "Des centres de table floraux sur mesure et une vaisselle en porcelaine fine, reflétant l'exigence de prestige de l'événement.",
      meta: [
        { label: 'Décorateur', value: 'Maison Fleuriste' },
        { label: 'Style', value: 'Néo-Classique' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
      alt: "Discours officiel",
      title: "Allocution du PDG",
      description: "Un moment solennel retraçant 50 années d'innovation et de leadership, projeté sur un écran LED géant de 15 mètres.",
      meta: [
        { label: 'Intervenant', value: 'M. le Directeur Général' },
        { label: 'Durée', value: '15 min' }
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1200&q=80",
      alt: "Spectacle live",
      title: "Showcase Artistique",
      description: "Une performance live exclusive ayant clôturé la soirée, réunissant artistes locaux et internationaux.",
      meta: [
        { label: 'Artiste', value: 'Orchestre Symphonique' },
        { label: 'Clou du spectacle', value: 'Feu d\'artifice intérieur' }
      ]
    }
  ];

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLightboxOpen(true);
  };

  return (
    <>
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#0b0f14] text-white group">
        {/* ... (Code précédent inchangé : Background, Container, Text Content) ... */}
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-40 transition-transform duration-[10s] ease-linear group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f14] via-[#0b0f14]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-12">
            
            <div className="w-full lg:w-3/5 space-y-8" data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Star size={16} className="text-emerald-400 fill-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">Dernière Réalisation</span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
                {title}
              </h2>

              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl border-l-2 border-emerald-500 pl-6">
                {description}
              </p>

              {/* Grille d'Infos */}
              <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Calendar size={20} className="text-emerald-400" />
                  <div className="flex flex-col"><span className="text-[10px] uppercase tracking-wider text-gray-400">Date</span><span className="text-sm font-bold text-white">{date}</span></div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MapPin size={20} className="text-emerald-400" />
                  <div className="flex flex-col"><span className="text-[10px] uppercase tracking-wider text-gray-400">Lieu</span><span className="text-sm font-bold text-white">{location}</span></div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Users size={20} className="text-emerald-400" />
                  <div className="flex flex-col"><span className="text-[10px] uppercase tracking-wider text-gray-400">Participants</span><span className="text-sm font-bold text-white">{attendees}</span></div>
                </div>
              </div>

              {/* BOUTONS D'ACTION */}
              <div className="pt-6 flex flex-wrap gap-4">
                <button 
                  onClick={handleOpenGallery}
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/30"
                >
                  Détails du projet
                  <ArrowRight size={20} className="transform group-hover/btn:translate-x-2 transition-transform" />
                </button>
                
                <Link 
                  to={link}
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                >
                  Liste des projets
                </Link>
              </div>
            </div>

            {/* Bloc Satisfaction */}
            <div className="hidden lg:block w-2/5" data-aos="fade-left" data-aos-delay="200">
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-300 mb-2">100%</p>
                <p className="text-sm uppercase tracking-widest text-gray-400">Satisfaction Client</p>
                <div className="mt-6 flex justify-center gap-1 text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODALE */}
      <EventLightbox
        images={galleryImages}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        eventTitle={title}
      />
    </>
  );
};

export default FeaturedEventSection;