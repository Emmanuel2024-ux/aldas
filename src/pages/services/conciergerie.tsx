// src/pages/services/Conciergerie.tsx
import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../seo/pageSEO';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import PageHero from '../../components/UI/PageHero';
import { servicesData } from '../../data/servicesData';
import ServiceGrid from '../../components/Services/ServiceGrid';
import AptitudesSection from '../../components/UI/AptitudeSession';

// --- TYPES ---
interface ConciergeService {
  title: string;
  image: string;
  items: string[];
  description?: string;
}

// --- DONNÉES DÉTAILLÉES DES SERVICES (mémoïsées) ---
const conciergeServices: ConciergeService[] = [
  {
    title: 'Mise à disposition de personnel',
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80',
    description: 'Personnel qualifié et discret pour vos besoins privés et professionnels',
    items: ['Cuisiniers privés', 'Gardiens & Sécurité', 'Baby-sitters qualifiés', 'Personal shoppers', 'Concierges dédiés', 'Protection rapprochée']
  },
  {
    title: 'Immobilier',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    description: 'Accompagnement complet pour vos projets immobiliers',
    items: ['Partenaires immobiliers', 'Architectes d\'intérieur', 'Décorateurs', 'Gestion locative', 'Accompagnement travaux']
  },
  {
    title: 'Service au quotidien',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Simplifiez votre vie quotidienne avec notre assistance premium',
    items: ['Livraison à domicile', 'Rendez-vous médicaux', 'Démarches administratives', 'Assistance VIP aéroport', 'Gestion bagages', 'Location véhicules']
  },
  {
    title: 'Shopping',
    image: 'https://images.unsplash.com/photo-1520975912434-5289ae71e7b6?auto=format&fit=crop&w=800&q=80',
    description: 'Expériences shopping exclusives et sur mesure',
    items: ['Personal shopper', 'Joaillerie & Montres', 'Stylistes sur mesure', 'Commandes internationales', 'Dédouanement express']
  },
  {
    title: 'Événementiel',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
    description: 'Organisation d\'événements privés et professionnels d\'exception',
    items: ['Réceptions privées', 'Cocktails & Galas', 'Réservations spectacles', 'Vernissages exclusifs', 'Billetterie Sport (F1, JO, Foot)']
  },
  {
    title: 'Bien-être',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Services bien-être personnalisés à domicile ou en déplacement',
    items: ['Coachs sportifs', 'Séances de Yoga', 'Esthéticiennes à dom.', 'Coiffeurs & Maquilleurs', 'Masseurs kinés', 'Spa sur mesure']
  },
  {
    title: 'Voyage',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    description: 'Expériences voyage uniques et arrangements VIP',
    items: ['Circuits touristiques', 'Hôtels 5* & Palaces', 'Excursions privées', 'Visites en hélicoptère', 'Activités insolites']
  },
  {
    title: 'Transport',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',
    description: 'Solutions de transport premium avec chauffeurs professionnels',
    items: ['Jets privés', 'Hélicoptères', 'Limousines avec chauffeur', 'Berlines de luxe', 'Transferts VIP']
  },
  {
    title: 'Gastronomie',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    description: 'Expériences culinaires d\'exception, à domicile ou en restaurant',
    items: ['Restaurants étoilés', 'Chefs à domicile', 'Traiteurs d\'exception', 'Caves à vin', 'Cours de cuisine privée']
  },
  {
    title: 'Interprètes',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
    description: 'Services de traduction et interprétation professionnels',
    items: ['Traduction simultanée', 'Interprètes spécialisés', 'Accompagnement multilingue', 'Secrétariat international']
  },
  {
    title: 'Plateaux repas',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    description: 'Livraison de repas gastronomiques pour particuliers et entreprises',
    items: ['Plateaux gastronomiques', 'Menus diététiques', 'Livraison bureaux', 'Événements pro', 'Petit-déjeuner VIP']
  },
  {
    title: 'Voyages d\'affaires',
    image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80',
    description: 'Organisation complète de vos déplacements professionnels',
    items: ['Organisation complète', 'Hôtels & Transferts', 'Planning sur mesure', 'Salons privés', 'Support 24/7']
  },
  {
    title: 'Expatriation',
    image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80',
    description: 'Accompagnement complet pour votre installation en Côte d\'Ivoire',
    items: ['Démarches admin.', 'Recherche logement', 'Scolarité enfants', 'Réseau local', 'Installation clé en main']
  },
  {
    title: 'Fret & douanes',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    description: 'Gestion logistique et douanière de vos envois internationaux',
    items: ['Transport aérien/maritime', 'Formalités douanières', 'Suivi de colis en temps réel', 'Livraison sécurisée']
  },
  {
    title: 'Séminaires',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    description: 'Organisation de séminaires et team building d\'entreprise',
    items: ['Planification intégrale', 'Salles équipées', 'Catering premium', 'Animations & Speakers', 'Team building']
  }
];

const Conciergerie = () => {
  // ✅ 1. SEO : Injection des meta tags via useSEO
  useSEO(pageSEO['/services/conciergerie']);
  
  const pageData = servicesData['conciergerie'];

  // ✅ 2. Schema.org JSON-LD pour ProfessionalService
  const conciergeSchema = useMemo(() => {
    const baseUrl = 'https://www.aldas-ci.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/services/conciergerie#professionalservice`,
      name: pageSEO['/services/conciergerie'].title,
      description: pageSEO['/services/conciergerie'].description,
      image: pageSEO['/services/conciergerie'].ogImage,
      url: `${baseUrl}/services/conciergerie`,
      telephone: '+2250747265693',
      priceRange: '$$$',
      serviceType: 'Conciergerie haut de gamme',
      areaServed: {
        '@type': 'City',
        'name': 'Abidjan, Côte d\'Ivoire'
      },
      availableLanguage: ['fr', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        'name': 'Services de Conciergerie ÁLDÁS',
        'description': 'Catalogue complet de nos services de conciergerie premium',
        'itemListElement': conciergeServices.map((service, index) => ({
          '@type': 'OfferCatalogItem',
          'position': index + 1,
          'name': service.title,
          'description': service.description,
          'itemOffered': {
            '@type': 'Service',
            'name': service.title,
            'serviceType': 'Conciergerie',
            'areaServed': 'Abidjan, Côte d\'Ivoire',
            'offers': {
              '@type': 'Offer',
              'availability': 'https://schema.org/InStock',
              'url': `${baseUrl}/contact?service=conciergerie&category=${encodeURIComponent(service.title)}`
            }
          }
        }))
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', 'name': 'Disponibilité 24h/24 - 7j/7', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Discrétion absolue', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Réseau de partenaires premium', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Personnalisation sur mesure', 'value': true }
      ],
      makesOffer: {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Conciergerie haut de gamme',
          'serviceOutput': {
            '@type': 'City',
            'name': 'Abidjan'
          }
        }
      }
    };
  }, []);

  // ✅ 3. Helper pour formatage des URLs d'images
  const getImageUrl = useCallback((url: string): string => {
    return url.startsWith('http') ? url : `/${url}`;
  }, []);

  // ✅ 4. Gestionnaire de clic pour les liens de service (accessibilité)
  const handleServiceLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, serviceName: string) => {
    // Tracking optionnel : enregistrer le clic sur un service spécifique
    console.log(`📊 Clic sur le service : ${serviceName}`);
    // Laisser React Router gérer la navigation
  }, []);

  return (
    // ✅ Structure sémantique principale avec ARIA et microdata
    <main 
      className="bg-white font-sans antialiased selection:bg-aldas selection:text-white"
      role="main"
      aria-label="Conciergerie haut de gamme à Abidjan - ÁLDÁS CI"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      {/* ✅ 5. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conciergeSchema) }}
      />
      
      {/* ✅ 6. H1 unique pour SEO (sr-only car PageHero gère le visuel) */}
      <h1 className="sr-only" itemProp="name">
        {pageSEO['/services/conciergerie'].title}
      </h1>
      <meta itemProp="description" content={pageSEO['/services/conciergerie'].description} />
      <meta itemProp="image" content={pageSEO['/services/conciergerie'].ogImage} />
      <link itemProp="url" href="https://www.aldas-ci.com/services/conciergerie" />
      
      {/* --- 1. HERO SPÉCIFIQUE --- */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Contactez-nous"
        btnLink="#contact-conciergerie"
        id="conciergerie-hero"
        ariaLabel="Section d'introduction - Conciergerie haut de gamme ÁLDÁS"
        imageAlt="Services de conciergerie premium ÁLDÁS à Abidjan, Côte d'Ivoire"
      />

      {/* --- 2. SECTION À PROPOS --- */}
      <section 
        className="relative py-12 md:py-20 overflow-hidden bg-white"
        role="region"
        aria-labelledby="about-conciergerie-heading"
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
            <div className="w-full lg:w-1/2 space-y-6">
              
              {/* Badge */}
              <span 
                className="inline-block px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-bold tracking-wide uppercase text-[#0b2545] rounded-full mb-4"
                style={{ 
                  backgroundColor: 'rgba(0,184,148,0.15)',
                  fontSize: 'clamp(0.7rem, 0.5vw, 1rem)',
                  padding: 'clamp(6px, 1vw, 8px)',
                  marginBottom: 'clamp(10px, 2vw, 14px)'
                }}
                itemProp="serviceType"
              >
                Conciergerie haut de gamme
              </span>

              {/* Titre H2 avec ID pour aria-labelledby */}
              <h2 
                id="about-conciergerie-heading"
                className="font-bold text-[#0b2545] leading-tight mb-6"
                style={{ 
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  marginBottom: 'clamp(15px, 3vw, 20px)'
                }}
                itemProp="description"
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

              {/* Texte descriptif */}
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

              {/* Liste à puces avec microdata */}
              <ul className="list-none p-0 m-0 space-y-3" role="list" aria-label="Avantages de la conciergerie ÁLDÁS">
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
                    role="listitem"
                    itemProp="amenityFeature"
                  >
                    <CheckCircle 
                      className="shrink-0 text-[#00b894]" 
                      size={20} 
                      style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                    <span itemProp="name">{item}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* COLONNE VIDE (RESPIRATION VISUELLE) - décorative */}
            <div className="w-full lg:w-1/2" aria-hidden="true"></div>

          </div>
        </div>
      </section>

      {/* --- 3. SECTION APTITUDES --- */}
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
        ]}
        // Props ARIA pour accessibilité
        ariaLabel="Nos aptitudes en conciergerie haut de gamme"
        id="aptitudes-conciergerie"
      />

      {/* --- 4. GRILLE DE SERVICES "RIDEAU" (Dark Mode) --- */}
      <section 
        className="py-24 bg-[#0b0f14] text-white relative overflow-hidden"
        role="region"
        aria-labelledby="services-catalog-heading"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 
              id="services-catalog-heading" 
              className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
              itemProp="hasOfferCatalog"
              itemScope
              itemType="https://schema.org/OfferCatalog"
            >
              <meta itemProp="name" content="Catalogue de services de conciergerie" />
              Notre offre de services dédiés
            </h2>
            <p className="text-gray-400 text-lg font-light" itemProp="description">
              Réactivité, discrétion et excellence pour vous satisfaire. Passez la souris pour découvrir les détails.
            </p>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label={`Catalogue de ${conciergeServices.length} services de conciergerie`}
          >
            {conciergeServices.map((service, idx) => (
              <article 
                key={service.title}
                className="group relative bg-[#111820] rounded-2xl overflow-hidden shadow-2xl h-[360px] cursor-pointer focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-[#0b0f14]"
                role="listitem"
                itemScope
                itemType="https://schema.org/Service"
                tabIndex={0}
                aria-label={`Service de conciergerie : ${service.title}`}
              >
                {/* Microdata pour le service */}
                <meta itemProp="name" content={service.title} />
                <meta itemProp="description" content={service.description} />
                <meta itemProp="serviceType" content="Conciergerie" />
                <link itemProp="url" href={`https://www.aldas-ci.com/contact?service=conciergerie&category=${encodeURIComponent(service.title)}`} />
                
                {/* Image du service */}
                <img 
                  src={getImageUrl(service.image)} 
                  alt={`${service.title} - Service de conciergerie premium ÁLDÁS à Abidjan`}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105 focus:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={400}
                  itemProp="image"
                />
                
                {/* Titre visible (décoratif pour le hover) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-aldas to-cyan-500 p-4 z-20">
                  <h3 
                    className="text-base md:text-lg font-bold text-[#0b2545] truncate uppercase tracking-wide"
                    aria-hidden="true"
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Overlay avec détails au hover */}
                <div 
                  className="absolute inset-0 bg-[#0b2545]/95 backdrop-blur-sm transform -translate-y-full group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out z-30 flex flex-col justify-center p-8"
                  itemProp="description"
                >
                  <ul className="space-y-3 mb-8" role="list" aria-label={`Détails du service ${service.title}`}>
                    {service.items.map((item, i) => (
                      <li 
                        key={i} 
                        className="flex items-start gap-2 text-gray-300 text-sm font-light"
                        role="listitem"
                      >
                        <Star size={14} className="text-aldas shrink-0 mt-1" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact"
                    onClick={(e) => handleServiceLinkClick(e, service.title)}
                    className="self-start inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aldas to-cyan-500 text-[#0b2545] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,184,148,0.4)] hover:-translate-y-1 focus:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b0f14]"
                    aria-label={`Contacter ÁLDÁS pour le service ${service.title}`}
                    itemProp="url"
                  >
                    Réserver <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. AUTRES SERVICES --- */}
      <ServiceGrid 
        heroTitle={pageData.heroHeadline}
        ariaLabel="Découvrez nos autres services premium chez ÁLDÁS CI"
        sectionId="autres-services-conciergerie"
      />

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        article[role="listitem"]:focus,
        article[role="listitem"]:focus-within {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
          border-radius: 1rem;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          .group-hover\\:scale-105:hover,
          .group-hover\\:-translate-y-2:hover,
          .transition-transform,
          .transition-all {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Conciergerie;