// src/pages/services/Conciergerie.tsx
import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import PageHero from '../../components/UI/PageHero';
import { servicesData } from '../../data/servicesData';
import ServiceGrid from '../../components/Services/ServiceGrid';
import AptitudesSection from '../../components/UI/AptitudeSession';

// --- DONNÉES DÉTAILLÉES DES SERVICES ---
const conciergeServices = [
  {
    title: 'Mise à disposition de personnel',
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80',
    items: ['Cuisiniers privés', 'Gardiens & Sécurité', 'Baby-sitters qualifiés', 'Personal shoppers', 'Concierges dédiés', 'Protection rapprochée']
  },
  {
    title: 'Immobilier',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    items: ['Partenaires immobiliers', 'Architectes d\'intérieur', 'Décorateurs', 'Gestion locative', 'Accompagnement travaux']
  },
  {
    title: 'Service au quotidien',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    items: ['Livraison à domicile', 'Rendez-vous médicaux', 'Démarches administratives', 'Assistance VIP aéroport', 'Gestion bagages', 'Location véhicules']
  },
  {
    title: 'Shopping',
    image: 'https://images.unsplash.com/photo-1520975912434-5289ae71e7b6?auto=format&fit=crop&w=800&q=80',
    items: ['Personal shopper', 'Joaillerie & Montres', 'Stylistes sur mesure', 'Commandes internationales', 'Dédouanement express']
  },
  {
    title: 'Événementiel',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
    items: ['Réceptions privées', 'Cocktails & Galas', 'Réservations spectacles', 'Vernissages exclusifs', 'Billetterie Sport (F1, JO, Foot)']
  },
  {
    title: 'Bien-être',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    items: ['Coachs sportifs', 'Séances de Yoga', 'Esthéticiennes à dom.', 'Coiffeurs & Maquilleurs', 'Masseurs kinés', 'Spa sur mesure']
  },
  {
    title: 'Voyage',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    items: ['Circuits touristiques', 'Hôtels 5* & Palaces', 'Excursions privées', 'Visites en hélicoptère', 'Activités insolites']
  },
  {
    title: 'Transport',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',
    items: ['Jets privés', 'Hélicoptères', 'Limousines avec chauffeur', 'Berlines de luxe', 'Transferts VIP']
  },
  {
    title: 'Gastronomie',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    items: ['Restaurants étoilés', 'Chefs à domicile', 'Traiteurs d\'exception', 'Caves à vin', 'Cours de cuisine privée']
  },
  {
    title: 'Interprètes',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
    items: ['Traduction simultanée', 'Interprètes spécialisés', 'Accompagnement multilingue', 'Secrétariat international']
  },
  {
    title: 'Plateaux repas',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    items: ['Plateaux gastronomiques', 'Menus diététiques', 'Livraison bureaux', 'Événements pro', 'Petit-déjeuner VIP']
  },
  {
    title: 'Voyages d’affaires',
    image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80',
    items: ['Organisation complète', 'Hôtels & Transferts', 'Planning sur mesure', 'Salons privés', 'Support 24/7']
  },
  {
    title: 'Expatriation',
    image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80',
    items: ['Démarches admin.', 'Recherche logement', 'Scolarité enfants', 'Réseau local', 'Installation clé en main']
  },
  {
    title: 'Fret & douanes',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    items: ['Transport aérien/maritime', 'Formalités douanières', 'Suivi de colis en temps réel', 'Livraison sécurisée']
  },
  {
    title: 'Séminaires',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    items: ['Planification intégrale', 'Salles équipées', 'Catering premium', 'Animations & Speakers', 'Team building']
  }
];

const Conciergerie = () => {
  const pageData = servicesData['conciergerie'];

  return (
    <div className="bg-white font-sans antialiased selection:bg-aldas selection:text-white">
      
      {/* --- 1. HERO SPÉCIFIQUE --- */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Contactez-nous"
        btnLink="#contact-conciergerie"
      />

      {/* --- 2. SECTION À PROPOS (Design Fidèle PHP/CSS) --- */}
      <section 
        className="relative py-12 md:py-20 overflow-hidden bg-white"
        style={{
          backgroundImage: `
            url("https://www.destiny-conciergerie.net/sites/default/files/citationss.webp"),
            url("https://www.destiny-conciergerie.net/sites/default/files/frise-left.webp"),
            url("https://www.destiny-conciergerie.net/sites/default/files/frise-right.webp")
          `,
          backgroundSize: 'cover, 21%, 21%',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
          backgroundPosition: 'center right, left bottom, right top'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            
            {/* COLONNE TEXTE */}
            <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right" data-aos-duration="1000">
              
              {/* Badge */}
              <span 
                className="inline-block px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-bold tracking-wide uppercase text-[#0b2545] rounded-full mb-4"
                style={{ 
                  backgroundColor: 'rgba(0,184,148,0.15)',
                  fontSize: 'clamp(0.7rem, 0.5vw, 1rem)',
                  padding: 'clamp(6px, 1vw, 8px)',
                  marginBottom: 'clamp(10px, 2vw, 14px)'
                }}
              >
                Conciergerie haut de gamme
              </span>

              {/* Titre avec Highlight */}
              <h2 
                className="font-bold text-[#0b2545] leading-tight mb-6"
                style={{ 
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  marginBottom: 'clamp(15px, 3vw, 20px)'
                }}
              >
                Bien plus qu'un service,
                <br />
                <span 
                  className="font-extrabold"
                  style={{
                    background: 'linear-gradient(90deg, #00b894, #1ed0a2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  un art de vous simplifier la vie
                </span>
              </h2>

              {/* Texte */}
              <p 
                className="text-[#5f6f82] leading-relaxed font-light"
                style={{ 
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  lineHeight: '1.8',
                  marginBottom: 'clamp(20px, 3vw, 24px)'
                }}
              >
                Avec <strong className="text-[#0b2545] font-semibold">ÁLDÁS Conciergerie</strong>, chaque demande devient une attention exclusive. Disponibilité totale, discrétion absolue et exécution parfaite, pour répondre aux exigences les plus élevées.
              </p>

              {/* Liste à puces */}
              <ul className="list-none p-0 m-0 space-y-3">
                {[
                  'Assistance personnalisée 24h/24 – 7j/7',
                  'Gestion de demandes privées et professionnelles',
                  'Réseau de partenaires premium',
                  'Confidentialité et excellence garanties'
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-3 font-medium text-[#0b2545]"
                    style={{ 
                      marginBottom: 'clamp(8px, 1.5vw, 12px)',
                      gap: 'clamp(8px, 2vw, 10px)'
                    }}
                  >
                    <CheckCircle 
                      className="shrink-0 text-[#00b894]" 
                      size={20} 
                      style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
                      fill="currentColor"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* COLONNE VIDE (RESPIRATION VISUELLE) */}
            <div className="w-full lg:w-1/2"></div>

          </div>
        </div>
      </section>

      <AptitudesSection 
        items={[
          {
            iconSrc: "https://www.destiny-conciergerie.net/sites/default/files/picto1.webp",
            title: "L'assistance",
            text: "Une équipe de concierges dédiés à votre service, disponible <strong>24h/24 – 7j/7</strong>, pour répondre à toutes vos demandes, des plus simples aux plus complexes."
          },
          {
            iconSrc: "https://www.destiny-conciergerie.net/sites/default/files/picto2.webp",
            title: "La réactivité",
            text: "Un accès privilégié à un <strong>réseau exclusif de partenaires et services</strong>, vous ouvrant les portes des meilleures adresses et expériences."
          },
          {
            iconSrc: "https://www.destiny-conciergerie.net/sites/default/files/picto3.webp",
            title: "L'anticipation",
            text: "Grâce à une équipe parfaitement formée, discrète et pleine de ressources, nous anticipons vos besoins pour vous offrir des solutions <strong>précises et sur mesure</strong>."
          }
          // Tu peux ajouter un 4ème item ici si besoin, la grille s'adaptera automatiquement !
        ]}
      />
      {/* --- 4. GRILLE DE SERVICES "RIDEAU" (Dark Mode) --- */}
      <section className="py-24 bg-[#0b0f14] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Notre offre de services dédiés
            </h2>
            <p className="text-gray-400 text-lg font-light">
              Réactivité, discrétion et excellence pour vous satisfaire. Passez la souris pour découvrir les détails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conciergeServices.map((service, idx) => (
              <div 
                key={idx}
                className="group relative bg-[#111820] rounded-2xl overflow-hidden shadow-2xl h-[360px] cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-aldas to-cyan-500 p-4 z-20">
                  <h3 className="text-base md:text-lg font-bold text-[#0b2545] truncate uppercase tracking-wide">
                    {service.title}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-[#0b2545]/95 backdrop-blur-sm transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30 flex flex-col justify-center p-8">
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-light">
                        <Star size={14} className="text-aldas shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact"
                    className="self-start inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aldas to-cyan-500 text-[#0b2545] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,184,148,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-wider"
                  >
                    Réserver <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. AUTRES SERVICES (Optionnel) --- */}
      <ServiceGrid heroTitle={pageData.heroHeadline}/>

    </div>
  );
};

export default Conciergerie;