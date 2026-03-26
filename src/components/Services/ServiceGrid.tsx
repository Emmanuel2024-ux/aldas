// src/components/Services/ServiceGrid.tsx
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { getOtherServices, type ServiceItem } from '../../data/servicesData';
import ServiceHeroSection from './ServiceHeroSection';
import ModernHR from '../UI/ModernHR';

export interface ServiceGridProps {
  currentSlug?: string | null;
  title?: string;
  heroTitle?: string | null;
  /** Label ARIA pour la section (accessibilité) */
  ariaLabel?: string;
}

const ServiceGrid = ({ 
  currentSlug, 
  title = "Nos Autres Services", 
  heroTitle,
  ariaLabel 
}: ServiceGridProps) => {
  const location = useLocation();
  
  const detectCurrentSlug = () => {
    const parts = location.pathname.split('/');
    return parts[parts.length - 1] || null;
  };

  const activeSlug = currentSlug !== undefined ? currentSlug : detectCurrentSlug();
  const displayedServices = getOtherServices(activeSlug);

  if (displayedServices.length === 0) return null;

  const isAboutPage = location.pathname === '/about';
  const sectionTitle = isAboutPage ? "Nos Services Principaux" : title;
  
  // ✅ ID unique pour l'ancrage aria-labelledby
  const sectionId = `service-grid-${activeSlug || 'home'}`;
  const titleId = `${sectionId}-title`;

  // Logique de grille dynamique
  const gridClass = isAboutPage 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className='relative'>
      {/* Affichage conditionnel du Hero */}
      {heroTitle && (
        <ServiceHeroSection 
          headline={heroTitle}
          ctaText="Contactez-nous"
          ctaLink="/contact"
        />
      )}
       
      {/* ✅ Section sémantique avec ARIA */}
      <section 
        id={sectionId}
        className="py-14 bg-white relative overflow-hidden"
        aria-labelledby={titleId}
        aria-label={ariaLabel || `${sectionTitle} - ÁLDÁS CI`}
        role="region"
      >
       
        <div className="container mx-auto px-4 relative z-10">
          
          <ModernHR />
           
          {/* ✅ Titre lié à la section via aria-labelledby */}
          <h2 
            id={titleId}
            className="text-3xl pb-2 sr-only" // Gardé sr-only si ModernHR affiche déjà un titre visible
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            {sectionTitle}
          </h2>
          
          {/* Titre visible pour les utilisateurs (décoratif mais accessible) */}
          <h3 
            className="text-3xl pb-2 font-bold text-slate-800"
            aria-hidden="true" // Caché aux lecteurs d'écran car doublon du h2 sr-only
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            {sectionTitle}
          </h3>

          {/* ✅ Grille avec rôle et label */}
          <div 
            className={gridClass}
            role="list"
            aria-label={`Liste des services : ${sectionTitle}`}
          >
            {displayedServices.map((service, index) => (
              <div
                key={service.slug}
                role="listitem"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={100 + (index * 150)}
              >
                <ServiceCard service={service} index={index} total={displayedServices.length} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SOUS-COMPOSANT CARTE PREMIUM ---
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  total: number;
}

const ServiceCard = ({ service, index, total }: ServiceCardProps) => {
  // ✅ ID unique pour la carte (accessibilité)
  const cardId = `service-card-${service.slug}`;
  const titleId = `${cardId}-title`;
  const descId = `${cardId}-desc`;

  return (
    // ✅ Article sémantique avec microdata Schema.org
    <article 
      id={cardId}
      className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-aldas/20 transition-all duration-700 ease-out transform hover:-translate-y-2 bg-gray-900"
      itemScope
      itemType="https://schema.org/Service"
      aria-labelledby={titleId}
      aria-describedby={descId}
      role="article"
    >
      {/* ✅ Meta Schema.org */}
      <meta itemProp="name" content={service.title} />
      <meta itemProp="description" content={service.details} />
      <meta itemProp="serviceType" content={service.badge} />
      
      {/* Image de fond - décorative, donc aria-hidden */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <img 
          src={service.img} 
          alt={service.title || `Illustration du service ${service.title} chez ÁLDÁS CI`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1000ms] ease-out" 
          loading="lazy" 
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 group-hover:to-black/90 transition-colors duration-500"></div>
      </div>

      {/* Contenu toujours visible */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-start h-full pointer-events-none">
        {/* Badge */}
        <div className="self-start mb-4 transform translate-y-0 opacity-100 transition-all duration-500">
          <span 
            className="px-3 py-1 md:px-4 md:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg"
            itemProp="serviceType"
          >
            {service.badge}
          </span>
        </div>
        
        {/* Titre + Sous-titre */}
        <div className="mt-auto mb-4 transform transition-transform duration-500">
          <h3 
            id={titleId}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md"
            itemProp="name"
          >
            {service.title}
          </h3>
          <p 
            id={descId}
            className="text-aldas-light font-medium text-xs md:text-sm tracking-wide opacity-90"
            itemProp="description"
          >
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* Panneau de détails (Reveal Effect) */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-full flex flex-col justify-end p-6 md:p-8 pt-32 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <div className="space-y-3 md:space-y-4 overflow-hidden">
          
          {/* Description détaillée */}
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-3 border-l-2 border-aldas pl-3 md:pl-4" itemProp="description">
            {service.details}
          </p>
          
          {/* Liste des fonctionnalités */}
          <ul className="space-y-1.5 md:space-y-2 pt-2" aria-label={`Fonctionnalités de ${service.title}`}>
            {service.features.map((feature, idx) => (
              <li 
                key={idx} 
                className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-400 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out" 
                style={{ transitionDelay: `${100 + (idx * 50)}ms` }}
              >
                <div className={`p-1 rounded bg-white/5 ${feature.colorClass}`} aria-hidden="true">
                  <feature.icon className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} aria-hidden="true" />
                </div>
                <span className="font-medium line-clamp-1">{feature.text}</span>
              </li>
            ))}
          </ul>
          
          {/* Bouton d'action */}
          <div className="pt-3 md:pt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ transitionDelay: '250ms' }}>
            <Link 
              to={service.link} 
              className="group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-4 md:py-3.5 md:px-6 bg-aldas hover:bg-white text-white hover:text-aldas-dark font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-aldas/40 overflow-hidden relative text-xs md:text-sm"
              aria-label={`Découvrir le service ${service.title} - ${service.badge}`}
              itemProp="url"
            >
              <span className="relative z-10">Découvrir</span>
              <ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 transform group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" aria-hidden="true"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateur visuel "Plus" - décoratif */}
      <div 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
          <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} aria-hidden="true" />
        </div>
      </div>
      
      {/* ✅ Informations pour les lecteurs d'écran (sr-only) */}
      <span className="sr-only" aria-live="polite">
        Service {index + 1} sur {total} : {service.title}
      </span>
    </article>
  );
};

export default ServiceGrid;