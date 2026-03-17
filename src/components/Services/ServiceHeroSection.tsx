// src/components/Services/ServiceHeroSection.tsx
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceHeroSectionProps {
  headline: string;
  ctaLink?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const ServiceHeroSection = ({
  headline,
  ctaLink = "/contact",
  ctaText = "Contactez-nous",
  backgroundImage = "https://www.africaguestservices.com/img/agency/portfolio/carousel/AdobeStock_78477370.jpeg"
}: ServiceHeroSectionProps) => {
  
  // Fonction pour parser et styliser le texte
  const renderHeadline = () => {
    if (!headline) return null;
    
    const parts = headline.split(/(<span class="highlight">.*?<\/span>)/g);
    
    return parts.map((part, index) => {
      if (part.includes('<span class="highlight">')) {
        const text = part.replace(/<span class="highlight">|<\/span>/g, '');
        // STYLE DES MOTS CLÉS : Plus grand, plus gras, couleur dégradée vive
        return (
          <span 
            key={`highlight-${index}`} 
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f2ff] via-[#00c3ff] to-[#00f26c] font-extrabold drop-shadow-[0_0_15px_rgba(0,195,255,0.4)] mx-1 break-words inline-block"
          >
            {text}
          </span>
        );
      }
      // STYLE DU TEXTE NORMAL : Plus petit, plus fin, blanc cassé
      return <span key={`text-${index}`} className="text-white/90 font-light">{part}</span>;
    });
  };

  return (
    // Conteneur Principal : Hauteur 80vh, Overflow Hidden crucial pour le fixed background
    <section className="relative w-full h-[75vh] flex items-center bg-white overflow-hidden"
      data-aos="fade-in"
      data-aos-duration="1200"
    >
      
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed', // C'est ceci qui fige l'image
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Overlay Dégradé Intelligent (Assombrit pour lire le texte) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 backdrop-blur-[1px]"></div>
      </div>

      {/* --- CONTENU (Z-Index Supérieur) --- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
        
        {/* Titre avec Hiérarchie Visuelle */}
        <h2 
          className="text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-light tracking-wide drop-shadow-lg"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {renderHeadline()}
        </h2>

        {/* Double Soulignement "Néon Fin" */}
        <div 
          className="relative w-24 md:w-32 h-2 mx-auto"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff] to-[#00c3ff] rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00c3ff] via-[#00f2ff] to-transparent rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]"></div>
        </div>

        {/* Bouton Outline "Glass" */}
        <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
          <Link 
            to={ctaLink}
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-3.5 border border-white/30 text-white font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs rounded-full hover:bg-white hover:text-gray-900 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] backdrop-blur-md overflow-hidden"
          >
            {/* Effet de brillance */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            <span className="relative z-10">{ctaText}</span>
            <ArrowRight size={16} className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServiceHeroSection;