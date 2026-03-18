// src/pages/NotFound.tsx
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Home, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Gestion du mouvement de la souris pour l'effet de parallaxe
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f14] text-white selection:bg-emerald-500/30">
      
      {/* --- ARRIÈRE-PLAN ANIMÉ --- */}
      {/* Grille subtile */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f14]/50 to-[#0b0f14]"></div>
      
      {/* Orbes de lumière (Effet de lueur) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"
        style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      ></div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Badge "Erreur" */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg animate-fade-in-down">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Erreur Système</span>
        </div>

        {/* Titre 404 Géant avec Effet de Verre */}
        <div className="relative mb-8 group perspective-1000">
          <h1 
            className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-2xl transition-transform duration-500 ease-out select-none"
            style={{ 
              transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              textShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            404
          </h1>
          {/* Reflet sous le texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent opacity-50 pointer-events-none"></div>
        </div>

        {/* Texte Descriptif */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Oups ! Vous avez exploré trop loin.
          </h2>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            La page <code className="bg-white/10 px-2 py-1 rounded text-emerald-400 font-mono text-sm">{location.pathname}</code> n'existe pas dans notre univers. 
            Peut-être a-t-elle été déplacée ou supprimée ?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-200">
          
          {/* Bouton Principal : Retour Accueil */}
          <Link 
            to="/" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Home size={20} className="transform group-hover:-translate-y-1 transition-transform" />
            <span>Retour à l'accueil</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Bouton Secondaire : Rechercher */}
          <Link 
            to="/services/catalogue" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
          >
            <Compass size={20} className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            <span>Explorer le catalogue</span>
          </Link>
        </div>

        {/* Footer discret */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600 font-mono">
            ID ERREUR: <span className="select-all cursor-pointer hover:text-red-400 transition-colors">404_NOT_FOUND_{Math.floor(Math.random() * 9999)}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;