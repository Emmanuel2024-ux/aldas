// src/components/Header/Header.tsx
import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change l'état si on scrolle de plus de 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-[9998]">
      <TopBar />
      <Navbar isScrolled={isScrolled} />
    </header>
  );
};

export default Header;