// src/pages/services/Conciergerie.tsx
import { Link } from 'react-router-dom';
import { Clock, Zap, EyeOff, CheckCircle, Star, ArrowRight} from 'lucide-react';
import PageHero from '../../components/UI/PageHero';
import { servicesData } from '../../data/servicesData';
import ServiceGrid from '../../components/Services/ServiceGrid';

// --- DONNÉES DÉTAILLÉES DES SERVICES (Fusionnées et enrichies) ---
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
  // Récupération des données de base pour le Hero (optionnel, si tu veux utiliser celles de servicesData)
  const pageData = servicesData['conciergerie'];

  return (
    <div className="bg-white font-sans antialiased selection:bg-aldas selection:text-white">
      
      {/* --- 1. HERO SPÉCIFIQUE AVEC TEXTE COLORÉ --- */}
      <PageHero 
        image={pageData.img} // Ou une image dédiée plus large
        title="Conciergerie Privée"
        subtitle="Bien plus qu'un service, <span class='highlight'>un art de vous simplifier la vie</span>."
        btnText="Devenir Membre"
        btnLink="#contact-conciergerie"
      />

      {/* --- 2. SECTION À PROPOS (Avec Décorations de Fond) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        
        {/* --- DÉCORATIONS DE FOND (Équivalent du background-image CSS) --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. Texture Centrale (Citations) - Cover */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `url("https://www.destiny-conciergerie.net/sites/default/files/citationss.webp")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>

          {/* 2. Frise Gauche (Bottom-Left) - 21% */}
          <div 
            className="absolute bottom-0 left-0 w-[25%] md:w-[21%] h-auto aspect-square opacity-[0.06]"
            style={{
              backgroundImage: `url("https://www.destiny-conciergerie.net/sites/default/files/frise-left.webp")`,
              backgroundSize: 'contain',
              backgroundPosition: 'bottom left',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>

          {/* 3. Frise Droite (Top-Right) - 21% */}
          <div 
            className="absolute top-0 right-0 w-[25%] md:w-[21%] h-auto aspect-square opacity-[0.06]"
            style={{
              backgroundImage: `url("https://www.destiny-conciergerie.net/sites/default/files/frise-right.webp")`,
              backgroundSize: 'contain',
              backgroundPosition: 'top right',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>
        {/* ----------------------------------------------- */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Texte */}
            <div className="w-full lg:w-1/2 space-y-8" data-aos="fade-right" data-aos-duration="1000">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-aldas uppercase bg-aldas/5 border border-aldas/20 rounded-full">
                Conciergerie Haut de Gamme
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Chaque demande devient <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-aldas to-cyan-600">une attention exclusive.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Avec <strong className="text-gray-900">ÁLDÁS Conciergerie</strong>, la disponibilité totale, la discrétion absolue et l'exécution parfaite ne sont pas des options, mais notre standard pour répondre aux exigences les plus élevées.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  'Assistance personnalisée 24h/24 – 7j/7',
                  'Gestion de demandes privées et professionnelles',
                  'Réseau de partenaires premium vérifiés',
                  'Confidentialité et excellence garanties'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="text-aldas shrink-0 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Espace visuel (Respiration) - Comme dans ton design original */}
            <div className="w-full lg:w-1/2"></div>
          </div>
        </div>
      </section>

      {/* --- 3. APTITUDES CLÉS (3 Piliers) --- */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Nos <span className="text-aldas">aptitudes clés</span>
            </h2>
            <p className="text-gray-600 text-lg font-light">
              Trois piliers essentiels qui définissent l'excellence de notre conciergerie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Clock,
                title: 'L\'assistance',
                text: 'Une équipe de concierges dédiés à votre service, disponible 24h/24 – 7j/7, pour répondre à toutes vos demandes, des plus simples aux plus complexes.'
              },
              {
                icon: Zap,
                title: 'La réactivité',
                text: 'Un accès privilégié à un réseau exclusif de partenaires et services, vous ouvrant les portes des meilleures adresses et expériences instantanément.'
              },
              {
                icon: EyeOff,
                title: 'L\'anticipation',
                text: 'Grâce à une équipe parfaitement formée, discrète et pleine de ressources, nous anticipons vos besoins pour vous offrir des solutions précises et sur mesure.'
              }
            ].map((apt, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center group"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="w-24 h-24 bg-aldas/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-aldas group-hover:scale-110 transition-all duration-500">
                  <apt.icon size={40} className="text-aldas group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{apt.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{apt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {/* Image de fond */}
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Footer Titre (Bandeau Gradient) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-aldas to-cyan-500 p-4 z-20">
                  <h3 className="text-base md:text-lg font-bold text-[#0b2545] truncate uppercase tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Overlay Rideau (Glisse du haut) */}
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

      <ServiceGrid title="Découvrez nos autres pôles d'excellence" heroTitle={pageData.heroHeadline}/>

    </div>
  );
};

export default Conciergerie;