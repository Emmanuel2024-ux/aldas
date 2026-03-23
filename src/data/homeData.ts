import vans from '../assets/images/service-mobilite.webp';
import cars from '../assets/images/service-navette.jpg';
import conciergerie from '../assets/images/service-conciergerie.jpeg';
import events from '../assets/images/service-events.jpg';

export interface Slide {
  id: number;
  bg: string;
  tagline: string;
  title: string;
  desc: string;
  align: 'left' | 'right' | 'center';
  link: string;
  bgColor: string;
}

export const homeSlides: Slide[] = [
  {
    id: 1,
    bg: cars,
    tagline: "Location de voiture",
    title: "Vous cherchez un véhicule ? Vous êtes au bon endroit",
    desc: "Découvrez une large gamme de véhicules récents : économiques, premium, luxe ou SUV. ÁLDÁS vous accompagne pour tous vos déplacements.",
    align: "left",
    link: "/services/mobilite",
    bgColor: "rgba(10,20,30,0.7)" // Un peu plus opaque pour la lisibilité
  },
  {
    id: 2,
    bg: vans,
    tagline: "Service de navette",
    title: "Vous cherchez un service de transfert ? Vous êtes au bon endroit",
    desc: "Profitez d'un service de transport fiable, ponctuel et discret. Nos chauffeurs formés assurent vos déplacements aéroport, hôtel et événements.",
    align: "right",
    link: "/services/navette",
    bgColor: "rgba(30,20,10,0.7)"
  },
  {
    id: 3,
    bg: events,
    tagline: "Agence événementielle",
    title: "Voulez-vous organiser un événement élégant et mémorable ?",
    desc: "Organisation complète d'événements professionnels et privés : logistique, coordination, accueil VIP et scénographie sur mesure.",
    align: "left",
    link: "/services/evenements",
    bgColor: "rgba(30,10,20,0.7)"
  },
  {
    id: 4,
    bg: conciergerie,
    tagline: "Conciergerie haut de gamme",
    title: "Vous cherchez une conciergerie d'exception ?",
    desc: "Des solutions sur mesure pour répondre à vos besoins les plus exigeants : organisation, assistance, accueil VIP et coordination complète.",
    align: "right",
    link: "/services/conciergerie",
    bgColor: "rgba(10,30,20,0.7)"
  }
];

export const defaultHero = {
  title: "Conciergerie de Luxe à Abidjan",
  subtitle: "Services premium sur-mesure pour particuliers et entreprises.",
  btnTxt: "Découvrir nos services",
  btnLink: "/services"
};