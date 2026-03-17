// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import des Layouts
import MainLayout from './layouts/MainLayout';       // Avec Header/Footer
import PlainLayout from './layouts/PlainLayout';     // Sans Header/Footer

// Import des Pages
import Home from './pages/Home';
import About from './pages/About';
import Navette from './pages/services/Navette';
import Mobilite from './pages/services/Mobilite';
import Contact from './pages/Contact';
import Conciergerie from './pages/services/conciergerie';
import Evenementiel from './pages/services/evenements';
import Catalogue from './pages/services/Catalogue';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- GROUPE 1 : PAGES AVEC HEADER & FOOTER (Site Public) --- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact"  element={<Contact />} />
          
          {/* Sous-routes pour les services */}
          <Route path="services">
            <Route path="mobilite"  element={<Mobilite />} />
            <Route path="navette"  element={<Navette />} />
            <Route path="conciergerie"  element={<Conciergerie />} />
            <Route path="evenements"  element={<Evenementiel />} />
          </Route>
        </Route>

        {/* --- GROUPE 2 : PAGES SANS HEADER & FOOTER (Spéciales) --- */}
        <Route path="/" element={<PlainLayout />}>
          <Route path="services/catalogue" element={<Catalogue />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;