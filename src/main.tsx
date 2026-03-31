// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ Styles globaux
import './index.css';

// ✅ Application principale (contient tout le routing)
import App from './App';
import { configureAnalytics, initGA4 } from './utils/analytics';
import { HelmetProvider } from 'react-helmet-async';

// ============================================================================
// 🚀 INITIALISATION (AVANT LE RENDU)
// ============================================================================

// ✅ 1. Initialiser GA4
initGA4({
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-CDZ0SJ9W77',
  debugMode: import.meta.env.DEV,
  requireConsent: import.meta.env.PROD,
});

// ✅ 2. Restaurer le consentement si déjà donné
if (typeof window !== 'undefined') {
  const hasConsent = localStorage.getItem('aldas-consent-analytics');
  if (hasConsent === 'true') {
    configureAnalytics({ requireConsent: false });
  }
}

// ✅ 3. Gestion basique des erreurs (optionnel)
window.addEventListener('error', (e) => {
  console.error('🔴 Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.warn('🟡 Unhandled rejection:', e.reason);
});

// ✅ 4. Rendu unique de l'application
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ #root not found in index.html');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
}