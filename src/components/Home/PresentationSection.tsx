// src/components/Home/PresentationSection.tsx
import SectionHeader from '../UI/SectionHeader';

const PresentationSection = () => {
  return (
    <section className="py-6 md:py-10 bg-[#f8fafc] overflow-hidden relative group/section">
      
      {/* Décos d'ambiance subtiles (Blobs) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      {/* --- HEADER (Standard) --- */}
        <div data-aos="fade-up">
          <SectionHeader 
            title="Présentation"
            subtitle="Nous sommes déterminés à vous apporter un service inégalable !"
          />
        </div>
      <div className="container mx-auto px-12 max-w-7xl relative z-10">

        {/* --- CONTENU PRINCIPAL (INVERSÉ : Texte Gauche / Image Droite) --- */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* COLONNE GAUCHE : TEXTE (Ordre 1) */}
          <div className="w-full lg:w-1/2 order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="100">
            <article className="max-w-2xl text-left relative flex flex-col h-full justify-center">
              
              {/* Badge "À PROPOS" (Ajout Premium) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 border border-emerald-100 rounded-full shadow-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                À propos de ÁLDÁS
              </div>

              {/* Titre Principal avec Effet Verre Raffiné */}
              <h2 
                id="aldas-presentation-title" 
                className="text-[clamp(1.4rem,4vw,2rem)] font-bold leading-[1.35] text-[#0b2545] mb-8 tracking-tight"
              >
                Chez <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">ÁLDÁS</span>, chaque demande devient{' '}
                <span className="relative inline-block mx-1">
                  {/* Effet de surlignage verre dépoli */}
                  <span className="absolute inset-0 bg-emerald-200/40 rounded-lg transform -rotate-1 scale-105 backdrop-blur-sm"></span>
                  <span className="relative px-2 py-0.5 font-semibold text-slate-800">
                    une expérience d'exception
                  </span>
                </span>,
                {' '}alliant prestige, confort et discrétion absolue.
              </h2>

              {/* Soulignement Dégradé Animé */}
              <div className="relative w-[clamp(60px,18vw,120px)] h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mb-10 overflow-hidden shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                <div className="absolute inset-0 bg-white/50 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
              </div>

              {/* Paragraphes Descriptifs (Typographie Aérée) */}
              <div className="space-y-6 text-[clamp(1rem,2.8vw,1.15rem)] leading-[1.8] text-slate-600 font-light mb-10">
                <p className="border-l-4 border-emerald-200 pl-6 italic">
                  <strong className="font-semibold text-slate-900 block mb-1 not-italic text-base uppercase tracking-wide">Notre Mission</strong>
                  <strong className="font-semibold text-slate-900">ÁLDÁS</strong> redéfinit les standards des solutions de mobilité professionnelles. Nous exigeons l'excellence à chaque étape : qualité irréprochable, sécurité maximale et confort absolu.
                </p>

                <p>
                  Grâce à une <strong className="font-semibold text-slate-900">flotte de véhicules modernes</strong> entretenus avec rigueur et à des équipes <strong className="font-semibold text-slate-900">d'élite, formées et discrètes</strong>, nous garantissons des prestations sur mesure pour les <strong className="text-emerald-700 font-medium">entreprises exigeantes, institutions prestigieuses et particuliers avertis</strong>.
                </p>
              </div>

              {/* Bouton Call-to-Action Raffiné (STYLE OUTLINE) */}
              <div className="mt-auto">
                <a 
                  href="/about" 
                  className="group inline-flex items-center gap-3 px-8 py-3.5 border-2 border-slate-900 text-slate-900 font-semibold rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  Découvrir notre histoire
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>

            </article>
          </div>

          {/* COLONNE DROITE : IMAGE + DÉCOR (Ordre 2) */}
          <div className="w-full lg:w-1/2 relative order-2 group/image" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            
            {/* Calque Décoratif Derrière (Animé & Subtil) */}
            <div 
              className="absolute z-10 w-[85%] h-[380px] md:h-[420px] rounded-tr-[60px] rounded-bl-[60px] shadow-2xl transition-all duration-700 ease-out hidden md:block opacity-60 mix-blend-multiply"
              style={{
                bottom: '30px',
                left: '-30px',
                background: 'linear-gradient(135deg, rgba(0,184,148,0.3), rgba(13,110,253,0.3))',
                transform: 'translate(-10px, 10px)',
              }}
            ></div>

            {/* Image Principale avec Effet Zoom Lent */}
            <div className="relative z-20 w-full h-[380px] md:h-[420px] rounded-tr-[60px] rounded-bl-[60px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)]">
              <img 
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                alt="Certification et flotte de véhicules modernes ÁLDÁS"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover/image:scale-105"
                loading="lazy"
              />
              
              {/* Overlay de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            {/* Badge Flottant "Premium" (Apparaît au survol) */}
            <div className="absolute -bottom-6 -right-6 z-30 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 transform translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-500 delay-100 hidden md:flex items-center gap-3">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Excellence Garantie</span>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Animation Keyframes Custom */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default PresentationSection;