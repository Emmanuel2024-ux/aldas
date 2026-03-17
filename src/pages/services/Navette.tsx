import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import PolesSection from '../../components/Events/EventsPoles';
import { Briefcase, Building2, Globe, Handshake} from 'lucide-react';
import SectionHeaderCentered from '../../components/UI/SectionHeaderCenter';

// 1. Définition des données (Traduction de ton tableau PHP)
const mobilitePoles = [
  {
    badge: 'Business',
    icon: Briefcase, // Correspond à bi-briefcase-fill
    title: 'Voyageurs d’Affaires',
    desc: "Des solutions de transport premium conçues pour les professionnels, alliant ponctualité, discrétion et confort à chaque déplacement.",
    imageSrc: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    imageAlt: "Voyageurs d'affaires",
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
    icon: Handshake, // Correspond à bi-shield-lock-fill
    title: 'Missions ONG',
    desc: "Un accompagnement logistique sécurisé et fiable pour les organisations humanitaires opérant sur le terrain, même dans les zones sensibles.",
    imageSrc: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb',
    imageAlt: 'Missions ONG',
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
    icon: Building2, // Correspond à bi-building-fill
    title: 'Transfert du Personnel',
    desc: "Des solutions de mobilité dédiées aux entreprises pour assurer le déplacement quotidien des collaborateurs en toute sérénité.",
    imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
    imageAlt: 'Transfert du personnel',
    list: [
      'Navettes d’entreprise dédiées',
      'Horaires flexibles selon vos contraintes',
      'Transport de groupes et équipes',
      'Régularité et fiabilité opérationnelle'
    ],
    link: '/contact#contact-form'
  },
  {
    badge: 'Tourisme',
    icon: Globe, // Correspond à bi-globe
    title: 'Voyages Touristiques',
    desc: "Une expérience de transport confortable et immersive pour découvrir la Côte d’Ivoire en toute tranquillité.",
    imageSrc: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    imageAlt: 'Voyages touristiques',
    list: [
      'Excursions et circuits guidés',
      'Navettes hôtels – aéroports',
      'Transport de groupes et familles',
      'Confort, sécurité et découverte culturelle'
    ],
    link: '/contact#contact-form'
  }
];

const Navette = () => {
  // On récupère les données spécifiques à cette page
  const pageData = servicesData['navette'];

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
      <SectionHeaderCentered 
        badge="NOTRE EXPERTISE"
        title="Votre passerelle vers un voyage serein et sécurisé à Abidjan"
        description="ÁLDÁS propose des solutions de mobilité haut de gamme, avec des navettes ponctuelles, des chauffeurs professionnels et une flotte de véhicules premium. Que vous soyez un particulier, une entreprise ou une mission ONG, nous garantissons un transport sûr, confortable et adapté à vos besoins."
      />

      <PolesSection items={mobilitePoles} />

      {/* Intégration du Grid : Exclura AUTOMATIQUEMENT 'mobilite' */}
      <ServiceGrid heroTitle={pageData.heroHeadline}/>
    </div>
  );
};

export default Navette
;