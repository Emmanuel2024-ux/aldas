// src/components/UI/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "smooth" pour un défilement doux, "auto" pour un saut instantané
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' 
    });
  }, [pathname]); // Se déclenche à chaque changement de chemin (pathname)

  return null; // Ce composant n'affiche rien visuellement
};

export default ScrollToTop;