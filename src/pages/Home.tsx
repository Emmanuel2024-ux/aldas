// src/pages/Home.tsx
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../seo/pageSEO';

import ContactFormSplit from '../components/Contact/ContactFormSplit';
import FeaturedEventSection from '../components/Home/FeaturedEventSection';
import HeroSlider from '../components/Home/HeroSlider';
import PresentationSection from '../components/Home/PresentationSection';
import ServicesSection from '../components/Home/ServicesSection';
import VehicleShowcase from '../components/Services/VehicleShowcase';
import PartnersSlider from '../components/UI/PartnersSlider';
import SectionHeader from '../components/UI/SectionHeader';

const Home = () => {
  // Application des meta tags SEO pour la page d'accueil
  useSEO(pageSEO['/']);

  return (
    // Balise sémantique <main> pour le contenu principal
    <main className="animate-fade-in" role="main" aria-label="Page d'accueil - ÁLDÁS CI">
      
      {/* 1. Hero Slider - Section d'introduction */}
      <section aria-labelledby="hero-title" className="relative">
        <HeroSlider />
        {/* Titre H1 caché visuellement mais lisible par les crawlers si HeroSlider n'en contient pas */}
        <h1 id="hero-title" className="sr-only">
          ÁLDÁS CI - Location de voitures, navettes, conciergerie et événementiel à Abidjan
        </h1>
      </section>
      
      {/* 2. Présentation - Qui sommes-nous */}
      <PresentationSection />

      {/* 3. Services - Les 4 pôles d'activité */}
      <section aria-labelledby="services-title" className="py-12 md:py-16">
        <ServicesSection />
      </section>

      {/* 4. Événement phare - Preuve sociale */}
      <FeaturedEventSection 
        title="Gala des 50 ans de PETROCI"
        category="Événement Corporate"
        date="15 Octobre 2025"
        location="Sofitel Hôtel Ivoire, Abidjan"
        attendees="500+ Invités VIP"
        description="Une soirée d'exception célébrant un demi-siècle d'excellence. Scénographie immersive, logistique millimétrée et expérience inoubliable pour les plus hautes autorités du secteur."
        imageUrl="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80"
        link="/services/evenements"
      />

      {/* 5. Flotte de véhicules - Catalogue */}
      <section 
        aria-labelledby="flotte-title" 
        className="bg-slate-50 mb-12 py-16 md:py-20"
      >
        <SectionHeader 
          id="flotte-title"
          title="Découvrez notre flotte"
          subtitle="Notre gamme de véhicules pour entreprises et particuliers"
        />
        <VehicleShowcase />
      </section>

      {/* 6. Formulaire de contact - CTA principal */}
      <div className="relative z-40 -mt-20">
        <ContactFormSplit />
      </div>

      {/* 7. Partenaires - Confiance et crédibilité */}
      <section aria-labelledby="partenaires-title" className="py-12">
        <h2 id="partenaires-title" className="sr-only">Nos partenaires de confiance</h2>
        <PartnersSlider 
          title="Nos partenaires de confiance"
          subtitle="ÁLDÁS CI collabore avec les meilleurs acteurs pour vous offrir un service d'exception."
          ariaLabel="Partenaires et collaborateurs d'ÁLDÁS CI - Page d'accueil"
          id="partenaires-home"
        />
      </section>

    </main>
  );
};

export default Home;