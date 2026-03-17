// src/components/UI/PageHero.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string; // C'est ici que tu passes ton HTML (<span>...)
  btnText?: string;
  btnLink?: string;
}

const PageHero = ({ image, title, subtitle, btnText, btnLink }: PageHeroProps) => {
  return (
    <header className="relative w-full h-[96vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-aldas-dark/80 to-aldas-dark/40"></div>
      </div>

      {/* Contenu Centré */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Titre (Texte simple) */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up drop-shadow-lg leading-tight">
          {title}
        </h1>

        {/* SOUS-TITRE AVEC HTML ACTIVÉ */}
        {subtitle && (
          <p 
            className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        
        {btnText && btnLink && (
          <Link 
            to={btnLink}
            className="inline-flex items-center gap-2 px-8 py-3 bg-aldas hover:bg-aldas-light text-white font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-aldas-glow"
          >
            {btnText} <ArrowRight size={20} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default PageHero;