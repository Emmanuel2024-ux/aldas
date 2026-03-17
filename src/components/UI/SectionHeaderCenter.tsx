interface SectionTitleCenteredProps {
  badge?: string; // Petit texte au-dessus (ex: "NOTRE EXPERTISE")
  title: string;
  description?: string;
  width?: string; // Largeur max du bloc texte (défaut: "max-w-3xl")
  color?: string;
}

const SectionHeaderCentered = ({ 
  badge, 
  title, 
  description, 
  width = "max-w-4xl",
  color = "#00b894"
}: SectionTitleCenteredProps) => {
  return (
    <div className={`w-full mx-auto text-center pt-10 ${width}`}>
      
      {/* Badge Optionnel (Style "Pillule") */}
      {badge && (
        <div className="mb-6 inline-block" data-aos="fade-down">
          <span className="relative px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500 bg-slate-100 rounded-full border border-slate-200 overflow-hidden group-hover:border-slate-300 transition-colors">
            <span className="relative z-10">{badge}</span>
            {/* Petit point coloré décoratif */}
            <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
          </span>
        </div>
      )}

      {/* Titre Principal Centré */}
      <h2 
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight capitalize"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {title}
      </h2>

      {/* Ligne Décorative Centrée (Fine et Élégante) */}
      <div className="relative h-px w-24 mx-auto my-2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" data-aos="fade-in" data-aos-delay="200">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}></div>
      </div>

      {/* Description / Sous-titre */}
      {description && (
        <p 
          className="text-lg md:text-xl text-slate-600 font-light leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeaderCentered;