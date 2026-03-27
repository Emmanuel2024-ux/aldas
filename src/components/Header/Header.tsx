// src/components/Header/Header.tsx
import { useState, useEffect, useMemo } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Détection prefers-reduced-motion pour optimiser le scroll listener
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    // Optimisation : pas de listener si reduced-motion (moins de re-renders)
    if (prefersReducedMotion) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <header 
      className="w-full relative z-[9998]"
      role="banner"
      aria-label="En-tête du site ÁLDÁS CI - Navigation et informations de contact"
    >
      <TopBar />
      <Navbar isScrolled={isScrolled} />
    </header>
  );
};

export default Header;