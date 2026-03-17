// src/components/Services/ServiceGrid.tsx
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { getOtherServices, type ServiceItem } from '../../data/servicesData';
import ServiceHeroSection from './ServiceHeroSection'; // Correction du nom d'import
import ModernHR from '../UI/ModernHR';

interface ServiceGridProps {
  currentSlug?: string | null;
  title?: string;
  heroTitle?: string | null; // Rendu optionnel explicite
}

const ServiceGrid = ({ currentSlug, title = "Nos Autres Services", heroTitle }: ServiceGridProps) => {
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
       
      {/* Section Grille */}
      <section className="py-14 bg-white relative overflow-hidden">
       
        <div className="container mx-auto px-4 relative z-10">
          
          <ModernHR/>
           
          <h5 className="text-3xl pb-2" data-aos="fade-up" data-aos-delay="300">
            {sectionTitle}
          </h5>

          {/* Grille des services */}
          <div className={gridClass}>
            {displayedServices.map((service, index) => (
              <div
                key={service.slug}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={100 + (index * 150)}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SOUS-COMPOSANT CARTE PREMIUM ---
const ServiceCard = ({ service }: { service: ServiceItem }) => {
  return (
    <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-aldas/20 transition-all duration-700 ease-out transform hover:-translate-y-2 bg-gray-900">
      {/* Image de fond */}
      <div className="absolute inset-0 w-full h-full">
        <img src={service.img} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1000ms] ease-out" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 group-hover:to-black/90 transition-colors duration-500"></div>
      </div>

      {/* Contenu toujours visible */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-start h-full pointer-events-none">
        <div className="self-start mb-4 transform translate-y-0 opacity-100 transition-all duration-500">
          <span className="px-3 py-1 md:px-4 md:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
            {service.badge}
          </span>
        </div>
        <div className="mt-auto mb-4 transform transition-transform duration-500">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">{service.title}</h3>
          <p className="text-aldas-light font-medium text-xs md:text-sm tracking-wide opacity-90">{service.subtitle}</p>
        </div>
      </div>

      {/* Panneau de détails (Reveal Effect) */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-full flex flex-col justify-end p-6 md:p-8 pt-32 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <div className="space-y-3 md:space-y-4 overflow-hidden">
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-3 border-l-2 border-aldas pl-3 md:pl-4">{service.details}</p>
          <ul className="space-y-1.5 md:space-y-2 pt-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-400 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ transitionDelay: `${100 + (idx * 50)}ms` }}>
                <div className={`p-1 rounded bg-white/5 ${feature.colorClass}`}>
                  <feature.icon className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} />
                </div>
                <span className="font-medium line-clamp-1">{feature.text}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 md:pt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ transitionDelay: '250ms' }}>
            <Link to={service.link} className="group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-4 md:py-3.5 md:px-6 bg-aldas hover:bg-white text-white hover:text-aldas-dark font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-aldas/40 overflow-hidden relative text-xs md:text-sm">
              <span className="relative z-10">Découvrir</span>
              <ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateur visuel "Plus" */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
          <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;