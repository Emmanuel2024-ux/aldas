// src/pages/About.tsx
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../seo/pageSEO';
import { Award, ShieldCheck, EyeOff, Stars, Quote } from 'lucide-react';
import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion'; 

import PageHero from '../components/UI/PageHero';
import ValuesSection from '../components/UI/ValuesSection';
import ServiceGrid from '../components/Services/ServiceGrid';
import PartnersSlider from '../components/UI/PartnersSlider';

import aboutHero from '../assets/images/about-hero.webp';
import aboutTeam from '../assets/images/about-team.webp';

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

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
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

const About = () => {
  // ✅ SEO : Injection des meta tags (EN PREMIER)
  useSEO(pageSEO['/about']);

  // ✅ Données mémoïsées
  const qualities = useMemo(() => [
    {
      icon: Award,
      title: 'Excellence',
      text: "L'exigence comme norme. Chaque service est pensé pour dépasser vos attentes les plus élevées.",
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: ShieldCheck,
      title: 'Sécurité',
      text: "Des services fiables, contrôlés et adaptés. Votre tranquillité d'esprit est notre priorité.",
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: EyeOff,
      title: 'Discrétion',
      text: "Une confidentialité absolue. Nous opérons dans l'ombre pour mettre votre réussite en lumière.",
      color: 'text-gray-600',
      bg: 'bg-gray-100'
    },
    {
      icon: Stars,
      title: 'Élégance',
      text: "Le raffinement dans chaque détail. Une harmonie parfaite entre style et efficacité.",
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ], []);

  // ✅ Schema.org pour AboutPage
  const aboutSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.aldas-ci.com/about#aboutpage',
    name: pageSEO['/about'].title,
    description: pageSEO['/about'].description,
    url: 'https://www.aldas-ci.com/about',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.aldas-ci.com/#organization',
      name: 'ÁLDÁS CI',
      alternateName: ['ÁLDÁS', 'Aldas Conciergerie'],
      description: 'Services premium de mobilité, conciergerie et événementiel en Côte d\'Ivoire',
      foundingDate: '2024',
      foundingLocation: { '@type': 'City', name: 'Abidjan, Côte d\'Ivoire' },
      address: { '@type': 'PostalAddress', addressLocality: 'Abidjan', addressCountry: 'CI' },
      mission: 'Offrir des services premium qui transforment chaque expérience client en moment d\'exception.',
      values: ['Excellence', 'Sécurité', 'Discrétion', 'Élégance', 'Professionnalisme', 'Innovation'],
      knowsAbout: ['Location de voitures premium', 'Navettes aéroport', 'Conciergerie', 'Événementiel'],
      areaServed: { '@type': 'Country', name: 'Côte d\'Ivoire' }
    }
  }), []);

  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <main>
      <div 
        className="bg-white font-sans antialiased selection:bg-aldas selection:text-white overflow-hidden"
        role="main"
        aria-label="À propos d'ÁLDÁS CI - Notre histoire et nos valeurs"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
        
        {/* H1 unique pour SEO */}
        <h1 className="sr-only" itemProp="headline">
          {pageSEO['/about'].title}
        </h1>
        <meta itemProp="description" content={pageSEO['/about'].description} />
        <meta itemProp="image" content={pageSEO['/about'].ogImage} />

        {/* --- 1. HERO --- */}
        <PageHero 
          image={aboutHero} 
          title="À Propos"
          subtitle="Une expertise premium pensée pour une clientèle exigeante."
          btnText="Découvrir nos services"
          btnLink="#services-about"
          id="about-hero"
          ariaLabel="Section d'introduction - Présentation d'ÁLDÁS CI"
          imageAlt="Équipe ÁLDÁS CI réunie pour offrir des services premium à Abidjan"
        />

        {/* --- 2. QUI SOMMES-NOUS ? --- */}
        <motion.section 
          className="py-24 bg-white relative overflow-hidden"
          aria-labelledby="about-heading"
          // Animation d'apparition de la section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-end gap-12 lg:gap-20">
              
              {/* Colonne Image - Animation depuis la droite */}
              <motion.div 
                className="w-full lg:w-5/12 relative group"
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {/* Décoratifs */}
                <div className="absolute -top-10 -left-10 w-full h-full border border-aldas/20 rounded-[2.5rem] -z-10 hidden lg:block" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-aldas/30 to-blue-900/30 rounded-[2.5rem] transform translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8 blur-md" aria-hidden="true" />
                
                {/* Image Principale */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-[4/5]">
                  <img 
                    src={aboutTeam}
                    alt="L'équipe ÁLDÁS CI : professionnels dédiés à l'excellence du service en Côte d'Ivoire"
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                    width={600}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" aria-hidden="true" />
                  
                  {/* Badge Flottant - Animation zoom */}
                  <motion.div 
                    className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-2xl transform translate-y-0 group-hover:translate-y-[-5px] transition-transform duration-500"
                    variants={zoomIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-aldas rounded-full text-white shadow-lg shadow-aldas/50" aria-hidden="true">
                        <Award size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Fondé sur</p>
                        <p className="text-lg font-bold text-white drop-shadow-md">L'Excellence & l'Intégrité</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Colonne Texte - Animation depuis la gauche */}
              <motion.div 
                className="w-full lg:w-7/12 pb-8 lg:pb-12 space-y-10"
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {/* Badge "Notre Histoire" */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-aldas uppercase bg-aldas/5 border border-aldas/20 rounded-full">
                    Notre Histoire
                  </span>
                </motion.div>

                {/* Titre H2 */}
                <motion.h2 
                  id="about-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  L'excellence du service <span className="text-transparent bg-clip-text bg-gradient-to-r from-aldas via-cyan-500 to-blue-600">ivoirien</span> aux standards internationaux
                </motion.h2>
                
                {/* Paragraphes - Animation en cascade */}
                <motion.div 
                  className="space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed font-light border-l-2 border-aldas/30 pl-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.p variants={fadeInUp}>
                    <strong className="text-gray-900 font-semibold">Áldás</strong> est née d'une vision audacieuse : redéfinir les codes de la conciergerie haut de gamme en Côte d'Ivoire. Basée à Abidjan, nous nous spécialisons dans la gestion de services exclusifs pour une clientèle qui ne fait aucun compromis.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    Notre mission est claire : proposer une expérience premium conforme aux standards internationaux, tout en sublimant l'hospitalité légendaire et l'excellence du service ivoirien.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    Nous mettons à votre disposition une équipe d'experts, discrets et dévoués. Grâce à notre maîtrise de la mobilité, de la gestion VIP et de l'événementiel, nous garantissons un accompagnement <strong className="text-aldas font-medium">24h/24 et 7j/7</strong>.
                  </motion.p>
                </motion.div>

                {/* Signature */}
                <motion.div 
                  className="pt-8 flex items-center gap-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="h-px w-20 bg-gradient-to-r from-aldas to-transparent" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">La Direction</span>
                    <span className="text-xs text-gray-500 italic">ÁLDÁS Conciergerie</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* --- 3. NOS VALEURS (composant déjà migré vers Framer Motion) --- */}
        <ValuesSection 
          title="Nos Valeurs Fondamentales"
          subtitle="Ce qui nous guide"
          values={qualities}
          ariaLabel="Les valeurs fondamentales qui guident ÁLDÁS CI"
          id="valeurs-section"
        />

        {/* --- 4. PARTENAIRE DE CONFIANCE --- */}
        <motion.section 
          className="py-24 bg-white relative"
          aria-labelledby="partenaire-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-6xl mx-auto relative group"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl overflow-hidden border border-white/5">
                
                {/* Effets décoratifs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-aldas to-transparent shadow-[0_0_30px_rgba(6,182,212,0.6)]" aria-hidden="true" />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-aldas/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-aldas/15 transition-colors duration-700" aria-hidden="true" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 space-y-10">
                  {/* Icône Quote - Animation zoom */}
                  <motion.div 
                    className="inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 shadow-lg shadow-aldas/10"
                    variants={zoomIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    aria-hidden="true"
                  >
                    <Quote className="w-10 h-10 text-aldas" aria-hidden="true" />
                  </motion.div>
                  
                  {/* Citation avec Schema.org */}
                  <blockquote className="space-y-8 max-w-4xl mx-auto" itemScope itemType="https://schema.org/Quotation">
                    <motion.p 
                      className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-light tracking-tight"
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      itemProp="text"
                    >
                      "<strong className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Nous sommes un partenaire de confiance</strong>, un pilier sur lequel nos clients s'appuient pour concrétiser leurs ambitions."
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto"
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      Avec passion, nous offrons des solutions complètes visant à améliorer performance et confort. Chaque projet est porté par <span className="text-aldas-light font-medium border-b border-aldas/30">notre quête d'excellence</span>.
                    </motion.p>
                  </blockquote>

                  {/* Tags de valeurs */}
                  <motion.div 
                    className="pt-12 mt-12 border-t border-white/10"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div 
                      className="flex flex-wrap justify-center gap-4 mb-8" 
                      role="list" 
                      aria-label="Valeurs clés d'ÁLDÁS"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                    >
                      {['Responsabilité', 'Professionnalisme', 'Innovation', 'Discrétion'].map((word, idx) => (
                        <motion.span 
                          key={word} 
                          className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-widest hover:bg-aldas hover:border-aldas hover:text-white transition-all duration-300 cursor-default"
                          variants={fadeInUp}
                          custom={idx}
                          role="listitem"
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.05, backgroundColor: 'rgba(6,182,212,0.2)' }}
                          transition={{ delay: 0.6 + (idx * 0.1) }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.div>
                    <p className="text-aldas font-semibold text-lg md:text-xl tracking-wide">
                      Avec nous, vos projets se concrétisent et vos aspirations deviennent réalité.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- 5. GRID DES SERVICES --- */}
        <section id="services-about" className="bg-white relative" aria-labelledby="services-heading">
          <ServiceGrid 
            title="Nos Domaines d'Expertise" 
            heroTitle={null}
            sectionId="services-about"
            ariaLabel="Découvrez les services premium proposés par ÁLDÁS CI"
          />
        </section>
        <PartnersSlider ariaLabel="Nos partenaires de confiance" />  

        {/* ✅ Styles CSS pour reduced-motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
};

export default About;