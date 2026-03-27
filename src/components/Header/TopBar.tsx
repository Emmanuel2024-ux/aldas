// src/components/Header/TopBar.tsx
import { useMemo } from 'react';
import { Clock, Phone, MessageCircle, Facebook, Instagram, X } from 'lucide-react';

// --- COMPOSANT SOCIAL LINK OPTIMISÉ ---
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverBg: string;
}

const SocialLink = ({ href, icon, label, color}: SocialLinkProps) => (
  <a 
    href={href} 
    aria-label={label}
    className={`
      relative w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 
      flex items-center justify-center text-gray-500 
      ${color} 
      hover:bg-white hover:text-black 
      hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] 
      hover:border-white
      transition-all duration-500 ease-out
      overflow-hidden group
      focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#050505]
    `}
    rel="noopener noreferrer"
    target="_blank"
  >
    {/* Effet de brillance - décoratif */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
    
    <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
  </a>
);

const TopBar = () => {
  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    // ✅ Conteneur avec rôle sémantique
    <div 
      className="fixed top-0 left-0 w-full h-12 z-[60] bg-[#050505]/95 backdrop-blur-xl text-gray-400 text-xs flex items-center border-b border-white/5 shadow-2xl overflow-hidden"
      role="complementary"
      aria-label="Barre d'informations de contact et réseaux sociaux"
    >
      
      {/* Effets de fond - décoratifs donc aria-hidden */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_100%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aldas/40 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.6)]" aria-hidden="true" />

      <div className="container mx-auto px-4 flex justify-between items-center w-full max-w-7xl h-full relative z-10">
        
        {/* --- GAUCHE : INFORMATIONS CONTACT --- */}
        <div className="flex items-center gap-4 lg:gap-6 h-full" role="list" aria-label="Informations de contact">
          
          {/* Horaires */}
          <div className="flex items-center gap-2.5 group cursor-default shrink-0" role="listitem">
            <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-aldas/10 group-hover:border-aldas/30 transition-all duration-500 shadow-inner" aria-hidden="true">
              <Clock size={13} className={`text-aldas ${!prefersReducedMotion ? 'group-hover:scale-110 group-hover:rotate-[-10deg] transition-transform duration-500' : ''}`} />
            </div>
            <span className="whitespace-nowrap font-medium text-gray-400 group-hover:text-white transition-colors duration-300 hidden sm:inline tracking-wide">
              Lun–Ven : 7h–21h50
            </span>
            <span className="whitespace-nowrap font-medium text-gray-400 group-hover:text-white transition-colors duration-300 sm:hidden">
              7h–21h50
            </span>
          </div>

          {/* Séparateur - décoratif */}
          <div className="hidden lg:flex w-px h-3 bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-aldas/50 transition-colors duration-500" aria-hidden="true" />

          {/* Téléphone */}
          <a 
            href="tel:+2250749229874" 
            className="hidden lg:flex items-center gap-2.5 group hover:text-white transition-all duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#050505]"
            aria-label="Appeler ÁLDÁS CI au +225 07 49 22 98 74"
            role="listitem"
          >
            <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-aldas/10 group-hover:border-aldas/30 transition-all duration-500 shadow-inner" aria-hidden="true">
              <Phone size={13} className={`text-aldas ${!prefersReducedMotion ? 'group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500' : ''}`} />
            </div>
            <span className="whitespace-nowrap font-medium tracking-wide text-gray-400 group-hover:text-white transition-colors">
              +225 07 49 22 98 74
            </span>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/2250747265693" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group hover:text-green-400 transition-all duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
            aria-label="Contacter ÁLDÁS CI sur WhatsApp au +225 07 47 26 56 93"
            role="listitem"
          >
            <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-all duration-500 shadow-inner relative" aria-hidden="true">
              {/* Indicateur "En ligne" - décoratif */}
              <span className={`absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 ${prefersReducedMotion ? '' : 'animate-ping'}`}>
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-[#050505]"></span>
              </span>
              <MessageCircle size={13} className={`text-green-500 ${!prefersReducedMotion ? 'group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500' : ''}`} />
            </div>
            <span className="hidden md:inline-block whitespace-nowrap font-medium tracking-wide text-gray-400 group-hover:text-green-400 transition-colors">
              +225 07 47 26 56 93
            </span>
          </a>
        </div>

        {/* --- DROITE : RÉSEAUX SOCIAUX --- */}
        <div className="hidden lg:flex items-center gap-3 h-full border-l border-white/5 pl-6 shrink-0" role="navigation" aria-label="Réseaux sociaux d'ÁLDÁS CI">
          <SocialLink 
            href="https://www.facebook.com/aldas-ci" 
            icon={<Facebook size={15} aria-hidden="true" />} 
            color="hover:text-[#1877F2]" 
            hoverBg="hover:bg-[#1877F2]" 
            label="Suivre ÁLDÁS CI sur Facebook" 
          />
          <SocialLink 
            href="https://www.instagram.com/aldas-ci" 
            icon={<Instagram size={15} aria-hidden="true" />} 
            color="hover:text-[#E4405F]" 
            hoverBg="hover:bg-[#E4405F]" 
            label="Suivre ÁLDÁS CI sur Instagram" 
          />
          <SocialLink 
            href="https://www.linkedin.com/company/aldas-ci" 
            icon={<X size={15} aria-hidden="true" />} 
            color="hover:text-white" 
            hoverBg="hover:bg-white" 
            label="Suivre ÁLDÁS CI sur X (Twitter)" 
          />
        </div>

      </div>

      {/* ✅ Styles CSS pour reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
          .animate-ping {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar;