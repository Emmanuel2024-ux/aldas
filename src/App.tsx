// src/App.tsx
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Components UI
import ScrollToTop from './components/UI/ScrollToTop';
import Preloader from './components/UI/Preloader';

// ✅ Layouts
import MainLayout from './layouts/MainLayout';
import PlainLayout from './layouts/PlainLayout';

// ✅ Pages principales
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// ✅ Pages services (PascalCase pour cohérence)
import Mobilite from './pages/services/Mobilite';
import Navette from './pages/services/Navette';
import Catalogue from './pages/services/Catalogue';
import Evenementiel from './pages/services/evenements';
import Conciergerie from './pages/services/conciergerie';
import { usePageView } from './utils/analytics';


// ============================================================================
// 🎯 COMPOSANT WRAPPER POUR TRACKING DES PAGES
// ============================================================================
// Entoure chaque page pour tracker automatiquement les vues
const PageTracker = ({ children, pageTitle }: { children: React.ReactNode; pageTitle: string }) => {
  usePageView(window.location.pathname, pageTitle);
  return <>{children}</>;
};

// ============================================================================
// 🚀 COMPOSANT PRINCIPAL
// ============================================================================
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Décaler setState pour éviter le warning React "cascade render"
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('aldas-loaded');
    if (hasLoadedBefore) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // ✅ Callback mémoïsé pour le preloader
  const handlePreloaderFinish = useCallback(() => {
    setIsLoading(false);
    sessionStorage.setItem('aldas-loaded', 'true');
  }, []);

  return (
    <BrowserRouter>
      {/* ✅ Scroll vers le haut à chaque navigation */}
      <ScrollToTop />
      
      {/* ✅ Preloader global */}
      {isLoading && <Preloader onFinish={handlePreloaderFinish} />}

      {/* ✅ Contenu principal - masqué visuellement pendant le chargement */}
      <div className={isLoading ? 'invisible h-0 overflow-hidden' : 'visible'}>
        <Routes>
          {/* ========================================================================
              GROUPE 1 : Pages AVEC Header & Footer (MainLayout)
              ======================================================================== */}
          <Route 
            element={
              <PageTracker pageTitle="ÁLDÁS CI">
                <MainLayout />
              </PageTracker>
            }
          >
            <Route index element={<Home />} />
            <Route path="about" element={
              <PageTracker pageTitle="À propos - ÁLDÁS CI">
                <About />
              </PageTracker>
            } />
            <Route path="contact" element={
              <PageTracker pageTitle="Contact - ÁLDÁS CI">
                <Contact />
              </PageTracker>
            } />
            
            {/* Services avec MainLayout */}
            <Route path="services">
              <Route path="mobilite" element={
                <PageTracker pageTitle="Location de Voitures - ÁLDÁS CI">
                  <Mobilite />
                </PageTracker>
              } />
              <Route path="navette" element={
                <PageTracker pageTitle="Navettes & Transferts - ÁLDÁS CI">
                  <Navette />
                </PageTracker>
              } />
              <Route path="conciergerie" element={
                <PageTracker pageTitle="Conciergerie Premium - ÁLDÁS CI">
                  <Conciergerie />
                </PageTracker>
              } />
              <Route path="evenements" element={
                <PageTracker pageTitle="Agence Événementielle - ÁLDÁS CI">
                  <Evenementiel />
                </PageTracker>
              } />
            </Route>
          </Route>

          {/* ========================================================================
              GROUPE 2 : Pages SANS Header & Footer (PlainLayout)
              ======================================================================== */}
          <Route 
            element={
              <PageTracker pageTitle="Catalogue - ÁLDÁS CI">
                <PlainLayout />
              </PageTracker>
            }
          >
            <Route path="services/catalogue" element={<Catalogue />} />
          </Route>

          {/* ========================================================================
              404 - Toujours avec PlainLayout (page d'erreur simple)
              ======================================================================== */}
          <Route 
            path="*" 
            element={
              <PageTracker pageTitle="Page non trouvée - ÁLDÁS CI">
                <PlainLayout>
                  <NotFound />
                </PlainLayout>
              </PageTracker>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;