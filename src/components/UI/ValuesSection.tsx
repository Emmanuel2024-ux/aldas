// src/components/UI/ValuesSection.tsx
import type { LucideIcon } from 'lucide-react';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string; // ex: 'text-amber-500'
  bg: string;    // ex: 'bg-amber-50'
}

interface ValuesSectionProps {
  title?: string;
  subtitle?: string;
  values: ValueItem[];
  className?: string;
}

const ValuesSection = ({ 
  title = "Nos Valeurs", 
  subtitle, 
  values, 
  className = "" 
}: ValuesSectionProps) => {
  return (
    <section className={`py-24 bg-gray-50 relative overflow-hidden ${className}`}>
      {/* Déco fond subtile */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aldas/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* En-tête de section avec AOS */}
        <div 
          className="text-center mb-16 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {subtitle && (
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-aldas uppercase bg-aldas/10 rounded-full border border-aldas/20"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {subtitle}
            </span>
          )}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {title}
          </h2>
          <div 
            className="w-24 h-1.5 bg-gradient-to-r from-transparent via-aldas to-transparent mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            data-aos="fade-in"
            data-aos-delay="400"
          ></div>
        </div>

        {/* Grille des valeurs avec Cascade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-aldas/10 transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay={100 + (idx * 100)} // Cascade : 100ms, 200ms, 300ms, 400ms...
            >
              {/* Effet de lueur interne au survol */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-${v.color.split('-')[1]}-50/30 to-transparent pointer-events-none`}></div>
              
              <div className="relative z-10 w-full">
                {/* Icône dans un conteneur animé */}
                <div 
                  className={`w-20 h-20 mx-auto rounded-2xl ${v.bg} ${v.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-inner border border-white/50`}
                  data-aos="zoom-in"
                  data-aos-delay={300 + (idx * 100)}
                  data-aos-duration="900"
                >
                  <v.icon size={36} strokeWidth={1.5} className="transform group-hover:scale-90 transition-transform duration-500" />
                </div>
                
                <h3 
                  className="text-xl font-bold text-gray-900 mb-3 tracking-tight"
                  data-aos="fade-in"
                  data-aos-delay={400 + (idx * 100)}
                >
                  {v.title}
                </h3>
                <p 
                  className="text-gray-600 text-sm leading-relaxed font-light"
                  data-aos="fade-in"
                  data-aos-delay={500 + (idx * 100)}
                >
                  {v.text}
                </p>
              </div>

              {/* Ligne décorative bas de carte */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;