// src/pages/services/Navette.tsx
import { useMemo, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../seo/pageSEO';
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import PolesSection, { type PoleItem } from '../../components/Events/EventsPoles';
import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';
import { Briefcase, Building2, Globe, Handshake } from 'lucide-react';

// --- DONNÉES MÉMOÏSÉES ---
const navettePoles: PoleItem[] = [
  {
    badge: 'Business',
    icon: Briefcase,
    title: 'Voyageurs d\'Affaires',
    desc: "Des solutions de transport premium conçues pour les professionnels, alliant ponctualité, discrétion et confort à chaque déplacement.",
    description: "Transferts aéroportuaires et navettes professionnelles avec chauffeurs dédiés",
    imageSrc: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    imageAlt: "Voyageurs d'affaires en navette premium ÁLDÁS à Abidjan",
    list: [
      'Transferts aéroportuaires fiables et ponctuels',
      'Navettes pour conférences, séminaires et réunions',
      'Transport personnalisé avec véhicules haut de gamme',
      'Respect strict des horaires professionnels'
    ],
    link: '/contact#contact-form'
  },
  {
    badge: 'Humanitaire',
    icon: Handshake,
    title: 'Missions ONG',
    desc: "Un accompagnement logistique sécurisé et fiable pour les organisations humanitaires opérant sur le terrain, même dans les zones sensibles.",
    description: "Transport sécurisé pour équipes humanitaires en Côte d'Ivoire",
    imageSrc: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80',
    imageAlt: "Équipe humanitaire en transport sécurisé ÁLDÁS en zone rurale",
    list: [
      'Transport sécurisé des équipes terrain',
      'Accès aux zones rurales et isolées',
      'Logistique du matériel et du personnel',
      'Connaissance approfondie du terrain local'
    ],
    link: '/contact#contact-form'
  },
  {
    badge: 'Entreprise',
    icon: Building2,
    title: 'Transfert du Personnel',
    desc: "Des solutions de mobilité dédiées aux entreprises pour assurer le déplacement quotidien des collaborateurs en toute sérénité.",
    description: "Navettes d'entreprise régulières pour le transport du personnel",
    imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    imageAlt: "Navette d'entreprise ÁLDÁS pour le transport du personnel à Abidjan",
    list: [
      'Navettes d\'entreprise dédiées',
      'Horaires flexibles selon vos contraintes',
      'Transport de groupes et équipes',
      'Régularité et fiabilité opérationnelle'
    ],
    link: '/contact#contact-form'
  },
  {
    badge: 'Tourisme',
    icon: Globe,
    title: 'Voyages Touristiques',
    desc: "Une expérience de transport confortable et immersive pour découvrir la Côte d'Ivoire en toute tranquillité.",
    description: "Excursions et circuits touristiques avec transport premium",
    imageSrc: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    imageAlt: "Touristes en excursion avec navette premium ÁLDÁS en Côte d'Ivoire",
    list: [
      'Excursions et circuits guidés',
      'Navettes hôtels – aéroports',
      'Transport de groupes et familles',
      'Confort, sécurité et découverte culturelle'
    ],
    link: '/contact#contact-form'
  }
];

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const Navette = () => {
  // ✅ 1. SEO : Injection des meta tags via useSEO (EN PREMIER)
  useSEO(pageSEO['/services/navette']);
  
  const pageData = servicesData['navette'];
  
  // ✅ 2. Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ 3. Schema.org JSON-LD pour TaxiService + Catalogue de navettes
  const navetteSchema = useMemo(() => {
    const baseUrl = 'https://www.aldas-ci.com';
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TaxiService',
          '@id': `${baseUrl}/services/navette#taxiservice`,
          name: pageSEO['/services/navette'].title,
          description: pageSEO['/services/navette'].description,
          image: pageSEO['/services/navette'].ogImage,
          url: `${baseUrl}/services/navette`,
          telephone: '+2250747265693',
          priceRange: 'Sur devis',
          serviceType: 'Navettes et transferts premium',
          areaServed: {
            '@type': 'City',
            'name': 'Abidjan, Côte d\'Ivoire'
          },
          availableLanguage: ['fr', 'en'],
          openingHours: 'Mo-Su 06:00-22:00',
          amenityFeature: navettePoles.map(pole => ({
            '@type': 'LocationFeatureSpecification',
            name: pole.title,
            value: true,
            description: pole.description
          })),
          makesOffer: {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Taxi',
              name: 'Navettes premium ÁLDÁS',
              vehicleConfiguration: 'Berlines, SUV, Minibus premium',
              seatingCapacity: { min: 4, max: 16 },
              vehicleSpecialUsage: 'Shuttle'
            }
          }
        },
        {
          '@type': 'ItemList',
          '@id': `${baseUrl}/services/navette#poles`,
          name: 'Pôles d\'expertise navettes ÁLDÁS',
          itemListElement: navettePoles.map((pole, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Service',
              name: pole.title,
              description: pole.desc,
              serviceType: `Navette - ${pole.badge}`,
              areaServed: 'Abidjan, Côte d\'Ivoire'
            }
          }))
        }
      ]
    };
  }, []);

  // ✅ 4. Gestionnaire de clic pour tracking optionnel
  const handlePoleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, poleTitle: string) => {
    console.log(`📊 Pôle navette clicked: ${poleTitle}`);
    // Laisser React Router gérer la navigation
  }, []);

  return (
    // ✅ Structure sémantique principale avec ARIA et microdata
    <motion.main 
      className="bg-white font-sans antialiased selection:bg-emerald-900 selection:text-white"
      role="main"
      aria-label="Service de navettes et transferts premium à Abidjan - ÁLDÁS CI"
      itemScope
      itemType="https://schema.org/TaxiService"
      // Animation d'apparition de la page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ✅ 5. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navetteSchema) }}
      />
      
      {/* ✅ 6. H1 unique pour SEO (sr-only car PageHero gère le visuel) */}
      <h1 className="sr-only" itemProp="name">
        {pageSEO['/services/navette'].title}
      </h1>
      <meta itemProp="description" content={pageSEO['/services/navette'].description} />
      <meta itemProp="image" content={pageSEO['/services/navette'].ogImage} />
      <link itemProp="url" href="https://www.aldas-ci.com/services/navette" />
      
      {/* --- 1. HERO SPÉCIFIQUE --- */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Réserver maintenant"
        btnLink="/contact"
        id="navette-hero"
        ariaLabel="Section d'introduction - Service de navettes premium ÁLDÁS"
        imageAlt="Navette premium ÁLDÁS pour transferts aéroport et déplacements professionnels à Abidjan"
      />

      {/* --- 2. EN-TÊTE DE SECTION (avec animations Framer Motion) --- */}
      <motion.section
        className="py-8 md:py-12"
        role="region"
        aria-labelledby="navette-expertise-heading"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeaderCentered 
          id="navette-expertise-heading"
          badge="NOTRE EXPERTISE"
          title="Votre passerelle vers un voyage serein et sécurisé à Abidjan"
          description="ÁLDÁS propose des solutions de mobilité haut de gamme, avec des navettes ponctuelles, des chauffeurs professionnels et une flotte de véhicules premium. Que vous soyez un particulier, une entreprise ou une mission ONG, nous garantissons un transport sûr, confortable et adapté à vos besoins."
          headingLevel={2}
        />
      </motion.section>

      {/* --- 3. PÔLES D'ACTIVITÉ (avec props ARIA et animations) --- */}
      <motion.section
        className="py-12"
        role="region"
        aria-label="Nos pôles d'expertise en service de navettes"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <PolesSection 
          items={navettePoles}
          // Props ARIA pour accessibilité
          ariaLabel="Pôles d'activité en service de navettes et transferts premium"
          id="navette-poles-section"
          sectionTitle="Expertise navettes ÁLDÁS"
        />
      </motion.section>

      {/* --- 4. AUTRES SERVICES --- */}
      <motion.section
        className="py-12"
        role="region"
        aria-label="Découvrez nos autres services premium"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ServiceGrid 
          heroTitle={pageData.heroHeadline}
          ariaLabel="Découvrez nos autres services : location de voitures, conciergerie, événementiel"
          sectionId="autres-services-navette"
        />
      </motion.section>

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Focus visible pour navigation clavier */
        a:focus, button:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
      `}</style>
    </motion.main>
  );
};

export default Navette;