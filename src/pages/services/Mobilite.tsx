// src/pages/services/Mobilite.tsx
import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import VehicleShowcase from '../../components/Services/VehicleShowcase';

const Mobilite = () => {
  // On récupère les données spécifiques à cette page
  const pageData = servicesData['mobilite'];

  return (
    <div>
      {/* Hero Spécifique au service */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline} // Ou un sous-titre plus court
        btnText="Réserver maintenant"
        btnLink="/contact"
      />

      <VehicleShowcase />


     
      {/* Intégration du Grid : Exclura AUTOMATIQUEMENT 'mobilite' */}
      <ServiceGrid title="Découvrez nos autres pôles d'excellence" heroTitle={pageData.heroHeadline}/>
    </div>
  );
};

export default Mobilite;