// src/data/homeData.ts

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
    bg: "https://img.sixt.com/2800/a58475de-1da1-429c-819e-31721300ffee.jpg",
    tagline: "Location de voiture",
    title: "Vous cherchez un véhicule ? Vous êtes au bon endroit",
    desc: "Découvrez une large gamme de véhicules récents : économiques, premium, luxe ou SUV. ÁLDÁS vous accompagne pour tous vos déplacements.",
    align: "left",
    link: "/services/mobilite",
    bgColor: "rgba(10,20,30,0.7)" // Un peu plus opaque pour la lisibilité
  },
  {
    id: 2,
    bg: "https://www.transfert-casablanca.com/wp-content/uploads/2020/01/casablanca-eljadida3.jpg",
    tagline: "Service de navette",
    title: "Vous cherchez un service de transfert ? Vous êtes au bon endroit",
    desc: "Profitez d'un service de transport fiable, ponctuel et discret. Nos chauffeurs formés assurent vos déplacements aéroport, hôtel et événements.",
    align: "right",
    link: "/services/navette",
    bgColor: "rgba(30,20,10,0.7)"
  },
  {
    id: 3,
    bg: "https://image.jimcdn.com/app/cms/image/transf/dimension=990x10000:format=png/path/scfb88433733f5430/image/i7a99615238b89f52/version/1606302716/agence-%C3%A9v%C3%A8nementielle-marketing-chloe-production-tarbes-pau-dax-auch-toulouse-bordeaux-65-64-40-32-33-31-nouvelle-aquitaine-hautes-pyrenees-atlantiques.png",
    tagline: "Agence événementielle",
    title: "Voulez-vous organiser un événement élégant et mémorable ?",
    desc: "Organisation complète d'événements professionnels et privés : logistique, coordination, accueil VIP et scénographie sur mesure.",
    align: "left",
    link: "/services/evenements",
    bgColor: "rgba(30,10,20,0.7)"
  },
  {
    id: 4,
    bg: "https://cdn.pixabay.com/photo/2015/09/15/11/04/hotel-940730_1280.jpg",
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