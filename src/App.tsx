// src/App.tsx
import { useState, useEffect } from 'react'; // <--- 1. Import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/UI/ScrollToTop';
import Preloader from './components/UI/Preloader'; // <--- 2. Import Preloader

// Import des Layouts
import MainLayout from './layouts/MainLayout';
import PlainLayout from './layouts/PlainLayout';

// Import des Pages
import Home from './pages/Home';
import About from './pages/About';
import Navette from './pages/services/Navette';
import Mobilite from './pages/services/Mobilite';
import Contact from './pages/Contact';
import Conciergerie from './pages/services/conciergerie';
import Evenementiel from './pages/services/evenements';
import Catalogue from './pages/services/Catalogue';
import NotFound from './pages/NotFound';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Optionnel : Vérifier si le navigateur a déjà mis en cache les ressources
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('aldas-loaded');
    if (hasLoadedBefore) {
      setIsLoading(false);
    }
  }, []);

  const handlePreloaderFinish = () => {
    setIsLoading(false);
    sessionStorage.setItem('aldas-loaded', 'true'); // Mémoriser pour les prochaines navigations
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* Affichage du Preloader si isLoading est vrai */}
      {isLoading && <Preloader onFinish={handlePreloaderFinish} />}

      {/* Le reste du site n'est rendu que si le preloader est fini (optionnel, mais recommandé pour perf) */}
      {/* Ou simplement masqué visuellement via CSS, ici on laisse rendu pour garder l'état React */}
      <div className={isLoading ? 'invisible h-0 overflow-hidden' : 'visible'}>
        <Routes>
          {/* --- GROUPE 1 : PAGES AVEC HEADER & FOOTER --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            
            <Route path="services">
              <Route path="mobilite" element={<Mobilite />} />
              <Route path="navette" element={<Navette />} />
              <Route path="conciergerie" element={<Conciergerie />} />
              <Route path="evenements" element={<Evenementiel />} />
            </Route>
          </Route>

          {/* --- GROUPE 2 : PAGES SANS HEADER & FOOTER --- */}
          <Route path="/" element={<PlainLayout />}>
            <Route path="services/catalogue" element={<Catalogue />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;