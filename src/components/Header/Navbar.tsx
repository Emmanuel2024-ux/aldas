// src/components/Header/Navbar.tsx
import { useState } from 'react';
import { Menu, X, ChevronDown, CarFront, Users, Stars, Gem, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

const services: NavItem[] = [
  { label: 'Location de voiture', href: '/services/mobilite', icon: CarFront },
  { label: 'Service de navette', href: '/services/navette', icon: Users },
  { label: 'Agence événementielle', href: '/services/evenements', icon: Stars },
  { label: 'Conciergerie', href: '/services/conciergerie', icon: Gem },
];

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isContactActive = isActive('/contact');

  // Classes utilitaires pour les liens textes
  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `relative px-3 py-2.5 rounded-lg text-md font-medium transition-all duration-300 ${
      active 
        ? 'text-aldas bg-aldas/10' 
        : 'text-black hover:text-aldas hover:bg-gray-50'
    }`;
  };

  return (
    <nav 
      className={`fixed top-12 left-0 w-full z-[55] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-md py-3' 
          : 'bg-white/95 backdrop-blur-sm shadow-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src="/images/icon-1.png" 
              alt="Áldás Logo" 
              className={`transition-all duration-500 object-contain ${
                isScrolled ? 'h-8 w-auto' : 'h-10 w-auto'
              }`}
            />
            <span className="font-bold text-xl tracking-tight hidden sm:block text-black transition-colors duration-500">
              ÁLDÁS
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* LIEN ACCUEIL */}
            <Link to="/" className={getLinkClasses('/')}>
              Accueil
            </Link>

            {/* DROPDOWN SERVICES */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-md font-medium transition-all duration-300 ${
                isServicesOpen || location.pathname.startsWith('/services')
                  ? 'text-aldas bg-aldas/10' 
                  : 'text-black hover:text-aldas hover:bg-gray-50'
              }`}>
                Nos services 
                <ChevronDown size={16} className={`transition-transform duration-500 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Zone tampon invisible */}
              <div className="absolute top-full left-0 w-full h-4 bg-transparent"></div>

              {/* Menu Déroulant */}
              <div className={`absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transform transition-all duration-300 origin-top border border-gray-100 ${
                isServicesOpen 
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="py-2">
                  {services.map((service) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      className="relative flex items-center gap-4 px-5 py-3 overflow-hidden group/item"
                    >
                      {/* Background glissant */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-aldas/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500 ease-out"></span>
                      
                      {/* Indicateur latéral animé */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-aldas rounded-r-full group-hover/item:h-8 transition-all duration-300"></span>

                      {/* Contenu */}
                      <div className="relative flex items-center gap-4 transform transition-transform duration-300 group-hover/item:translate-x-1">
                        <div className={`p-2 rounded-lg transition-colors duration-300 ${
                          isActive(service.href) ? 'bg-aldas text-white' : 'bg-gray-50 text-gray-500 group-hover/item:bg-aldas group-hover/item:text-white'
                        }`}>
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
                      
                      {/* Flèche discrète */}
                      <ArrowRight size={16} className="absolute right-5 text-aldas opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
                
                {/* Pied du menu */}
                <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-50">
                  <Link to="/services" className="text-xs font-bold text-aldas hover:text-aldas-dark flex items-center gap-1.5 group/link transition-colors">
                    Voir tous les services 
                    <ArrowRight size={14} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* LIEN QUI SOMMES-NOUS */}
            <Link to="/about" className={getLinkClasses('/about')}>
              Qui sommes-nous ?
            </Link>

            {/* BOUTON CONTACT (Style Outline -> Solid au Hover/Focus/Active) */}
            <Link 
              to="/contact" 
              className={`
                ml-2 px-6 py-2.5 rounded-full text-md font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95
                ${
                  isContactActive
                    ? 'bg-aldas text-white shadow-lg shadow-aldas/30' // État Actif : Plein (Solid)
                    : 'bg-transparent text-aldas border-2 border-aldas hover:bg-aldas hover:text-white hover:shadow-lg hover:shadow-aldas/30 focus:bg-aldas focus:text-white focus:shadow-lg focus:shadow-aldas/30' // État Normal : Outline (Transparent + Bordure)
                }
              `}
            >
              Contacts
            </Link>
          </div>

          {/* BURGER MOBILE */}
          <button 
            className="md:hidden p-2 text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-2 animate-fade-in-down">
           <Link to="/" className={`px-4 py-3 rounded-lg font-medium ${isActive('/') ? 'bg-aldas/10 text-aldas' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>Accueil</Link>
           
           <div className="px-4 py-2">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nos Services</p>
             {services.map((s) => (
               <Link key={s.label} to={s.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 ${isActive(s.href) ? 'bg-aldas/10 text-aldas' : 'text-gray-600'}`} onClick={() => setIsOpen(false)}>
                 <s.icon size={18} />
                 <span className="font-medium">{s.label}</span>
               </Link>
             ))}
           </div>

           <Link to="/about" className={`px-4 py-3 rounded-lg font-medium ${isActive('/about') ? 'bg-aldas/10 text-aldas' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>À propos</Link>
           
           {/* Bouton Contact Mobile (Toujours plein pour faciliter le clic tactile) */}
           <Link to="/contact" className={`mt-2 px-4 py-3 rounded-lg font-bold text-center shadow-md transition-all ${
             isContactActive ? 'bg-aldas text-white' : 'bg-white text-aldas border-2 border-aldas'
           }`} onClick={() => setIsOpen(false)}>
             Contacts
           </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;