// src/pages/services/Evenementiel.tsx
import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../seo/pageSEO';
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import RealizationsGrid from '../../components/Events/RealizationsGrid';
import EventSlider from '../../components/Events/EventsSlider';
import EventPoles from '../../components/Events/EventsPoles';
import ModernHR from '../../components/UI/ModernHR';
import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const Evenementiel = () => {
  // ✅ 1. SEO : Injection des meta tags via useSEO (EN PREMIER)
  useSEO(pageSEO['/services/evenements']);
  
  const pageData = servicesData['evenements'];

  // ✅ 2. Schema.org JSON-LD pour EventVenue + ProfessionalService
  const eventSchema = useMemo(() => {
    const baseUrl = 'https://www.aldas-ci.com';
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          '@id': `${baseUrl}/services/evenements#professionalservice`,
          name: pageSEO['/services/evenements'].title,
          description: pageSEO['/services/evenements'].description,
          image: pageSEO['/services/evenements'].ogImage,
          url: `${baseUrl}/services/evenements`,
          telephone: '+2250747265693',
          priceRange: '$$$',
          serviceType: 'Organisation événementielle',
          areaServed: {
            '@type': 'City',
            'name': 'Abidjan, Côte d\'Ivoire'
          },
          availableLanguage: ['fr', 'en'],
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', 'name': 'Organisation clé en main', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Équipes dédiées', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Partenaires premium', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Suivi personnalisé', 'value': true }
          ]
        },
        {
          '@type': 'EventVenue',
          '@id': `${baseUrl}/services/evenements#eventvenue`,
          name: 'Événements ÁLDÁS CI',
          description: 'Lieu et organisation d\'événements premium à Abidjan',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abidjan',
            addressCountry: 'CI'
          },
          event: [
            { '@type': 'Event', 'name': 'Mariages & Cérémonies', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
            { '@type': 'Event', 'name': 'Séminaires d\'entreprise', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
            { '@type': 'Event', 'name': 'Lancements de produits', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
            { '@type': 'Event', 'name': 'Galas & Soirées VIP', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' }
          ]
        }
      ]
    };
  }, []);

  return (
    // ✅ Structure sémantique principale avec ARIA et microdata
    <motion.main 
      className="bg-white font-sans antialiased selection:bg-aldas selection:text-white"
      role="main"
      aria-label="Organisation d'événements premium à Abidjan - ÁLDÁS CI"
      itemScope
      itemType="https://schema.org/EventVenue"
      // Animation d'apparition de la page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ✅ 3. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      
      {/* ✅ 4. H1 unique pour SEO (sr-only car PageHero gère le visuel) */}
      <h1 className="sr-only" itemProp="name">
        {pageSEO['/services/evenements'].title}
      </h1>
      <meta itemProp="description" content={pageSEO['/services/evenements'].description} />
      <meta itemProp="image" content={pageSEO['/services/evenements'].ogImage} />
      <link itemProp="url" href="https://www.aldas-ci.com/services/evenements" />
      
      {/* --- 1. HERO --- */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Demander un devis"
        btnLink="/contact"
        id="evenements-hero"
        ariaLabel="Section d'introduction - Organisation d'événements premium ÁLDÁS"
        imageAlt="Événement premium organisé par ÁLDÁS CI à Abidjan : mariage, séminaire ou gala"
      />

      {/* --- 2. SLIDER DUAL PANEL (avec animations Framer Motion) --- */}
      <motion.section
        role="region"
        aria-label="Galerie d'événements réalisés par ÁLDÁS CI"
        // Animation d'apparition de la section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <EventSlider />
      </motion.section>

      {/* Séparateur décoratif */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ModernHR />
      </motion.div>
     
      {/* --- 3. EN-TÊTE DE SECTION (avec animations) --- */}
      <motion.section
        className="py-8"
        role="region"
        aria-labelledby="events-pro-heading"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeaderCentered 
          id="events-pro-heading"
          badge="Events Pro"
          title="Nous Imaginons. Nous Créons. Nous Orchestrons."
          description="Une équipe spécialisée en organisation d'événements à Abidjan, dédiée à transformer chaque vision en expérience mémorable et immersive."
          headingLevel={2}
        />
      </motion.section>

      {/* --- 4. PÔLES D'ACTIVITÉ (avec animations en cascade) --- */}
      <motion.section
        className="py-12"
        role="region"
        aria-label="Nos pôles d'expertise événementielle"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <EventPoles 
          // Props ARIA pour accessibilité
          ariaLabel="Pôles d'activité en organisation d'événements"
          id="event-poles-section"
        />
      </motion.section>
      
      {/* --- 5. RÉALISATIONS (avec animations) --- */}
      <motion.section
        className="py-12"
        role="region"
        aria-labelledby="realizations-heading"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 id="realizations-heading" className="sr-only">Nos réalisations événementielle  </h2>
        <RealizationsGrid />
      </motion.section>

      {/* --- 6. AUTRES SERVICES --- */}
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
          ariaLabel="Découvrez nos autres services : location, navettes, conciergerie"
          sectionId="autres-services-evenements"
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
        
        /* Focus visible pour navigation clavier sur les liens CTA */
        a:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
      `}</style>
    </motion.main>
  );
};

export default Evenementiel;