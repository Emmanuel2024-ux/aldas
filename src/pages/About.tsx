// src/pages/About.tsx
import { Award, ShieldCheck, EyeOff, Stars, Quote} from 'lucide-react';
import PageHero from '../components/UI/PageHero';
import ValuesSection from '../components/UI/ValuesSection';
import ServiceGrid from '../components/Services/ServiceGrid';
import PartnersSlider from '../components/UI/PartnersSlider';

const About = () => {
  const qualities = [
    {
      icon: Award,
      title: 'Excellence',
      text: 'L\'exigence comme norme. Chaque service est pensé pour dépasser vos attentes les plus élevées.',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: ShieldCheck,
      title: 'Sécurité',
      text: 'Des services fiables, contrôlés et adaptés. Votre tranquillité d\'esprit est notre priorité.',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: EyeOff,
      title: 'Discrétion',
      text: 'Une confidentialité absolue. Nous opérons dans l\'ombre pour mettre votre réussite en lumière.',
      color: 'text-gray-600',
      bg: 'bg-gray-100'
    },
    {
      icon: Stars,
      title: 'Élégance',
      text: 'Le raffinement dans chaque détail. Une harmonie parfaite entre style et efficacité.',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white font-sans antialiased selection:bg-aldas selection:text-white overflow-x-hidden">
      
      {/* --- 1. HERO CINÉMATOGRAPHIQUE (Déjà géré par PageHero interne si besoin, ou ici) --- */}
      <PageHero 
        image="https://www.salesforce.com/blog/wp-content/uploads/sites/2/2020/08/About-Us-Page.jpg?w=861"
        title="Á propos"
        subtitle="Une expertise premium pensée pour une clientèle exigeante."
        btnText="Découvrir nos services"
        btnLink="/services"
      />

      {/* --- 2. QUI SOMMES-NOUS ? (Layout Magazine Asymétrique) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-end gap-12 lg:gap-20">
            
            {/* Colonne Image (Animation depuis la gauche) */}
            <div 
              className="w-full lg:w-5/12 relative group"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-offset="100"
            >
              {/* Élément décoratif arrière (Grille) */}
              <div className="absolute -top-10 -left-10 w-full h-full border border-aldas/20 rounded-[2.5rem] -z-10 hidden lg:block"></div>
              
              {/* Cadre décoratif couleur flou */}
              <div className="absolute inset-0 bg-gradient-to-br from-aldas/30 to-blue-900/30 rounded-[2.5rem] transform translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8 blur-md"></div>
              
              {/* Image Principale */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-[4/5]">
                <img 
                  src="https://www.shutterstock.com/image-photo/business-people-putting-their-hands-600nw-1116847541.jpg" 
                  alt="Équipe Áldás" 
                  className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                
                {/* Badge Flottant Glassmorphism (Apparition retardée) */}
                <div 
                  className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-2xl transform translate-y-0 group-hover:translate-y-[-5px] transition-transform duration-500"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                  data-aos-duration="800"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-aldas rounded-full text-white shadow-lg shadow-aldas/50">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Fondé sur</p>
                      <p className="text-lg font-bold text-white drop-shadow-md">L'Excellence & l'Intégrité</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Texte (Animation depuis la droite) */}
            <div 
              className="w-full lg:w-7/12 pb-8 lg:pb-12 space-y-10"
              data-aos="fade-left"
              data-aos-duration="1200"
              data-aos-offset="100"
            >
              <div data-aos="fade-up" data-aos-delay="200">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-aldas uppercase bg-aldas/5 border border-aldas/20 rounded-full">
                  Notre Histoire
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
                  L'excellence du service <span className="text-transparent bg-clip-text bg-gradient-to-r from-aldas via-cyan-500 to-blue-600">ivoirien</span> aux standards internationaux
                </h2>
              </div>
              
              <div className="space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-aldas/30 pl-8">
                <p data-aos="fade-up" data-aos-delay="300">
                  <strong className="text-gray-900 font-semibold">Áldás</strong> est née d'une vision audacieuse : redéfinir les codes de la conciergerie haut de gamme en Côte d'Ivoire. Basée à Abidjan, nous spécialisons dans la gestion de services exclusifs pour une clientèle qui ne fait aucun compromis.
                </p>
                <p data-aos="fade-up" data-aos-delay="400">
                  Notre mission est claire : proposer une expérience premium conforme aux standards internationaux, tout en sublimant l'hospitalité légendaire et l'excellence du service ivoirien.
                </p>
                <p data-aos="fade-up" data-aos-delay="500">
                  Nous mettons à votre disposition une équipe d'experts, discrets et dévoués. Grâce à notre maîtrise de la mobilité, de la gestion VIP et de l'événementiel, nous garantissons un accompagnement <strong className="text-aldas font-medium">24h/24 et 7j/7</strong>.
                </p>
              </div>

              {/* Signature Stylisée */}
              <div 
                className="pt-8 flex items-center gap-6"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="h-px w-20 bg-gradient-to-r from-aldas to-transparent"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">La Direction</span>
                  <span className="text-xs text-gray-500 italic">Áldás Conciergerie</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 3. NOS VALEURS (Composant Réutilisable avec AOS intégré) --- */}
      <ValuesSection 
        title="Nos Valeurs Fondamentales"
        subtitle="Ce qui nous guide"
        values={qualities}
      />

      {/* --- 4. PARTENAIRE DE CONFIANCE (Block Citation "Dark Luxury") --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-6xl mx-auto relative group"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset="100"
          >
            
            {/* Carte Sombre Premium */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl overflow-hidden border border-white/5">
              
              {/* Effets de lumière dynamiques */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-aldas to-transparent shadow-[0_0_30px_rgba(6,182,212,0.6)]"></div>
              <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-aldas/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-aldas/15 transition-colors duration-700"></div>
              <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 space-y-10">
                <div 
                  className="inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 shadow-lg shadow-aldas/10"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <Quote className="w-10 h-10 text-aldas" />
                </div>
                
                <blockquote className="space-y-8 max-w-4xl mx-auto">
                  <p 
                    className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-light tracking-tight"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    "<strong className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Nous sommes un partenaire de confiance</strong>, un pilier sur lequel nos clients s'appuient pour concrétiser leurs ambitions."
                  </p>
                  
                  <p 
                    className="text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    Avec passion, nous offrons des solutions complètes visant à améliorer performance et confort. Chaque projet est porté par <span className="text-aldas-light font-medium border-b border-aldas/30">notre quête d'excellence</span>.
                  </p>
                </blockquote>

                <div 
                  className="pt-12 mt-12 border-t border-white/10"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {['Responsabilité', 'Professionnalisme', 'Innovation', 'Discrétion'].map((word, idx) => (
                      <span 
                        key={word} 
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-widest hover:bg-aldas hover:border-aldas hover:text-white transition-all duration-300 cursor-default"
                        data-aos="fade-in"
                        data-aos-delay={600 + (idx * 100)} // Cascade pour les tags
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className="text-aldas font-semibold text-lg md:text-xl tracking-wide">
                    Avec nous, vos projets se concrétisent et vos aspirations deviennent réalité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. GRID DES SERVICES (AOS intégré dans le composant) --- */}
      <ServiceGrid title="Nos Domaines d'Expertise" heroTitle={null}/>
      <PartnersSlider />  
    </div>
  );
};

export default About;