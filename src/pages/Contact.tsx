// src/pages/Contact.tsx
import { Phone, MessageCircle, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useMemo, useCallback } from 'react';

import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../seo/pageSEO';
import PageHero from '../components/UI/PageHero';
import ContactFormSplit from '../components/Contact/ContactFormSplit';
import ContactMapCTA from '../components/Contact/ContactMapCTA';

// ✅ Image locale optimisée (WebP recommandé)
import contactHero from '../assets/images/hero-contact.jpg';

// --- TYPES ---
interface ContactMethod {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  value: string;
  sub: string;
  href: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
  delay: number;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
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

const iconPop: Variants = {
  hidden: { scale: 0.8, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.1 },
  },
};

const Contact = () => {
  // ✅ 1. SEO : Injection des meta tags (EN PREMIER)
  useSEO(pageSEO['/contact']);

  // ✅ 2. Données mémoïsées pour éviter les recréations
  const contactMethods: ContactMethod[] = useMemo(() => [
    { 
      icon: Phone, 
      title: 'Téléphone', 
      value: '+225 07 49 22 98 74', 
      sub: 'Service Client 24/7',
      href: 'tel:+2250749229874', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'group-hover:border-emerald-200',
      glow: 'group-hover:shadow-emerald-500/20',
      delay: 100 
    },
    { 
      icon: MessageCircle, 
      title: 'WhatsApp', 
      value: '+225 07 47 26 56 93', 
      sub: 'Réponse immédiate',
      href: 'https://wa.me/2250747265693', 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      border: 'group-hover:border-green-200',
      glow: 'group-hover:shadow-green-500/20',
      delay: 200 
    },
    { 
      icon: Mail, 
      title: 'Email', 
      value: 'contact@aldas-ci.com', 
      sub: 'Sous 2 heures',
      href: 'mailto:contact@aldas-ci.com', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'group-hover:border-blue-200',
      glow: 'group-hover:shadow-blue-500/20',
      delay: 300 
    },
    { 
      icon: MapPin, 
      title: 'Adresse', 
      value: 'Riviera Ciad, Rue E22', 
      sub: 'Abidjan, Côte d\'Ivoire',
      href: 'https://maps.app.goo.gl/dTu86XWuUoiZYYLh7', 
      color: 'text-rose-600', 
      bg: 'bg-rose-50', 
      border: 'group-hover:border-rose-200',
      glow: 'group-hover:shadow-rose-500/20',
      delay: 400 
    }
  ], []);

  // ✅ 3. Schema.org spécifique pour ContactPage
  const contactSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://www.aldas-ci.com/contact#contactpage',
    name: pageSEO['/contact'].title,
    description: pageSEO['/contact'].description,
    url: 'https://www.aldas-ci.com/contact',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.aldas-ci.com/#organization',
      name: 'ÁLDÁS CI',
      contactPoint: contactMethods.map(method => {
        const contactType = method.title === 'Téléphone' ? 'customer service' :
                           method.title === 'WhatsApp' ? 'technical support' :
                           method.title === 'Email' ? 'sales' : 'location';
        return {
          '@type': 'ContactPoint',
          'telephone': method.title === 'Téléphone' ? method.value.replace(/\s/g, '') : undefined,
          'email': method.title === 'Email' ? method.value : undefined,
          'contactType': contactType,
          'areaServed': 'CI',
          'availableLanguage': ['fr', 'en'],
          'contactOption': method.sub.includes('24/7') ? 'TollFree' : 'AvailableDuringBusinessHours'
        };
      }).filter(cp => cp.telephone || cp.email),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Riviera Ciad, Rue E22',
        addressLocality: 'Abidjan',
        addressCountry: 'CI'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '5.3600', // ⚠️ À remplacer par vos coordonnées exactes
        longitude: '-4.0083'
      },
      sameAs: [
        'https://wa.me/2250747265693',
        'mailto:contact@aldas-ci.com',
        'https://maps.app.goo.gl/dTu86XWuUoiZYYLh7'
      ]
    }
  }), [contactMethods]);

  // ✅ 4. Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ 5. Gestionnaire de clic intelligent pour les liens
  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Pour les liens tel:/mailto:/https:, laisser le navigateur gérer
    // Sauf pour Google Maps qu'on peut ouvrir dans un nouvel onglet
    if (href.includes('maps.app.goo.gl')) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    // Pour WhatsApp, ouvrir dans un nouvel onglet pour meilleure UX
    if (href.includes('wa.me')) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    // ✅ 6. Structure sémantique avec ARIA et microdata
    <main 
      className="bg-white font-sans antialiased selection:bg-aldas selection:text-white overflow-x-hidden"
      role="main"
      aria-label="Contactez ÁLDÁS CI - Devis, réservation et assistance"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* ✅ 7. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      {/* ✅ 8. H1 unique pour SEO (sr-only car PageHero gère le visuel) */}
      <h1 
        className="sr-only" 
        itemProp="headline"
        itemType="name"
      >
        {pageSEO['/contact'].title}
      </h1>
      <meta itemProp="description" content={pageSEO['/contact'].description} />
      <meta itemProp="image" content={pageSEO['/contact'].ogImage} />

      {/* --- 1. HERO CINÉMATOGRAPHIQUE --- */}
      <div className="relative h-[100vh] min-h-[700px] w-full overflow-hidden">
        <PageHero 
          image={contactHero}
          title="Contactez ÁLDÁS"
          subtitle="Une expertise premium à votre écoute. Mobilité, Événementiel, Conciergerie."
          btnText="Nous écrire"
          btnLink="#contact-form-section"
          id="contact-hero"
          ariaLabel="Section d'introduction - Contactez ÁLDÁS CI"
          imageAlt="Équipe ÁLDÁS CI prête à vous assister pour vos projets premium"
          scrollBehavior="smooth"
        />
        
        {/* Élément décoratif de transition (Vague subtile) - décoratif donc aria-hidden */}
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20"
          aria-hidden="true"
        >
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </div>

      {/* --- 2. CARTES FLOTTANTES "CRYSTAL" --- */}
      <motion.section 
        className="py-24 bg-gray-50 relative -mt-12 md:-mt-20 z-30 pb-32"
        role="region"
        aria-labelledby="contact-methods-heading"
        // Animation d'apparition de la section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* En-tête avec animations Framer Motion */}
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-widest text-gray-500 uppercase shadow-sm">
              <Sparkles size={14} className="text-aldas" aria-hidden="true" />
              Disponibles 24/7
            </span>
            <motion.h2 
              id="contact-methods-heading"
              className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Nos canaux directs
            </motion.h2>
          </motion.div>

          {/* Grille des méthodes de contact avec animations en cascade */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            role="list"
            aria-label="Méthodes de contact pour joindre ÁLDÁS CI"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {contactMethods.map((method) => (
              <motion.a 
                key={method.title} 
                href={method.href}
                onClick={(e) => handleContactClick(e, method.href)}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group relative bg-white/80 backdrop-blur-xl p-8 rounded-none shadow-lg hover:shadow-2xl ${method.glow} transition-shadow duration-300 transform border border-gray-100 ${method.border} flex flex-col items-center text-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-gray-50`}
                role="listitem"
                // Animation au scroll
                variants={fadeInUp}
                // Animation au hover (désactivée si prefers-reduced-motion)
                whileHover={prefersReducedMotion ? undefined : { y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                // Animation au focus pour accessibilité clavier
                whileFocus={{ boxShadow: '0 0 0 3px rgba(6,182,212,0.3)', scale: 1.02 }}
                // Microdata Schema.org pour chaque méthode de contact
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                {/* Meta Schema.org */}
                <meta itemProp="contactType" content={method.title} />
                <meta itemProp="telephone" content={method.title === 'Téléphone' ? method.value.replace(/\s/g, '') : undefined} />
                <meta itemProp="email" content={method.title === 'Email' ? method.value : undefined} />
                
                {/* Effet de lueur interne - décoratif */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-${method.color.split('-')[1]}-50/40 to-transparent pointer-events-none`}
                  aria-hidden="true"
                />
                
                <div className="relative z-10 flex flex-col items-center">
                  {/* Conteneur Icône avec animation */}
                  <motion.div 
                    className={`w-20 h-20 ${method.bg} ${method.color} flex items-center justify-center shadow-inner border border-white/50`}
                    variants={iconPop}
                    // Animation hover sur l'icône seule
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <method.icon size={32} strokeWidth={1.5} aria-hidden="true" />
                  </motion.div>
                  
                  {/* Anneau animé autour de l'icône - décoratif */}
                  <div 
                    className="absolute inset-0 rounded-full border border-current opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700 animate-ping"
                    aria-hidden="true"
                  />

                  <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight" itemProp="name">
                    {method.title}
                  </h3>
                  <p className="text-xs font-bold text-aldas uppercase tracking-widest mb-3">{method.sub}</p>
                  <p className="text-gray-600 font-medium text-lg" itemProp={method.title === 'Email' ? 'email' : 'telephone'}>
                    {method.value}
                  </p>
                  
                  {/* Flèche apparaissant au survol - décorative */}
                  <motion.div
                    className="mt-4"
                    initial={{ y: 8, opacity: 0 }}
                    whileHover={prefersReducedMotion ? undefined : { y: 0, opacity: 1, color: '#06b6d4' }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* --- 3. FORMULAIRE SPLIT --- */}
      <div className="relative z-40 -mt-20" id="contact-form-section">
        <ContactFormSplit />
      </div>

      {/* --- 4. MAP IMMERSIVE & CTA FINAL --- */}
      <motion.div 
        className="relative z-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ContactMapCTA 
          showCTA={true}
          ctaText="Commencer l'expérience"
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63561.5979902716!2d-4.0216612815857085!3d5.32493555824972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed003087fa37%3A0x5a8dae7e21d7003a!2sMaison%20Ciad!5e0!3m2!1sfr!2sci!4v1749592464538!5m2!1sfr!2sci"
          // Props ARIA pour accessibilité
          ariaLabel="Localisation de ÁLDÁS CI à Abidjan, Côte d'Ivoire"
        />
      </motion.div>

      {/* ✅ Styles CSS pour états focus et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        [role="listitem"]:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          [role="listitem"],
          [role="listitem"] *,
          .animate-ping {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Contact;