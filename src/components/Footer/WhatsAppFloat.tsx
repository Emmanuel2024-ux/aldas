// src/components/Footer/WhatsAppFloat.tsx
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Props {
  number: string;
}

const WhatsAppFloat = ({ number }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start sm:items-end">
      
      {/* CARTE DE MESSAGE (Bulle de dialogue) */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 animate-slide-up origin-bottom-left sm:origin-bottom-right">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            
            {/* Barre de couleur supérieure (Dégradé) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-green-400 to-emerald-600"></div>
            
            <div className="p-5">
              {/* En-tête de la bulle */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">Support WhatsApp</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-600 font-medium">En ligne maintenant</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                👋 Bonjour ! Nous sommes disponibles. Comment pouvons-nous vous aider aujourd'hui ?
              </p>

              {/* Bouton d'action */}
              <a 
                href={`https://wa.me/${number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                <span>Démarrer la discussion</span>
                <Send size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Petite flèche décorative en bas (optionnel, selon le design) */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-100 hidden sm:block"></div>
          </div>
        </div>
      )}

      {/* BOUTON FLOTTANT PRINCIPAL */}
      <button 
        onClick={toggleChat}
        className="group relative flex items-center justify-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-black text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)] transition-all duration-500 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/30 overflow-hidden"
        aria-label="Support WhatsApp"
      >
        {/* Effet de lueur verte en arrière-plan (Pulse) */}
        <span className="absolute inset-0 w-full h-full bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        
        {/* Indicateur "En ligne" (Point vert animé) */}
        <span className="relative flex h-3 w-3 mr-1 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-black"></span>
        </span>

        {/* Texte (Caché sur mobile, visible sur desktop) */}
        <span className="relative font-bold text-sm tracking-wide whitespace-nowrap hidden sm:inline-block">
          {isOpen ? 'Fermer' : 'Besoin d\'aide ?'}
        </span>

        {/* Icône */}
        <div className="relative bg-white text-black rounded-full p-1.5 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
          {isOpen ? <X size={20} strokeWidth={2.5} /> : <MessageCircle size={20} strokeWidth={2.5} />}
        </div>
      </button>
    </div>
  );
};

export default WhatsAppFloat;