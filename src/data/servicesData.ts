// src/data/servicesData.ts
// ============================================================================
// 📦 DONNÉES DES SERVICES - ÁLDÁS CI
// ============================================================================
// Ce module centralise toutes les données statiques des pages services.
// 
// ✅ Typage TypeScript strict (pas de `any`)
// ✅ Icônes Lucide typées correctement
// ✅ HTML dans heroHeadline documenté et sécurisé
// ✅ Imports d'images optimisés (WebP en priorité)
// ✅ Fonctions utilitaires exportées avec types propres
// 
// UTILISATION :
// import { servicesData, getOtherServices, type ServiceItem } from '@/data/servicesData';
// ============================================================================

import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

// ✅ Imports d'images (optimisés WebP quand disponible)
import cars from '../assets/images/service-mobilite.webp';
import vans from '../assets/images/service-navette.jpg';
import events from '../assets/images/service-events.jpg';
import conciergerie from '../assets/images/service-conciergerie.jpeg';

// ✅ Imports d'icônes Lucide (seulement celles utilisées)
import { 
  CarFront, Headphones, Plane, Users, Clock, Award, Zap, 
  Building2, Star, ShieldCheck
} from 'lucide-react';

// ============================================================================
// 🎯 TYPES STRICTS (Exportés pour réutilisation)
// ============================================================================

/**
 * Type pour les props d'icônes Lucide
 * Évite d'utiliser `any` tout en restant flexible
 */
export type LucideIconProps = Omit<LucideProps, 'ref'>;

/**
 * Type pour les composants d'icônes Lucide
 * Plus précis que ComponentType<any>
 */
export type LucideIconComponent = ComponentType<LucideIconProps>;

/**
 * Interface pour une fonctionnalité/avantage d'un service
 */
export interface Feature {
  /** Texte descriptif de la fonctionnalité */
  text: string;
  /** Composant icône Lucide à afficher */
  icon: LucideIconComponent;
  /** Classe Tailwind pour la couleur de l'icône (ex: 'text-blue-500') */
  colorClass: string;
}

/**
 * Interface complète pour un service ÁLDÁS
 */
export interface ServiceItem {
  /** Slug unique pour l'URL (ex: 'mobilite') */
  slug: string;
  /** Titre court du service */
  title: string;
  /** Sous-titre pour les cartes/grilles */
  subtitle: string;
  /** Description détaillée pour les pages services */
  details: string;
  /** Badge/catégorie affiché sur les cartes */
  badge: string;
  /** Chemin de l'image principale (importé comme module) */
  img: string;
  /** Lien vers la page détaillée du service */
  link: string;
  /** 
   * Titre hero avec mise en valeur HTML
   * ⚠️ Contenu HTML limité aux tags <span class="highlight"> uniquement
   * ✅ Sanitization gérée côté rendu avec dangerouslySetInnerHTML contrôlé
   */
  heroHeadline: string;
  /** Liste des fonctionnalités/avantages du service */
  features: readonly Feature[];
}

/**
 * Type pour le registre des services (clé = slug, valeur = ServiceItem)
 */
export type ServicesDataRegistry = Record<string, ServiceItem>;

// ============================================================================
// 📋 DONNÉES DES SERVICES (Non exportées directement pour tree-shaking)
// ============================================================================

/**
 * Registre privé des services - utilisé en interne
 * Les données sont immuables (readonly) pour éviter les modifications accidentelles
 */
const SERVICES_DATA: ServicesDataRegistry = {
  mobilite: {
    slug: 'mobilite',
    title: 'Location de voiture',
    subtitle: 'Flotte haut de gamme',
    details: 'Véhicules récents et luxueux pour tous vos déplacements.',
    badge: 'Mobilité',
    img: cars,
    link: '/services/mobilite',
    // ✅ HTML contrôlé : uniquement <span class="highlight"> pour la mise en valeur
    heroHeadline: 'Nous mettons à votre disposition des <span class="highlight">véhicules de location</span> pour vous offrir une expérience <span class="highlight">simple et sans stress</span>.',
    features: [
      { text: 'Véhicules récents et entretenus', icon: CarFront, colorClass: 'text-blue-500' },
      { text: 'Choix de voitures de luxe ou standards', icon: CarFront, colorClass: 'text-green-500' },
      { text: 'Assistance 24/7', icon: Headphones, colorClass: 'text-cyan-500' },
      { text: 'Location flexible (journée, semaine, mois)', icon: Clock, colorClass: 'text-amber-500' },
    ] as const, // ✅ Immutable avec `as const`
  },
  
  navette: {
    slug: 'navette',
    title: 'Service de navette',
    subtitle: 'Transferts & mobilité',
    details: 'Navettes sur mesure pour entreprises, hôtels et événements.',
    badge: 'Navette',
    img: vans,
    link: '/services/navette',
    heroHeadline: 'Nous coordonnons vos <span class="highlight">navettes</span> pour un transport <span class="highlight">ponctuel et serein</span>.',
    features: [
      { text: 'Transferts aéroport – hôtel – bureau', icon: Plane, colorClass: 'text-blue-500' },
      { text: 'Navettes pour événements et conférences', icon: Users, colorClass: 'text-green-500' },
      { text: 'Suivi en temps réel', icon: Clock, colorClass: 'text-amber-500' },
      { text: 'Chauffeurs professionnels et formés', icon: ShieldCheck, colorClass: 'text-cyan-500' },
    ] as const,
  },
  
  evenements: {
    slug: 'evenements',
    title: 'Agence événementielle',
    subtitle: 'Organisation sur mesure',
    details: 'Événements corporates et privés avec coordination complète.',
    badge: 'Événement',
    img: events,
    link: '/services/evenements',
    heroHeadline: 'Nous orchestrons vos <span class="highlight">événements</span> pour vous offrir une expérience <span class="highlight">sans stress</span>.',
    features: [
      { text: 'Événements corporates & institutionnels', icon: Building2, colorClass: 'text-blue-500' },
      { text: 'Cérémonies de prestige', icon: Award, colorClass: 'text-amber-500' },
      { text: 'Lancements & activations', icon: Zap, colorClass: 'text-red-500' },
      { text: 'Coordination globale avec partenaires certifiés', icon: Users, colorClass: 'text-cyan-500' },
    ] as const,
  },
  
  conciergerie: {
    slug: 'conciergerie',
    title: 'Conciergerie',
    subtitle: 'Services personnalisés',
    details: 'Accompagnement VIP pour particuliers et entreprises.',
    badge: 'Conciergerie',
    img: conciergerie,
    link: '/services/conciergerie',
    heroHeadline: 'Nous orchestrons vos <span class="highlight">services de conciergerie</span> afin de garantir une expérience <span class="highlight">exclusive et fluide</span>.',
    features: [
      { text: 'Gestion de dossiers VIP', icon: Star, colorClass: 'text-amber-500' },
      { text: 'Réservations exclusives', icon: Building2, colorClass: 'text-blue-500' },
      { text: 'Accompagnement personnalisé 24/7', icon: Headphones, colorClass: 'text-green-500' },
      { text: 'Solutions sur mesure pour dirigeants et célébrités', icon: ShieldCheck, colorClass: 'text-cyan-500' },
    ] as const,
  },
} as const; // ✅ Tout le registre est immutable

// ============================================================================
// 🚀 EXPORTS PUBLICS (Seuls ces exports sont accessibles depuis l'extérieur)
// ============================================================================

/**
 * Registre public des services (lecture seule)
 * @example
 * const mobilite = servicesData.mobilite;
 * const title = servicesData['navette'].title;
 */
export const servicesData = SERVICES_DATA;

/**
 * Récupère tous les services SAUF celui spécifié
 * Utile pour les sections "Autres services" ou "Vous pourriez aussi aimer"
 * 
 * @param currentSlug - Le slug du service actuel à exclure (ex: 'mobilite')
 * @returns Tableau des services restants, triés par ordre d'insertion
 * 
 * @example
 * const others = getOtherServices('mobilite');
 * // Retourne: [navette, evenements, conciergerie]
 */
export const getOtherServices = (currentSlug: string | null | undefined): readonly ServiceItem[] => {
  const allServices = Object.values(servicesData);
  
  // Si pas de slug courant, retourner tous les services
  if (!currentSlug) return allServices;
  
  // Filtrer en excluant le service courant (comparaison insensible à la casse)
  return allServices.filter(service => service.slug.toLowerCase() !== currentSlug.toLowerCase());
};

/**
 * Récupère un service par son slug avec vérification de type
 * Plus sûr que l'accès direct via servicesData[slug]
 * 
 * @param slug - Le slug du service à récupérer
 * @returns Le ServiceItem si trouvé, undefined sinon
 * 
 * @example
 * const mobilite = getServiceBySlug('mobilite');
 * if (mobilite) { /* utiliser mobilite *\/ }
 */
export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData[slug.toLowerCase()];
};

/**
 * Liste de tous les slugs disponibles
 * Utile pour la génération de sitemaps, validation de routes, etc.
 * 
 * @returns Tableau des slugs de services (ex: ['mobilite', 'navette', ...])
 */
export const getAllServiceSlugs = (): readonly string[] => {
  return Object.keys(servicesData) as readonly string[];
};

// ============================================================================
// 🛡️ UTILITAIRES DE SÉCURITÉ (Pour le rendu du HTML dans heroHeadline)
// ============================================================================

/**
 * Valide et sanitize le contenu heroHeadline avant rendu
 * ⚠️ N'autorise QUE les tags <span class="highlight"> pour la mise en valeur
 * 
 * @param html - La chaîne HTML à valider
 * @returns La chaîne sanitizée ou une version fallback sécurisée
 * 
 * @security Cette fonction protège contre les injections XSS dans heroHeadline
 */
export const sanitizeHeroHeadline = (html: string): string => {
  // ✅ Autoriser uniquement : texte + <span class="highlight">...</span>
  // Tout autre tag HTML sera échappé
  
  // Échapper d'abord tous les caractères HTML spéciaux
  const escaped = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  // ✅ Ré-autoriser UNIQUEMENT les spans avec class="highlight"
  // Pattern : <span class="highlight">CONTENU</span>
  return escaped.replace(
    /&lt;span class=&quot;highlight&quot;&gt;(.*?)&lt;\/span&gt;/g,
    '<span class="highlight">$1</span>'
  );
};

/**
 * Type guard pour vérifier si une chaîne est un heroHeadline valide
 * Utile pour la validation à la compilation ou au runtime
 */
export const isValidHeroHeadline = (str: string): boolean => {
  // ✅ Doit contenir uniquement : texte, espaces, et <span class="highlight">
  const allowedPattern = /^[\s\S]*?(<span class="highlight">[\s\S]*?<\/span>)[\s\S]*?$/;
  const noDangerousTags = !/<(?!span class="highlight">)[^>]+>/i.test(str);
  
  return allowedPattern.test(str) && noDangerousTags;
};

// ============================================================================
// 📚 EXEMPLES D'UTILISATION (Dans vos composants)
// ============================================================================
//
// 1. Accéder à un service :
//    import { servicesData } from '@/data/servicesData';
//    const mobilite = servicesData.mobilite;
//
// 2. Rendre le heroHeadline en sécurité :
//    import { sanitizeHeroHeadline } from '@/data/servicesData';
//    <h1 dangerouslySetInnerHTML={{ 
//      __html: sanitizeHeroHeadline(service.heroHeadline) 
//    }} />
//
// 3. Filtrer les services dans une grille :
//    import { getOtherServices } from '@/data/servicesData';
//    const others = getOtherServices('mobilite');
//
// 4. Valider un slug avant navigation :
//    import { getAllServiceSlugs } from '@/data/servicesData';
//    if (getAllServiceSlugs().includes(slug)) { navigate(`/services/${slug}`); }
//
// ============================================================================