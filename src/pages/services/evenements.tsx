// src/pages/services/Evenementiel.tsx
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import RealizationsGrid from '../../components/Events/RealizationsGrid';
import EventSlider from '../../components/Events/EventsSlider';
import EventPoles from '../../components/Events/EventsPoles';
import ModernHR from '../../components/UI/ModernHR';
import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';

const Evenementiel = () => {
  const pageData = servicesData['evenements'];

  return (
    <div className="bg-white font-sans antialiased">
      
      {/* 1. HERO */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline}
        btnText="Demander un devis"
        btnLink="/contact"
      />

      {/* 2. SLIDER DUAL PANEL */}
      <EventSlider />
      <ModernHR />
     
      <SectionHeaderCentered 
        badge="Events Pro"
        title="Nous Imaginons. Nous Créons. Nous Orchestrons."
        description="Une équipe spécialisée en organisation d'événements à Abidjan, dédiée à transformer chaque vision en expérience mémorable et immersive."
      />

      {/* 4. PÔLES D'ACTIVITÉ */}
      <EventPoles />
      
      {/* 5. RÉALISATIONS */}
      <RealizationsGrid />

      {/* 6. AUTRES SERVICES */}
      <ServiceGrid heroTitle={pageData.heroHeadline}/>
      
    </div>
  );
};

export default Evenementiel;