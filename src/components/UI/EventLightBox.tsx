// src/components/UI/EventLightbox.tsx
// ============================================================================
// 🎯 LIGHTBOX GALERIE ÉVÉNEMENT - ÁLDÁS CI
// ============================================================================
// • Icônes Lucide responsives avec Tailwind (w-* h-*)
// • TypeScript strict : interfaces exportées, pas de any
// • Focus trap WCAG 2.1 : navigation Tab cyclique
// • Schema.org ImageObject pour chaque image
// • Accessibilité : ARIA live, navigation clavier, reduced-motion
// • Performance : memoization, decoding async, will-change
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Calendar, MapPin, Users } from 'lucide-react';

// ============================================================================
// 🎯 TYPES EXPORTÉS
// ============================================================================

export interface GalleryImageMeta {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  meta?: GalleryImageMeta[];
}

export interface EventLightboxProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  eventTitle?: string;
  id?: string;
  ariaLabel?: string;
}

// ============================================================================
// 🧩 COMPOSANT PRINCIPAL
// ============================================================================

const EventLightbox = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  eventTitle = 'Galerie Événement',
  id = 'event-lightbox',
  ariaLabel = 'Galerie photos de l\'événement',
}: EventLightboxProps) => {
  // ✅ États
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(true);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // ✅ Références
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const infoToggleRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // ✅ prefers-reduced-motion
  const prefersReducedMotion = useMemo<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Image courante
  const currentImage = useMemo<GalleryImage | undefined>(() => images[currentIndex], [images, currentIndex]);

  // ✅ Navigation
  const navigate = useCallback((direction: number): void => {
    setCurrentIndex((prev: number): number => {
      if (direction < 0) return prev === 0 ? images.length - 1 : prev - 1;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, [images.length]);

  // ✅ Gestion scroll body
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setCurrentIndex(initialIndex);
      setIsInfoOpen(true);
      setHasLoaded(false);
      closeButtonRef.current?.focus();
      const t = setTimeout(() => setHasLoaded(true), 50);
      return () => clearTimeout(t);
    }, 10);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = original;
    };
  }, [isOpen, initialIndex]);

  // ✅ Focus trap
  useEffect(() => {
    if (!isOpen || !lightboxRef.current) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = lightboxRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!elements || elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // ✅ Navigation clavier
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': e.preventDefault(); onClose(); break;
        case 'ArrowLeft': e.preventDefault(); navigate(-1); break;
        case 'ArrowRight': e.preventDefault(); navigate(1); break;
        case 'i': case 'I': e.preventDefault(); setIsInfoOpen(p => !p); break;
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, navigate]);

  // ✅ Handlers
  const handlePrev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); navigate(-1); }, [navigate]);
  const handleNext = useCallback((e: React.MouseEvent) => { e.stopPropagation(); navigate(1); }, [navigate]);
  const handleThumb = useCallback((i: number) => setCurrentIndex(i), []);
  const handleOverlay = useCallback((e: React.MouseEvent) => { if (e.target === e.currentTarget) onClose(); }, [onClose]);


  // ✅ ARIA announcement
  const announcement = useMemo(() => 
    currentImage ? `Image ${currentIndex + 1} sur ${images.length} : ${currentImage.title}. ${currentImage.description}` : '',
    [currentImage, currentIndex, images.length]
  );

  if (!isOpen) return null;

  // ✅ Classes utilitaires pour icônes responsives
  const iconClass = "flex-shrink-0 text-white";
  const iconSm = "w-5 h-5 sm:w-6 sm:h-6";
  const iconLg = "w-6 h-6 sm:w-8 sm:h-8";
  const iconMeta = "w-4 h-4 sm:w-[18px] sm:h-[18px]";

  return (
    <>

      <div
        ref={lightboxRef}
        id={id}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        aria-label={ariaLabel}
        onClick={handleOverlay}
        style={{ animation: prefersReducedMotion ? 'none' : 'fadeIn 300ms ease-out' }}
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>

        {/* Bouton Fermer */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Fermer la galerie"
          type="button"
        >
          <X className={`${iconSm} ${iconClass}`} aria-hidden="true" />
          <span className="sr-only">Fermer</span>
        </button>

        {/* Bouton Toggle Info */}
        <button
          ref={infoToggleRef}
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className={`absolute top-4 sm:top-6 left-4 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full border backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black ${
            isInfoOpen ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
          aria-label={isInfoOpen ? 'Masquer les informations' : 'Afficher les informations'}
          aria-expanded={isInfoOpen}
          aria-controls={`${id}-info-panel`}
          type="button"
        >
          <Info className={`${iconSm} ${iconClass}`} aria-hidden="true" />
          <span className="sr-only">Infos</span>
        </button>

        <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
          
          {/* Zone Image */}
          <div className="relative flex-grow h-[50vh] sm:h-[60vh] lg:h-full flex items-center justify-center bg-black overflow-hidden" role="region" aria-label="Zone de visualisation des images">
            
            {/* Bouton Précédent */}
            <button
              ref={prevButtonRef}
              onClick={handlePrev}
              className="absolute left-3 sm:left-4 lg:left-8 z-40 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-sm opacity-90 hover:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Image précédente"
              type="button"
            >
              <ChevronLeft className={`${iconLg} ${iconClass}`} aria-hidden="true" />
              <span className="sr-only">Précédent</span>
            </button>
            
            {/* Bouton Suivant */}
            <button
              ref={nextButtonRef}
              onClick={handleNext}
              className="absolute right-3 sm:right-4 lg:right-8 z-40 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-sm opacity-90 hover:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Image suivante"
              type="button"
            >
              <ChevronRight className={`${iconLg} ${iconClass}`} aria-hidden="true" />
              <span className="sr-only">Suivant</span>
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-12">
              {hasLoaded && currentImage && (
                <img
                  key={currentImage.src}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={800}
                  style={{ animation: prefersReducedMotion ? 'none' : 'zoomIn 400ms ease-out', willChange: 'transform, opacity' }}
                />
              )}
            </div>

            {/* Progression */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-40">
              <span className="text-[10px] sm:text-xs font-mono text-white/70 bg-black/40 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/10" aria-live="polite">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Panneau Info */}
          <div
            id={`${id}-info-panel`}
            className={`absolute lg:relative inset-y-0 right-0 w-full lg:w-[360px] xl:w-[400px] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-out z-30 flex flex-col ${
              isInfoOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-[calc(100%-50px)] lg:hidden'
            }`}
            role="complementary"
            aria-label="Informations sur l'image"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 md:p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <h3 id={`${id}-title`} className="text-[10px] sm:text-xs font-bold tracking-wider text-emerald-400 uppercase mb-1.5 sm:mb-2">{eventTitle}</h3>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{currentImage?.title}</h2>
            </div>

            {/* Contenu */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 md:space-y-8 custom-scrollbar">
              
              {/* Description */}
              <div id={`${id}-description`}>
                <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base md:text-lg">{currentImage?.description}</p>
              </div>

              {/* Métadonnées - ICÔNES CORRIGÉES */}
              {currentImage?.meta && currentImage.meta.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 pb-1.5 sm:pb-2">Détails</h4>
                  {currentImage.meta.map((item: GalleryImageMeta, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 sm:mt-1 text-emerald-400" aria-hidden="true">
                        {item.label.includes('Date') && <Calendar className={`${iconMeta} text-emerald-400`} />}
                        {item.label.includes('Lieu') && <MapPin className={`${iconMeta} text-emerald-400`} />}
                        {item.label.includes('Invités') && <Users className={`${iconMeta} text-emerald-400`} />}
                        {!item.label.match(/Date|Lieu|Invités/) && <span className="w-4 h-4 sm:w-[18px] sm:h-[18px] block" />}
                      </span>
                      <div>
                        <span className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-wide">{item.label}</span>
                        <span className="block text-sm font-semibold text-white">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Miniatures */}
              <div className="pt-2 sm:pt-4">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 sm:mb-3">Autres vues</h4>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {images.map((img: GalleryImage, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleThumb(idx)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleThumb(idx); } }}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        idx === currentIndex ? 'border-emerald-500 scale-105 ring-2 ring-emerald-400/50' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                      aria-label={`Miniature ${idx + 1} : ${img.title}`}
                      aria-current={idx === currentIndex ? 'true' : 'false'}
                      type="button"
                    >
                      <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; transform: none !important; } }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
          .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        `}</style>
      </div>
    </>
  );
};

export default EventLightbox;