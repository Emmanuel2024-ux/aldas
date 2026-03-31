// src/components/Contact/ContactMapCTA.tsx
import { ArrowRight, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { motion, type Variants, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface ContactMapCTAProps {
  /** URL de l'iframe Google Maps */
  mapUrl?: string;
  
  /** Texte du bouton CTA */
  ctaText?: string;
  
  /** Lien du bouton CTA (ancre interne ou route) */
  ctaLink?: string;
  
  /** Afficher ou masquer la section CTA */
  showCTA?: boolean;
  
  /** Label ARIA pour la section carte */
  ariaLabel?: string;
  
  /** ID unique pour l'ancrage */
  id?: string;
  
  /** Message personnalisé pendant le chargement */
  loadingMessage?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const ContactMapCTA = ({
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63561.5979902716!2d-4.0216612815857085!3d5.32493555824972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed003087fa37%3A0x5a8dae7e21d7003a!2sMaison%20Ciad!5e0!3m2!1sfr!2sci!4v1749592464538!5m2!1sfr!2sci",
  ctaText = "Commencer l'expérience",
  ctaLink = "#contact-form-section",
  showCTA = true,
  ariaLabel = "Localisation de ÁLDÁS CI à Abidjan, Côte d'Ivoire",
  id = "contact-map-section",
  loadingMessage = "Chargement de la carte..."
}: ContactMapCTAProps) => {
  
  // ✅ États pour le chargement et les erreurs
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [, setIsInView] = useState(false);
  
  // ✅ Contrôles d'animation Framer Motion
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  
  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Observer pour déclencher l'animation quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [controls]);

  // ✅ Gestionnaire de chargement réussi de l'iframe
  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
    setMapError(false);
  }, []);

  // ✅ Gestionnaire d'erreur de chargement de l'iframe
  const handleMapError = useCallback(() => {
    setMapError(true);
    setMapLoaded(false);
    console.warn('⚠️ Échec du chargement de la carte Google Maps');
  }, []);

  // ✅ Gestionnaire de clic intelligent pour le CTA
  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const targetId = ctaLink.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        history.replaceState(null, '', ctaLink);
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    }
    // Pour les routes React, laisser React Router gérer
  }, [ctaLink, prefersReducedMotion]);

  return (
    <>
      {/* 🗺️ SECTION CARTE GOOGLE MAPS */}
      <motion.section
        ref={sectionRef}
        id={id}
        className="w-full h-[500px] relative z-0 grayscale hover:grayscale-0 transition-all duration-700"
        role="region"
        aria-label={ariaLabel}
        aria-busy={!mapLoaded && !mapError}
        // Animation d'apparition de la section
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
          }
        }}
      >
        {/* ✅ Skeleton Loader pendant le chargement */}
        {!mapLoaded && !mapError && (
          <motion.div 
            className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
            aria-label={loadingMessage}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="mb-4"
            >
              <Loader2 size={40} className="text-aldas" aria-hidden="true" />
            </motion.div>
            <p className="text-gray-600 font-medium">{loadingMessage}</p>
            <p className="text-gray-400 text-sm mt-2">Localisation ÁLDÁS CI, Abidjan</p>
          </motion.div>
        )}

        {/* ✅ Message d'erreur si la carte ne charge pas */}
        {mapError && (
          <motion.div 
            className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10 p-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle size={48} className="text-amber-500 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carte indisponible
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Nous n'avons pas pu charger la carte. Veuillez réessayer ou nous contacter directement.
            </p>
            <a 
              href="https://maps.app.goo.gl/dTu86XWuUoiZYYLh7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-aldas text-white font-medium rounded-full hover:bg-aldas-light transition-colors focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2"
            >
              <MapPin size={18} aria-hidden="true" />
              Ouvrir dans Google Maps
            </a>
          </motion.div>
        )}

        {/* ✅ Iframe Google Maps (cachée tant que non chargée) */}
        <iframe 
          src={mapUrl} 
          width="100%" 
          height="100%" 
          style={{ 
            border: 0, 
            position: 'relative', 
            zIndex: 0,
            opacity: mapLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation de ÁLDÁS CI - Riviera Ciad, Abidjan, Côte d'Ivoire"
          className={`w-full h-full block ${mapLoaded ? 'visible' : 'invisible'}`}
          onLoad={handleMapLoad}
          onError={handleMapError}
          // Accessibilité : décrit le contenu de la carte
          aria-describedby={mapLoaded ? `${id}-map-desc` : undefined}
        />
        
        {/* Description sr-only pour les lecteurs d'écran */}
        <span id={`${id}-map-desc`} className="sr-only">
          Carte interactive montrant l'emplacement de ÁLDÁS CI à Riviera Ciad, Rue E22, Abidjan, Côte d'Ivoire. 
          Utilisez les contrôles de la carte pour zoomer et explorer les environs.
        </span>
      </motion.section>

      {/* 🎯 SECTION CTA FINAL (avec animations Framer Motion) */}
      {showCTA && (
        <motion.section 
          className="py-24 bg-white relative overflow-hidden z-10"
          role="region"
          aria-labelledby={`${id}-cta-heading`}
          // Animation déclenchée quand la section est visible
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 0.5, delay: 0.2 }
            }
          }}
        >
          {/* Décoration de fond - décorative donc aria-hidden */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aldas/5 via-white to-white pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="container mx-auto px-4 relative z-20 text-center">
            <motion.div 
              className="max-w-4xl mx-auto"
              variants={scaleIn}
            >
              <motion.h2 
                id={`${id}-cta-heading`}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                variants={fadeInUp}
              >
                Vivez une expérience unique avec <span className="text-aldas">ÁLDÁS</span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                Découvrez nos solutions innovantes et testez-les par vous-même.
              </motion.p>
              
              <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
                <a 
                  href={ctaLink}
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-aldas transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-aldas/30 relative z-30 focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 focus:ring-offset-white"
                  aria-label={`${ctaText} - Contactez ÁLDÁS CI pour commencer`}
                >
                  {ctaText}
                  <motion.span
                    aria-hidden="true"
                    animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ✅ Styles CSS pour états focus et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        a:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* Skeleton loader animation */
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .skeleton {
          animation: skeletonPulse 1.5s ease-in-out infinite;
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
        }
      `}</style>
    </>
  );
};

export default ContactMapCTA;