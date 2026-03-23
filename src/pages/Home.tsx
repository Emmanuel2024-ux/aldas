// src/pages/Home.tsx
import ContactFormSplit from '../components/Contact/ContactFormSplit';
import FeaturedEventSection from '../components/Home/FeaturedEventSection';
import HeroSlider from '../components/Home/HeroSlider';
import PresentationSection from '../components/Home/PresentationSection';
import ServicesSection from '../components/Home/ServicesSection';
import VehicleShowcase from '../components/Services/VehicleShowcase';
import PartnersSlider from '../components/UI/PartnersSlider';
import SectionHeader from '../components/UI/SectionHeader';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* 1. Le Slider Héro (Uniquement sur la page d'accueil) */}
      <HeroSlider />
      
      <PresentationSection />

      <ServicesSection />

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

      
      <section className="bg-slate-50 mb-12 py-16 md:py-20">
        <SectionHeader 
          title="Découvrez notre flotte"
          subtitle="Notre gamme de véhicules pour entreprises et particuliers"
        />
        <VehicleShowcase />
      </section>
      <div className="relative z-40 -mt-20">
        <ContactFormSplit  />
      </div>

      <PartnersSlider />
    </div>
  );
};

export default Home;