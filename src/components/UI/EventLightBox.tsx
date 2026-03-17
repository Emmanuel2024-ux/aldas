// src/components/UI/EventLightbox.tsx
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Calendar, MapPin, Users } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  meta?: { label: string; value: string }[]; // Infos supplémentaires optionnelles
}

interface EventLightboxProps {
  images: ImageItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  eventTitle?: string;
}

const EventLightbox = ({ images, isOpen, onClose, initialIndex = 0, eventTitle }: EventLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [, setDirection] = useState(0); // -1 gauche, 1 droite
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  // Reset index quand la lightbox s'ouvre
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsInfoOpen(true);
      document.body.style.overflow = 'hidden'; // Bloquer le scroll du body
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, initialIndex]);

  // Navigation Clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'i') setIsInfoOpen(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      if (dir === -1) return prev === 0 ? images.length - 1 : prev - 1;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Bouton Fermer */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:rotate-90"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>

      {/* Bouton Toggle Info (Mobile/Desktop) */}
      <button 
        onClick={() => setIsInfoOpen(!isInfoOpen)}
        className={`absolute top-6 left-6 z-50 p-3 rounded-full border backdrop-blur-md transition-all duration-300 ${isInfoOpen ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
        aria-label="Toggle Infos"
      >
        <Info size={24} />
      </button>

      {/* Conteneur Principal Grid */}
      <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* Zone Image (Gauche/Center) */}
        <div className="relative flex-grow h-[60vh] lg:h-full flex items-center justify-center bg-black overflow-hidden group">
          
          {/* Navigation Flèches (Survol Image) */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 lg:left-8 z-40 p-4 rounded-full bg-black/20 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 lg:right-8 z-40 p-4 rounded-full bg-black/20 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0 transition-all duration-300"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Active avec Animation de Glissement */}
          <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-12">
            <img 
              key={currentImage.src} // Key force re-render pour l'animation
              src={currentImage.src} 
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500 ease-out"
            />
          </div>

          {/* Indicateur de Progression (Bas) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
            <span className="text-xs font-mono text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Panneau d'Information (Droite) - Glassmorphism */}
        <div 
          className={`absolute lg:relative inset-y-0 right-0 w-full lg:w-[400px] bg-[#0f172a]/90 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-500 ease-in-out z-30 flex flex-col ${isInfoOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-[calc(100%-60px)] lg:hidden'}`}
        >
          {/* Header Panneau */}
          <div className="p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            <h3 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-2">{eventTitle || 'Galerie Événement'}</h3>
            <h2 className="text-2xl font-bold text-white leading-tight">{currentImage.title}</h2>
          </div>

          {/* Contenu Scrollable */}
          <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
            
            {/* Description Photo */}
            <div>
              <p className="text-gray-300 leading-relaxed font-light text-lg">{currentImage.description}</p>
            </div>

            {/* Métadonnées (Date, Lieu, etc.) */}
            {currentImage.meta && currentImage.meta.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">Détails</h4>
                {currentImage.meta.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {item.label.includes('Date') && <Calendar size={18} className="text-emerald-400 mt-1 shrink-0" />}
                    {item.label.includes('Lieu') && <MapPin size={18} className="text-emerald-400 mt-1 shrink-0" />}
                    {item.label.includes('Invités') && <Users size={18} className="text-emerald-400 mt-1 shrink-0" />}
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wide">{item.label}</span>
                      <span className="block text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Miniatures Rapides (Optionnel) */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Autres vues</h4>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentIndex ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLightbox;