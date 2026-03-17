import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AOS from 'aos';
import 'aos/dist/aos.css'; // N'oublie pas le CSS

// Initialisation d'AOS
AOS.init({
  duration: 800, // Durée de l'animation en ms
  once: true,    // L'animation ne se joue qu'une fois
  offset: 100,   // Déclenchement un peu avant que l'élément soit visible
  easing: 'ease-out-cubic', // Courbe de vitesse élégante
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
