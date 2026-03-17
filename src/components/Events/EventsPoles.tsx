// src/components/Events/PolesSection.tsx
import { Briefcase, Target, Users, Home, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- TYPES ---
interface PoleItem {
  badge: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  list: string[];
  link?: string;
}

interface PolesSectionProps {
  items?: PoleItem[];
}

// --- DONNÉES PAR DÉFAUT ---
const defaultPoles: PoleItem[] = [
  {
    badge: 'Corporate',
    icon: Briefcase,
    title: 'Solutions Corporate',
    desc: 'Un accompagnement complet pour structurer et sublimer la communication interne et externe des entreprises.',
    imageSrc: 'https://heroiksevent.com/wp-content/uploads/2025/06/18.webp',
    imageAlt: 'Événement Corporate',
    list: ['Séminaires & conventions', 'Team-building & cohésion', 'Lancements corporate', 'Scénographie & technique'],
    link: '/contact'
  },
  {
    badge: 'Activation',
    icon: Target,
    title: 'Activation & Engagement',
    desc: 'Des dispositifs impactants pour renforcer la visibilité, l\'engagement et la proximité avec vos audiences.',
    imageSrc: 'https://pictures.latribune.fr/cdn-cgi/image/format=auto,width=1200,height=675/media/melody/2025/10/24/la-gsma-lassociation-mondiale-des-operateurs-telecoms-a-reuni-a-kigali-les-acteurs-majeurs-du-secteu-1761281814_e1a0fdb71af86c5a0fdb71af8f9a0fv_.jpg',
    imageAlt: 'Activation de marque',
    list: ['Roadshows & tournées', 'Brand activation', 'Expériences immersives', 'Animations interactives'],
    link: '/contact'
  },
  {
    badge: 'Grand Public',
    icon: Users,
    title: 'Événements Grand Public',
    desc: 'Des événements d\'envergure conçus pour rassembler, divertir et créer des expériences mémorables.',
    imageSrc: 'https://images.ladepeche.fr/api/v1/images/view/66823731c25830128520b0e2/large/image.jpg?v=1',
    imageAlt: 'Festival Grand Public',
    list: ['Concerts & festivals', 'Gestion de flux', 'Installations techniques', 'Scénographie événementielle'],
    link: '/contact'
  },
  {
    badge: 'Institutionnel',
    icon: Home,
    title: 'Projets Institutionnels',
    desc: 'Une maîtrise rigoureuse des protocoles officiels et des enjeux stratégiques des institutions publiques.',
    imageSrc: 'https://www.linfodrome.com/media/article/images/src/116470-design-sans-titre-2025-12-12t125646615.webp',
    imageAlt: 'Cérémonie Institutionnelle',
    list: ['Cérémonies officielles', 'Inaugurations', 'Gestion protocolaire', 'Dispositifs premium'],
    link: '/contact'
  }
];

const PolesSection = ({ items = defaultPoles }: PolesSectionProps) => {
  // Couleurs personnalisées "Bleu Nuit"
  const colors = {
    title: '#0f172a',      // Slate 900 (Noir bleuté très profond)
    text: '#334155',       // Slate 700 (Gris bleuté lisible)
    list: '#1e293b',       // Slate 800 (Noir doux)
    accent: '#21650e',     // Même que titre pour les bordures
    iconBg: '#f1f5f9',     // Slate 100 (Fond icône très pâle)
  };

  return (
    <section className="py-10 md:py-14 bg-white relative overflow-hidden" aria-labelledby="services-title">
      {/* Déco fond subtile */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <h2 id="services-title" className="sr-only">Services haut de gamme Áldás</h2>

      <div className="container mx-auto px-2 max-w-7xl relative z-10 space-y-5 md:space-y-10">
        
        {items.map((pole, index) => {
          const isReverse = index % 2 !== 0;

          return (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 ${isReverse ? 'md:flex-row-reverse' : ''}`}
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              
              {/* --- COLONNE IMAGE --- */}
              <div className="w-full md:w-1/2 relative group shrink-0">
                {/* Cadre Dégradé Animé Subtil */}
                <div 
                  className="relative p-[3px] rounded-[16px] md:rounded-[20px] shadow-md transition-shadow duration-500 group-hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #3b82f6, #14b8a6)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 8s ease infinite'
                  }}
                >
                  <div className="absolute inset-[3px] bg-white rounded-[14px] md:rounded-[18px] z-10"></div>
                  
                  <img 
                    src={pole.imageSrc}
                    alt={pole.imageAlt}
                    loading="lazy"
                    className="relative z-20 w-full h-[240px] md:h-[300px] object-cover rounded-[12px] md:rounded-[16px] transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    width="600"
                    height="400"
                  />
                </div>
              </div>

              {/* --- COLONNE TEXTE (Alignée Gauche, Bouton à Droite) --- */}
              <div className="w-full md:w-1/2 flex flex-col justify-center mt-4 md:mt-0 text-left">
                
                {/* En-tête : Badge à Gauche | Bouton à Droite (Alignés) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" data-aos="fade-down" data-aos-delay="200">
                
                {/* BADGE (Gauche) */}
                <span 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-slate-200 bg-slate-50 whitespace-nowrap"
                    style={{ color: colors.text }}
                >
                    <Sparkles size={10} className="text-emerald-600" />
                    {pole.badge}
                </span>

                {/* BOUTON OUTLINE (Droite) */}
                {pole.link && (
                    <a 
                    href={pole.link}
                    className="group inline-flex items-center gap-2 px-4 py-2 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest border-2 rounded-lg md:rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
                    style={{ 
                        borderColor: colors.accent, 
                        color: colors.accent 
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.accent;
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.accent;
                    }}
                    title={`Demander un devis pour ${pole.title}`}
                    >
                    Obtenir un devis
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                )}
                </div>

                {/* Titre */}
                <h3 
                  className="font-bold mb-4 md:mb-5 flex items-center gap-3 text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight"
                  style={{ color: colors.title }}
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl" style={{ backgroundColor: colors.iconBg }}>
                    <pole.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} style={{ color: colors.title }} />
                  </div>
                  {pole.title}
                </h3>

                {/* Description */}
                <p 
                  className="mb-6 text-sm md:text-base leading-relaxed font-light max-w-xl"
                  style={{ color: colors.text }}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {pole.desc}
                </p>

                {/* Liste */}
                <ul className="list-none p-0 m-0 space-y-2.5 mb-8">
                  {pole.list.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-2.5 text-sm md:text-base font-medium group/list"
                      style={{ color: colors.list }}
                      data-aos="fade-left"
                      data-aos-delay={500 + (i * 80)}
                    >
                      <CheckCircle className="shrink-0 mt-0.5" size={16} strokeWidth={2.5} style={{ color: '#10b981' }} />
                      <span className="transition-colors duration-300 group-hover/list:text-emerald-700">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default PolesSection;