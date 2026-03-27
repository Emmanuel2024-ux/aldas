// src/components/Header/Navbar.tsx
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Menu, X, ChevronDown, CarFront, Users, Stars, Gem, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/logo.png'; // ✅ WebP optimisé

// --- TYPES ---
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const services: NavItem[] = [
  { label: 'Location de voiture', href: '/services/mobilite', icon: CarFront },
  { label: 'Service de navette', href: '/services/navette', icon: Users },
  { label: 'Agence événementielle', href: '/services/evenements', icon: Stars },
  { label: 'Conciergerie', href: '/services/conciergerie', icon: Gem },
];

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  
  // ✅ Référence pour le focus trap dans le menu mobile
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Helper pour vérifier si un lien est actif
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  const isServicesActive = useMemo(() => 
    services.some(s => location.pathname.startsWith(s.href)), 
    [location.pathname]
  );
  const isContactActive = isActive('/contact');

  // ✅ Classes utilitaires mémoïsées
  const getLinkClasses = useCallback((path: string) => {
    const active = isActive(path);
    return `relative px-3 py-2.5 rounded-lg text-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-white ${
      active 
        ? 'text-aldas bg-aldas/10' 
        : 'text-black hover:text-aldas hover:bg-gray-50'
    }`;
  }, [isActive]);

  // ✅ Fermer le menu mobile
  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    // Restaurer le focus sur le bouton burger
    document.querySelector<HTMLButtonElement>('[aria-label="Menu"]')?.focus();
  }, []);

  // ✅ Focus trap pour le menu mobile
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      // Focus sur le premier élément
      firstFocusableRef.current?.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = mobileMenuRef.current?.querySelectorAll(
            'a[href], button'
          );
          if (focusableElements?.length) {
            const first = focusableElements[0] as HTMLElement;
            const last = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMobileMenu();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      // Bloquer le scroll du body
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, closeMobileMenu]);

  // ✅ Gestionnaire de clic pour les liens du menu mobile
  const handleMobileLinkClick = useCallback(() => {
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <>
      {/* ✅ Skip Link pour accessibilité (premier élément focusable) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-aldas focus:text-white focus:rounded-lg focus:font-medium"
      >
        Aller au contenu principal
      </a>

      <nav 
        className={`fixed top-12 left-0 w-full z-[55] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-md py-3' 
            : 'bg-white/95 backdrop-blur-sm shadow-sm py-5'
        }`}
        role="navigation"
        aria-label="Navigation principale du site ÁLDÁS CI"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            
            {/* LOGO avec aria-label */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-white rounded"
              aria-label="ÁLDÁS CI - Page d'accueil"
            >
              <img 
                src={logo} 
                alt="ÁLDÁS CI - Logo de l'entreprise de services premium à Abidjan" 
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? 'h-8 w-auto' : 'h-10 w-auto'
                }`}
                width={160}
                height={40}
                loading="eager" // Logo chargé en priorité
              />
            </Link>

            {/* MENU DESKTOP */}
            <div className="hidden md:flex items-center gap-2">
              
              {/* LIEN ACCUEIL */}
              <Link 
                to="/" 
                className={getLinkClasses('/')}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Accueil
              </Link>

              {/* DROPDOWN SERVICES avec accessibilité */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                onFocus={() => setIsServicesOpen(true)}
                onBlur={(e) => {
                  // Fermer seulement si le focus sort du dropdown entier
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsServicesOpen(false);
                  }
                }}
              >
                <button 
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-white ${
                    isServicesOpen || isServicesActive
                      ? 'text-aldas bg-aldas/10' 
                      : 'text-black hover:text-aldas hover:bg-gray-50'
                  }`}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-controls="services-dropdown"
                  aria-label="Menu des services - Location, Navette, Événementiel, Conciergerie"
                >
                  Nos services 
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-500 ${isServicesOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true" 
                  />
                </button>

                {/* Zone tampon invisible pour éviter les fermetures accidentelles */}
                <div className="absolute top-full left-0 w-full h-4 bg-transparent" aria-hidden="true" />

                {/* Menu Déroulant avec ID pour aria-controls */}
                <div 
                  id="services-dropdown"
                  className={`absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transform transition-all duration-300 origin-top border border-gray-100 ${
                    isServicesOpen 
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                  role="menu"
                  aria-label="Liste des services ÁLDÁS CI"
                >
                  <div className="py-2" role="none">
                    {services.map((service) => (
                      <Link
                        key={service.label}
                        to={service.href}
                        className="relative flex items-center gap-4 px-5 py-3 overflow-hidden group/item focus:outline-none focus:bg-gray-50"
                        role="menuitem"
                        aria-label={`Service ${service.label} - Accéder à la page`}
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {/* Background glissant - décoratif */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-aldas/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500 ease-out" aria-hidden="true" />
                        
                        {/* Indicateur latéral animé - décoratif */}
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-aldas rounded-r-full group-hover/item:h-8 transition-all duration-300" aria-hidden="true" />

                        {/* Contenu */}
                        <div className={`relative flex items-center gap-4 transform ${!prefersReducedMotion ? 'transition-transform duration-300 group-hover/item:translate-x-1' : ''}`}>
                          <div className={`p-2 rounded-lg transition-colors duration-300 ${
                            isActive(service.href) ? 'bg-aldas text-white' : 'bg-gray-50 text-gray-500 group-hover/item:bg-aldas group-hover/item:text-white'
                          }`} aria-hidden="true">
                            <service.icon size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-md font-semibold transition-colors duration-300 ${
                              isActive(service.href) ? 'text-aldas' : 'text-gray-800 group-hover/item:text-black'
                            }`}>
                              {service.label}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-75">
                              Découvrir
                            </span>
                          </div>
                        </div>
                        
                        {/* Flèche discrète - décorative */}
                        <ArrowRight size={16} className={`absolute right-5 text-aldas opacity-0 group-hover/item:opacity-100 ${!prefersReducedMotion ? 'transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300' : ''}`} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                  
                  {/* Pied du menu */}
                  <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-50">
                    <Link 
                      to="/contact" 
                      className="text-xs font-bold text-aldas hover:text-aldas-dark flex items-center gap-1.5 group/link transition-colors focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-white rounded"
                      role="menuitem"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Besoin d'aide pour choisir ?
                      <ArrowRight size={14} className={`transform ${!prefersReducedMotion ? 'group-hover/link:translate-x-1 transition-transform' : ''}`} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* LIEN QUI SOMMES-NOUS */}
              <Link 
                to="/about" 
                className={getLinkClasses('/about')}
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                Qui sommes-nous ?
              </Link>

              {/* BOUTON CONTACT */}
              <Link 
                to="/contact" 
                className={`
                  ml-2 px-6 py-2.5 rounded-full text-md font-bold transition-all duration-300 ${!prefersReducedMotion ? 'transform hover:-translate-y-0.5 active:scale-95' : ''} focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 focus:ring-offset-white
                  ${
                    isContactActive
                      ? 'bg-aldas text-white shadow-lg shadow-aldas/30'
                      : 'bg-transparent text-aldas border-2 border-aldas hover:bg-aldas hover:text-white hover:shadow-lg hover:shadow-aldas/30 focus:bg-aldas focus:text-white focus:shadow-lg focus:shadow-aldas/30'
                  }
                `}
                aria-current={isContactActive ? 'page' : undefined}
              >
                Contacts
              </Link>
            </div>

            {/* BURGER MOBILE avec aria-expanded */}
            <button 
              className="md:hidden p-2 text-black focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-white rounded"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Menu Mobile avec focus trap */}
        {isOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-2 animate-fade-in-down"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
             <Link 
               to="/" 
               className={`px-4 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 ${isActive('/') ? 'bg-aldas/10 text-aldas' : 'text-gray-800'}`} 
               onClick={handleMobileLinkClick}
               ref={firstFocusableRef}
               aria-current={isActive('/') ? 'page' : undefined}
             >
               Accueil
             </Link>
             
             <div className="px-4 py-2" role="group" aria-label="Nos services">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nos Services</p>
               {services.map((s, index) => (
                 <Link 
                   key={s.label} 
                   to={s.href} 
                   className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 ${isActive(s.href) ? 'bg-aldas/10 text-aldas' : 'text-gray-600'}`} 
                   onClick={handleMobileLinkClick}
                   aria-current={isActive(s.href) ? 'page' : undefined}
                   // Focus sur le dernier élément pour le focus trap
                   ref={index === services.length - 1 ? lastFocusableRef : null}
                 >
                   <s.icon size={18} aria-hidden="true" />
                   <span className="font-medium">{s.label}</span>
                 </Link>
               ))}
             </div>

             <Link 
               to="/about" 
               className={`px-4 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 ${isActive('/about') ? 'bg-aldas/10 text-aldas' : 'text-gray-800'}`} 
               onClick={handleMobileLinkClick}
               aria-current={isActive('/about') ? 'page' : undefined}
             >
               À propos
             </Link>
             
             {/* Bouton Contact Mobile */}
             <Link 
               to="/contact" 
               className={`mt-2 px-4 py-3 rounded-lg font-bold text-center shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 ${
                 isContactActive ? 'bg-aldas text-white' : 'bg-white text-aldas border-2 border-aldas'
               }`} 
               onClick={handleMobileLinkClick}
               aria-current={isContactActive ? 'page' : undefined}
             >
               Contacts
             </Link>
          </div>
        )}
      </nav>

      {/* ✅ Styles CSS pour reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
          .group-hover\\:scale-110:hover,
          .group-hover\\:rotate-12:hover,
          .group-hover\\:translate-x-1:hover {
            transform: none !important;
          }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;