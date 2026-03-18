// src/components/UI/Preloader.tsx
import { useState, useEffect } from 'react';
import { Star} from 'lucide-react';

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader = ({ onFinish }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulation de chargement progressif
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Petit délai avant de lancer la sortie pour fluidité
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinish, 800); // Attendre la fin de l'animation de sortie
          }, 500);
          return 100;
        }
        // Vitesse variable pour réalisme (plus lent au début, plus rapide à la fin)
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0f14] text-white transition-opacity duration-700 ease-in-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Arrière-plan animé subtil */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      {/* Contenu Central */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
        
        {/* Logo Animé */}
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl flex items-center justify-center shadow-2xl transform animate-[bounce_2s_infinite]">
            <Star size={48} className="text-white fill-white drop-shadow-lg" />
          </div>
          {/* Anneau de chargement autour du logo */}
          <svg className="absolute top-0 left-0 w-24 h-24 -rotate-90 pointer-events-none">
            <circle
              cx="48" cy="48" r="44"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-emerald-900/50"
            />
            <circle
              cx="48" cy="48" r="44"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progress) / 100}
              className="text-emerald-400 transition-all duration-200 ease-out"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Texte & Progression */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white animate-pulse">
            ÁLDÁS
          </h2>
          <p className="text-sm text-gray-400 font-light tracking-wide">
            Chargement de l'expérience...
          </p>
          
          {/* Barre de progression chiffrée */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono text-emerald-400 w-8 text-right">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer discret */}
      <div className="absolute bottom-8 text-xs text-gray-600 font-mono">
        © {new Date().getFullYear()} ÁLDÁS Premium Services
      </div>
    </div>
  );
};

export default Preloader;