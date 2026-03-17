// src/components/Conciergerie/AptitudesSection.tsx
import type { LucideIcon } from 'lucide-react'; // Pour supporter aussi bien des icônes Lucide que des images

interface AptitudeItem {
  iconSrc?: string; // URL de l'image (comme dans ton code original)
  iconComponent?: LucideIcon; // Ou une icône Lucide (optionnel)
  title: string;
  text: string;
}

interface AptitudesSectionProps {
  items: AptitudeItem[];
}

const AptitudesSection = ({ items }: AptitudesSectionProps) => {
  return (
    <section 
      className="relative py-12 md:py-20 overflow-hidden bg-white"
      style={{
        // Reproduction exacte du background-image multiple CSS
        backgroundImage: `
          url("https://www.destiny-conciergerie.net/sites/default/files/frise-left.webp"),
          url("https://www.destiny-conciergerie.net/sites/default/files/frise-right.webp")
        `,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '22%, 22%',
        backgroundPosition: 'left bottom, right top'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto" data-aos="fade-up">
          <h2 
            className="font-bold text-[#0b2545] mb-2 md:mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)' }}
          >
            Nos <span className="font-extrabold" style={{ color: '#00b894' }}>aptitudes clés</span>
          </h2>
          <p 
            className="text-[#5f6f82] font-light mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '600px' }}
          >
            Trois piliers essentiels qui définissent l'excellence de notre conciergerie.
          </p>
        </div>

        {/* Grille Dynamique (s'adapte au nombre d'items) */}
        <div className={`grid gap-8 md:gap-10 justify-center mx-auto ${
          items.length === 1 ? 'max-w-lg grid-cols-1' :
          items.length === 2 ? 'max-w-3xl grid-cols-1 md:grid-cols-2' :
          items.length === 3 ? 'max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          
          {items.map((apt, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[18px] p-6 md:p-8 text-center border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all duration-350 ease-out hover:transform hover:-translate-y-2 hover:shadow-xl h-full flex flex-col"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Icône (Image ou Composant) */}
              <div 
                className="w-[150px] h-[150px] md:w-[190px] md:h-[190px] mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,184,148,0.12)' }}
              >
                {apt.iconSrc ? (
                  <img 
                    src={apt.iconSrc} 
                    alt={apt.title} 
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                ) : apt.iconComponent ? (
                  <apt.iconComponent size={80} className="text-[#00b894]" strokeWidth={1.5} />
                ) : null}
              </div>

              {/* Titre */}
              <h3 
                className="font-bold text-[#0b2545] mb-3 md:mb-4"
                style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)' }}
              >
                {apt.title}
              </h3>

              {/* Texte */}
              <p 
                className="text-[#5f6f82] font-light leading-[1.7] flex-grow"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                dangerouslySetInnerHTML={{ __html: apt.text.replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-semibold text-[#0b2545]">$1</strong>') }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AptitudesSection;