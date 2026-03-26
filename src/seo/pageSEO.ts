// src/seo/pageSEO.ts
import type { SEOProps } from '../hooks/useSEO';

const BASE_URL = 'https://www.aldas-ci.com';

// Helper pour générer les URLs d'images OG
const ogImage = (page: string) => `${BASE_URL}/ogs/og-${page}.jpg`;

export const pageSEO: Record<string, SEOProps> = {
  // === PAGE D'ACCUEIL ===
  '/': {
    title: 'ÁLDÁS CI - Location, Navettes, Conciergerie & Événementiel à Abidjan',
    description: 'ÁLDÁS propose des services premium en Côte d\'Ivoire : location de voitures, navettes aéroport, conciergerie haut de gamme et organisation d\'événements. Réservez en ligne 24/7.',
    keywords: 'aldas ci, location voiture abidjan, navette aéroport, conciergerie luxe, événementiel côte d\'ivoire, transport privé abidjan',
    canonical: '/',
    ogImage: ogImage('home'),
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#organization`,
      name: 'ÁLDÁS CI',
      alternateName: ['ÁLDÁS', 'Aldas Location'],
      image: `${BASE_URL}/logo.jpg`,
      logo: `${BASE_URL}/logo.jpg`,
      description: 'Services premium de mobilité, conciergerie et événementiel en Côte d\'Ivoire',
      url: BASE_URL,
      telephone: '+2250787265693', // ⚠️ Remplacer
      email: 'contact@aldas-ci.com', // ⚠️ Remplacer
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Votre adresse complète',
        addressLocality: 'Abidjan',
        addressRegion: 'Lagunes',
        postalCode: '01 BP 1234',
        addressCountry: 'CI'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '5.3600', // ⚠️ Coordonnées réelles
        longitude: '-4.0083'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '21:30'
      },
      sameAs: [
        'https://www.facebook.com/aldas-ci',
        'https://www.instagram.com/aldas-ci',
        'https://wa.me/2250787265693'
      ],
      makesOffer: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Location de voitures' }},
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Navettes et transferts' }},
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conciergerie premium' }},
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Organisation événementielle' }}
      ]
    }
  },

  // === LOCATION DE VOITURES ===
  '/services/mobilite': {
    title: 'Location de Voitures Premium à Abidjan | ÁLDÁS CI',
    description: 'Louez un véhicule récent et fiable à Abidjan : économiques, premium, SUV, luxe. Chauffeurs professionnels, assurance incluse, réservation en ligne 24/7. Devis gratuit.',
    keywords: 'location voiture abidjan, louer véhicule ci, voiture avec chauffeur abidjan, suv location côte d\'ivoire, mercedes location abidjan, bmw location ci',
    canonical: '/services/mobilite',
    ogImage: ogImage('mobilite'),
    ogType: 'service',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CarRental',
      '@id': `${BASE_URL}/services/mobilite#carrental`,
      name: 'ÁLDÁS - Location de Voitures',
      description: 'Location de véhicules premium à Abidjan, Côte d\'Ivoire',
      image: ogImage('mobilite'),
      url: `${BASE_URL}/services/mobilite`,
      telephone: '+2250787265693',
      priceRange: '60000-800000 XOF',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abidjan',
        addressCountry: 'CI'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '5.3600',
        longitude: '-4.0083'
      },
      openingHours: 'Mo-Su 08:00-21:30',
      areaServed: {
        '@type': 'City',
        name: 'Abidjan'
      },
      availableLanguage: ['fr', 'en'],
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Car',
          name: 'Véhicules de location premium',
          vehicleConfiguration: 'Économique, Premium, SUV, Luxe',
          fuelType: ['Essence', 'Hybride', 'Diesel'],
          transmissionType: ['Automatique', 'Manuelle'],
          seatingCapacity: { min: 4, max: 8 }
        }
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', 'name': 'Assurance tous risques', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Assistance 24h/24 et 7j/7', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Kilométrage illimité', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Chauffeur professionnel optionnel', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Livraison aéroport/hôtel', 'value': true }
      ]
    }
  },

  // === NAVETTES & TRANSFERTS ===
  '/services/navette': {
    title: 'Service de Navette & Transfert Aéroport Abidjan | ÁLDÁS CI',
    description: 'Transferts aéroport, hôtel et événements en Côte d\'Ivoire. Chauffeurs formés, véhicules confortables, ponctualité garantie. Réservez votre navette privée en ligne.',
    keywords: 'navette aéroport abidjan, transfert hôtel, transport privé ci, chauffeur privé abidjan, taxi luxe côte d\'ivoire, shuttle abidjan fhb',
    canonical: '/services/navette',
    ogImage: ogImage('navette'),
    ogType: 'service',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      '@id': `${BASE_URL}/services/navette#taxiservice`,
      name: 'ÁLDÁS - Service de Navette',
      description: 'Transferts professionnels et navettes privées en Côte d\'Ivoire',
      image: ogImage('navette'),
      url: `${BASE_URL}/services/navette`,
      telephone: '+2250787265693',
      areaServed: 'Côte d\'Ivoire',
      availableLanguage: ['fr', 'en'],
      serviceType: 'Passenger Transport',
      provider: {
        '@type': 'LocalBusiness',
        'name': 'ÁLDÁS CI'
      },
      offers: {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Transfert Aéroport Félix Houphouët-Boigny',
          'serviceOutput': {
            '@type': 'City',
            'name': 'Abidjan et environs'
          }
        }
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', 'name': 'Suivi en temps réel', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Annulation gratuite 24h avant', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Véhicules climatisés', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Chauffeurs multilingues', 'value': true }
      ]
    }
  },

  // === CONCIERGERIE ===
  '/services/conciergerie': {
    title: 'Conciergerie Haut de Gamme à Abidjan | ÁLDÁS CI',
    description: 'Services de conciergerie d\'exception pour particuliers et entreprises à Abidjan : gestion de propriétés, assistance VIP, organisation sur-mesure, coordination complète.',
    keywords: 'conciergerie luxe abidjan, assistance personnelle ci, services premium abidjan, gestion propriété côte d\'ivoire, concierge privé abidjan',
    canonical: '/services/conciergerie',
    ogImage: ogImage('conciergerie'),
    ogType: 'service',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/services/conciergerie#professionalservice`,
      name: 'ÁLDÁS - Conciergerie Premium',
      description: 'Conciergerie haut de gamme et services sur-mesure en Côte d\'Ivoire',
      image: ogImage('conciergerie'),
      url: `${BASE_URL}/services/conciergerie`,
      telephone: '+2250747265693',
      priceRange: '$$$',
      serviceType: 'Conciergerie',
      areaServed: {
        '@type': 'City',
        'name': 'Abidjan'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        'name': 'Services de Conciergerie',
        'itemListElement': [
          { '@type': 'OfferCatalogItem', 'name': 'Gestion de propriétés' },
          { '@type': 'OfferCatalogItem', 'name': 'Assistance personnelle VIP' },
          { '@type': 'OfferCatalogItem', 'name': 'Réservations exclusives' },
          { '@type': 'OfferCatalogItem', 'name': 'Coordination d\'événements' },
          { '@type': 'OfferCatalogItem', 'name': 'Services 24h/24' }
        ]
      }
    }
  },

  // === ÉVÉNEMENTIEL ===
  '/services/evenements': {
    title: 'Agence Événementielle à Abidjan | Organisation Mariage & Séminaire | ÁLDÁS CI',
    description: 'Organisation complète d\'événements professionnels et privés en Côte d\'Ivoire : mariages, séminaires, lancements. Logistique, scénographie sur mesure, accueil VIP.',
    keywords: 'organisation événement abidjan, agence événementielle ci, mariage professionnel abidjan, séminaire entreprise côte d\'ivoire, gala abidjan, team building ci',
    canonical: '/services/evenements',
    ogImage: ogImage('evenements'),
    ogType: 'service',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EventVenue',
      '@id': `${BASE_URL}/services/evenements#eventvenue`,
      name: 'ÁLDÁS - Événementiel',
      description: 'Organisation d\'événements premium et coordination complète en Côte d\'Ivoire',
      image: ogImage('evenements'),
      url: `${BASE_URL}/services/evenements`,
      telephone: '+2250747265693',
      event: [
        { '@type': 'Event', 'name': 'Mariages & Cérémonies', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
        { '@type': 'Event', 'name': 'Séminaires d\'entreprise', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
        { '@type': 'Event', 'name': 'Lancements de produits', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' },
        { '@type': 'Event', 'name': 'Galas & Soirées VIP', 'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode' }
      ],
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', 'name': 'Scénographie sur mesure', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Logistique complète', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Accueil VIP et protocole', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Coordination jour J', 'value': true }
      ]
    }
  },

  // === À PROPOS ===
  '/about': {
    title: 'À Propos d\'ÁLDÁS CI - Notre Histoire, Valeurs & Équipe',
    description: 'Découvrez ÁLDÁS CI : une entreprise ivoirienne dédiée à l\'excellence dans les services de mobilité, conciergerie et événementiel. Notre engagement : votre satisfaction.',
    keywords: 'aldas ci qui sommes-nous, entreprise services abidjan, histoire aldas, équipe aldas, valeurs aldas, société ivoirienne services',
    canonical: '/about',
    ogImage: ogImage('about'),
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_URL}/about#aboutpage`,
      name: 'À Propos d\'ÁLDÁS CI',
      description: 'Notre histoire, nos valeurs et notre équipe dédiée à l\'excellence',
      url: `${BASE_URL}/about`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'ÁLDÁS CI',
        foundingDate: '2026', // ⚠️ Remplacer
        foundingLocation: {
          '@type': 'City',
          'name': 'Abidjan, Côte d\'Ivoire'
        },
        mission: 'Offrir des services premium qui transforment chaque expérience client en moment d\'exception',
        values: ['Excellence', 'Professionnalisme', 'Disponibilité', 'Innovation', 'Intégrité']
      }
    }
  },

  // === CONTACT ===
  '/contact': {
    title: 'Contact - ÁLDÁS CI | Devis Gratuit & Réservation en Ligne',
    description: 'Contactez ÁLDÁS CI pour un devis gratuit ou une réservation : téléphone, WhatsApp, formulaire en ligne. Réponse sous 24h. Abidjan, Côte d\'Ivoire.',
    keywords: 'contacter aldas ci, devis location voiture abidjan, réservation navette ci, whatsapp aldas, contact conciergerie abidjan, téléphone aldas',
    canonical: '/contact',
    ogImage: ogImage('contact'),
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact#contactpage`,
      name: 'Contact - ÁLDÁS CI',
      description: 'Contactez-nous pour un devis gratuit ou une réservation',
      url: `${BASE_URL}/contact`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'ÁLDÁS CI',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            'telephone': '+2250787265693',
            'contactType': 'customer service',
            'areaServed': 'CI',
            'availableLanguage': ['fr', 'en'],
            'contactOption': 'TollFree'
          },
          {
            '@type': 'ContactPoint',
            'email': 'contact@aldas-ci.com',
            'contactType': 'sales',
            'areaServed': 'CI'
          }
        ],
        sameAs: [
          'https://wa.me/2250747265693',
          'https://www.facebook.com/aldas-ci',
          'https://www.instagram.com/aldas-ci'
        ]
      }
    }
  }
};