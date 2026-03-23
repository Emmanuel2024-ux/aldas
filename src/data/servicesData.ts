// src/data/servicesData.ts
import { 
  CarFront, Headphones, Plane, Users, Clock, Award, Zap, 
  Building2, Star, ShieldCheck
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface Feature {
  text: string;
  icon: ComponentType<any>;
  colorClass: string; 
}

export interface ServiceItem {
  slug: string;
  title: string;
  subtitle: string;
  details: string;
  badge: string;
  img: string;
  link: string;
  heroHeadline: string; // Peut contenir du HTML <span class="highlight">
  features: Feature[];
}
import cars from '../assets/images/service-mobilite.webp';
import vans from '../assets/images/service-navette.jpg';
import events from '../assets/images/service-events.jpg';
import conciergerie from '../assets/images/service-conciergerie.jpeg';


export const servicesData: Record<string, ServiceItem> = {
  mobilite: {
    slug: 'mobilite',
    title: 'Location de voiture',
    subtitle: 'Flotte haut de gamme',
    details: 'Véhicules récents et luxueux pour tous vos déplacements.',
    badge: 'Mobilité',
    img: cars,
    link: '/services/mobilite',
    // MISE EN VALEUR : "véhicules de location" et "simple et sans stress"
    heroHeadline: 'Nous mettons à votre disposition des <span class="highlight">véhicules de location</span> pour vous offrir une expérience <span class="highlight">simple et sans stress</span>.',
    features: [
      { text: 'Véhicules récents et entretenus', icon: CarFront, colorClass: 'text-blue-500' },
      { text: 'Choix de voitures de luxe ou standards', icon: CarFront, colorClass: 'text-green-500' },
      { text: 'Assistance 24/7', icon: Headphones, colorClass: 'text-cyan-500' },
      { text: 'Location flexible (journée, semaine, mois)', icon: Clock, colorClass: 'text-amber-500' },
    ]
  },
  navette: {
    slug: 'navette',
    title: 'Service de navette',
    subtitle: 'Transferts & mobilité',
    details: 'Navettes sur mesure pour entreprises, hôtels et événements.',
    badge: 'Navette',
    img: vans,
    link: '/services/navette',
    // MISE EN VALEUR : "navettes" et "ponctuel et serein"
    heroHeadline: 'Nous coordonnons vos <span class="highlight">navettes</span> pour un transport <span class="highlight">ponctuel et serein</span>.',
    features: [
      { text: 'Transferts aéroport – hôtel – bureau', icon: Plane, colorClass: 'text-blue-500' },
      { text: 'Navettes pour événements et conférences', icon: Users, colorClass: 'text-green-500' },
      { text: 'Suivi en temps réel', icon: Clock, colorClass: 'text-amber-500' },
      { text: 'Chauffeurs professionnels et formés', icon: ShieldCheck, colorClass: 'text-cyan-500' },
    ]
  },
  evenements: {
    slug: 'evenements',
    title: 'Agence événementielle',
    subtitle: 'Organisation sur mesure',
    details: 'Événements corporates et privés avec coordination complète.',
    badge: 'Événement',
    img: events,
    link: '/services/evenements',
    // MISE EN VALEUR : "événements" et "sans stress"
    heroHeadline: 'Nous orchestrons vos <span class="highlight">événements</span> pour vous offrir une expérience <span class="highlight">sans stress</span>.',
    features: [
      { text: 'Événements corporates & institutionnels', icon: Building2, colorClass: 'text-blue-500' },
      { text: 'Cérémonies de prestige', icon: Award, colorClass: 'text-amber-500' },
      { text: 'Lancements & activations', icon: Zap, colorClass: 'text-red-500' },
      { text: 'Coordination globale avec partenaires certifiés', icon: Users, colorClass: 'text-cyan-500' },
    ]
  },
  conciergerie: {
    slug: 'conciergerie',
    title: 'Conciergerie',
    subtitle: 'Services personnalisés',
    details: 'Accompagnement VIP pour particuliers et entreprises.',
    badge: 'Conciergerie',
    img: conciergerie,
    link: '/services/conciergerie',
    // MISE EN VALEUR : "services de conciergerie" et "exclusive et fluide"
    heroHeadline: 'Nous orchestrons vos <span class="highlight">services de conciergerie</span> afin de garantir une expérience <span class="highlight">exclusive et fluide</span>.',
    features: [
      { text: 'Gestion de dossiers VIP', icon: Star, colorClass: 'text-amber-500' },
      { text: 'Réservations exclusives', icon: Building2, colorClass: 'text-blue-500' },
      { text: 'Accompagnement personnalisé 24/7', icon: Headphones, colorClass: 'text-green-500' },
      { text: 'Solutions sur mesure pour dirigeants et célébrités', icon: ShieldCheck, colorClass: 'text-cyan-500' },
    ]
  }
};

// Helper pour obtenir la liste des services SAUF celui en cours
export const getOtherServices = (currentSlug: string | null): ServiceItem[] => {
  const allServices = Object.values(servicesData);
  if (!currentSlug) return allServices;
  return allServices.filter(s => s.slug !== currentSlug);
};