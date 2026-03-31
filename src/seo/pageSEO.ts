// src/seo/pageSEO.ts
// ============================================================================
// 🎯 CONFIGURATION SEO PAR PAGE - ÁLDÁS CI
// ============================================================================
// Version simple et fonctionnelle - sans erreurs TypeScript

import type { SEOProps } from '../hooks/useSEO';

// ============================================================================
// 🌍 CONFIGURATION GLOBALE
// ============================================================================

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://www.aldas-ci.com';
export const DEFAULT_LANG = 'fr-CI';
export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

// ============================================================================
// 🎯 TYPES
// ============================================================================

export type AppRoute =
  | '/'
  | '/about'
  | '/contact'
  | '/services/mobilite'
  | '/services/navette'
  | '/services/conciergerie'
  | '/services/evenements'
  | '/services/catalogue'
  | '/404';

// Type flexible pour Schema.org - évite les conflits de types
export type SchemaOrgData = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

// ============================================================================
// 🔧 HELPERS SIMPLES
// ============================================================================

export const buildAbsoluteUrl = (path: string): string => {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const buildOGImageUrl = (page: string): string => {
  return `${BASE_URL}/ogs/og-${page}.jpg`;
};

export const buildAbidjanGeo = () => ({
  '@type': 'GeoCoordinates',
  latitude: '5.359951',
  longitude: '-4.008256',
});

export const buildOpeningHours = (days: string[], open: string, close: string) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: days,
  opens: open,
  closes: close,
});

// Merge simple de schemas Schema.org
export const mergeSchema = (base: Record<string, unknown>, extensions: Record<string, unknown>): SchemaOrgData => ({
  '@context': 'https://schema.org',
  '@type': String(extensions['@type'] ?? base['@type']),
  ...base,
  ...extensions,
});

// Validation SEO en dev uniquement
export const validateSEOData = (route: string, data: SEOProps): void => {
  if (!import.meta.env.DEV) return;

  const warnings: string[] = [];
  if (!data.title || data.title.length < 10 || data.title.length > 60) {
    warnings.push(`Title invalide pour ${route}`);
  }
  if (!data.description || data.description.length < 50 || data.description.length > 160) {
    warnings.push(`Description invalide pour ${route}`);
  }
  if (data.ogImage && !data.ogImage.startsWith('http')) {
    warnings.push(`ogImage doit être une URL absolue pour ${route}`);
  }
  if (warnings.length > 0) {
    console.warn(`⚠️ SEO ${route}:`, warnings);
  }
};

// ============================================================================
// 📦 SCHÉMAS DE BASE
// ============================================================================

export const baseOrganizationSchema: SchemaOrgData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#organization`,
  name: 'ÁLDÁS CI',
  alternateName: ['ÁLDÁS', 'Aldas Location'],
  image: `${BASE_URL}/logo.jpg`,
  logo: `${BASE_URL}/logo.jpg`,
  url: BASE_URL,
  telephone: '+2250747265693',
  email: 'contact@aldas-ci.com',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Riviera Ciad, Rue E22',
    addressLocality: 'Abidjan',
    addressRegion: 'Lagunes',
    postalCode: '01 BP 1234',
    addressCountry: 'CI',
  },
  geo: buildAbidjanGeo(),
  openingHoursSpecification: buildOpeningHours(
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    '07:00',
    '22:00'
  ),
  availableLanguage: ['fr', 'en'],
  sameAs: [
    'https://www.facebook.com/aldas-ci',
    'https://www.instagram.com/aldas-ci',
    'https://wa.me/2250747265693',
  ],
};

export const baseServiceSchema: SchemaOrgData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#organization`,
    name: 'ÁLDÁS CI',
  },
  areaServed: { '@type': 'City', name: 'Abidjan, Côte d\'Ivoire' },
  availableLanguage: ['fr', 'en'],
};

// ============================================================================
// 🗂️ REGISTRE SEO PAR PAGE
// ============================================================================

export const pageSEO: Record<AppRoute, SEOProps> = {
  '/': {
    title: 'ÁLDÁS CI - Location, Navettes, Conciergerie & Événementiel à Abidjan',
    description: 'Services premium en Côte d\'Ivoire : location de voitures, navettes aéroport, conciergerie haut de gamme et organisation d\'événements. Réservez en ligne 24/7.',
    keywords: 'aldas ci, location voiture abidjan, navette aéroport, conciergerie luxe, événementiel côte d\'ivoire',
    canonical: '/',
    ogImage: buildOGImageUrl('home'),
    ogType: 'website',
    schema: mergeSchema(baseOrganizationSchema, {
      description: 'Services premium de mobilité, conciergerie et événementiel en Côte d\'Ivoire',
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Location de voitures premium' }},
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Navettes et transferts VIP' }},
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conciergerie haut de gamme' }},
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Organisation événementielle' }},
      ],
    }),
  },

  '/services/mobilite': {
    title: 'Location de Voitures Premium à Abidjan | ÁLDÁS CI',
    description: 'Louez un véhicule récent et fiable à Abidjan : économiques, premium, SUV, luxe. Chauffeurs professionnels, assurance incluse, réservation en ligne 24/7.',
    keywords: 'location voiture abidjan, louer véhicule ci, voiture avec chauffeur abidjan, suv location côte d\'ivoire',
    canonical: '/services/mobilite',
    ogImage: buildOGImageUrl('mobilite'),
    ogType: 'service',
    schema: mergeSchema(baseServiceSchema, {
      '@type': 'CarRental',
      '@id': `${BASE_URL}/services/mobilite#carrental`,
      name: 'ÁLDÁS - Location de Voitures',
      description: 'Location de véhicules premium à Abidjan, Côte d\'Ivoire',
      image: buildOGImageUrl('mobilite'),
      url: buildAbsoluteUrl('/services/mobilite'),
      telephone: '+2250747265693',
      priceRange: '60000-800000 XOF',
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Car',
          name: 'Véhicules de location premium',
          vehicleConfiguration: 'Économique, Premium, SUV, Luxe',
          fuelType: ['Essence', 'Hybride', 'Diesel'],
          transmissionType: ['Automatique', 'Manuelle'],
        },
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Assurance tous risques', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Assistance 24h/24', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Kilométrage illimité', value: true },
      ],
    }),
  },

  '/services/navette': {
    title: 'Service de Navette & Transfert Aéroport Abidjan | ÁLDÁS CI',
    description: 'Transferts aéroport, hôtel et événements en Côte d\'Ivoire. Chauffeurs formés, véhicules confortables, ponctualité garantie.',
    keywords: 'navette aéroport abidjan, transfert hôtel, transport privé ci, chauffeur privé abidjan',
    canonical: '/services/navette',
    ogImage: buildOGImageUrl('navette'),
    ogType: 'service',
    schema: mergeSchema(baseServiceSchema, {
      '@type': 'TaxiService',
      '@id': `${BASE_URL}/services/navette#taxiservice`,
      name: 'ÁLDÁS - Service de Navette',
      description: 'Transferts professionnels et navettes privées en Côte d\'Ivoire',
      image: buildOGImageUrl('navette'),
      url: buildAbsoluteUrl('/services/navette'),
      serviceType: 'Passenger Transport',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Suivi en temps réel', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Annulation gratuite 24h avant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Véhicules climatisés', value: true },
      ],
    }),
  },

  '/services/conciergerie': {
    title: 'Conciergerie Haut de Gamme à Abidjan | ÁLDÁS CI',
    description: 'Services de conciergerie d\'exception pour particuliers et entreprises : gestion de propriétés, assistance VIP, organisation sur-mesure.',
    keywords: 'conciergerie luxe abidjan, assistance personnelle ci, services premium abidjan',
    canonical: '/services/conciergerie',
    ogImage: buildOGImageUrl('conciergerie'),
    ogType: 'service',
    schema: mergeSchema(baseServiceSchema, {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/services/conciergerie#professionalservice`,
      name: 'ÁLDÁS - Conciergerie Premium',
      description: 'Conciergerie haut de gamme et services sur-mesure',
      image: buildOGImageUrl('conciergerie'),
      url: buildAbsoluteUrl('/services/conciergerie'),
      priceRange: '$$$',
    }),
  },

  '/services/evenements': {
    title: 'Agence Événementielle à Abidjan | Organisation Mariage & Séminaire | ÁLDÁS CI',
    description: 'Organisation complète d\'événements professionnels et privés : mariages, séminaires, lancements. Logistique et scénographie sur mesure.',
    keywords: 'organisation événement abidjan, agence événementielle ci, mariage professionnel abidjan',
    canonical: '/services/evenements',
    ogImage: buildOGImageUrl('evenements'),
    ogType: 'service',
    schema: mergeSchema(baseServiceSchema, {
      '@type': 'EventVenue',
      '@id': `${BASE_URL}/services/evenements#eventvenue`,
      name: 'ÁLDÁS - Événementiel',
      description: 'Organisation d\'événements premium en Côte d\'Ivoire',
      image: buildOGImageUrl('evenements'),
      url: buildAbsoluteUrl('/services/evenements'),
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Scénographie sur mesure', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Logistique complète', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Accueil VIP', value: true },
      ],
    }),
  },

  '/services/catalogue': {
    title: 'Catalogue Véhicules - Flotte Premium ÁLDÁS CI',
    description: 'Découvrez notre flotte complète de véhicules de location : berlines, SUV, vans, luxe. Filtrez par prix, catégorie, équipements.',
    keywords: 'catalogue voiture abidjan, flotte véhicules aldas, louer suv abidjan',
    canonical: '/services/catalogue',
    ogImage: buildOGImageUrl('catalogue'),
    ogType: 'product',
    noIndex: true,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Catalogue de Véhicules - ÁLDÁS CI',
      url: buildAbsoluteUrl('/services/catalogue'),
    },
  },

  '/about': {
    title: 'À Propos d\'ÁLDÁS CI - Notre Histoire, Valeurs & Équipe',
    description: 'Découvrez ÁLDÁS CI : une entreprise ivoirienne dédiée à l\'excellence dans les services de mobilité, conciergerie et événementiel.',
    keywords: 'aldas ci qui sommes-nous, entreprise services abidjan, histoire aldas',
    canonical: '/about',
    ogImage: buildOGImageUrl('about'),
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'À Propos d\'ÁLDÁS CI',
      description: 'Notre histoire, nos valeurs et notre équipe',
      url: buildAbsoluteUrl('/about'),
      mainEntity: baseOrganizationSchema,
    },
  },

  '/contact': {
    title: 'Contact - ÁLDÁS CI | Devis Gratuit & Réservation en Ligne',
    description: 'Contactez ÁLDÁS CI pour un devis gratuit ou une réservation : téléphone, WhatsApp, formulaire en ligne. Réponse sous 2h.',
    keywords: 'contacter aldas ci, devis location voiture abidjan, réservation navette ci',
    canonical: '/contact',
    ogImage: buildOGImageUrl('contact'),
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact - ÁLDÁS CI',
      description: 'Contactez-nous pour un devis gratuit',
      url: buildAbsoluteUrl('/contact'),
      mainEntity: baseOrganizationSchema,
    },
  },

  '/404': {
    title: 'Page Non Trouvée - ÁLDÁS CI',
    description: 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil ou contactez-nous.',
    keywords: 'page non trouvée, erreur 404, aldas ci',
    canonical: '/404',
    ogImage: buildOGImageUrl('home'),
    ogType: 'website',
    noIndex: true,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Non Trouvée',
      url: buildAbsoluteUrl('/404'),
    },
  },
};

// ============================================================================
// 🎁 UTILITAIRES EXPORTÉS
// ============================================================================

export const getSEOForRoute = (route: string): SEOProps => {
  const cleanRoute = route.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (cleanRoute in pageSEO) {
    const data = pageSEO[cleanRoute as AppRoute];
    validateSEOData(cleanRoute, data);
    return data;
  }
  console.warn(`⚠️ Route non configurée: ${cleanRoute}. Fallback vers '/'`);
  return pageSEO['/'];
};

export const buildHreflangTags = (path: string) => {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang: lang === 'fr' ? 'fr-CI' : 'en-CI',
    url: lang === 'fr' ? buildAbsoluteUrl(path) : buildAbsoluteUrl(`/${lang}${path}`),
  }));
};

export const buildVehicleProductSchema = (vehicle: {
  code: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  seats: number;
  transmission: 'A' | 'M';
}): SchemaOrgData => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${vehicle.brand} ${vehicle.name}`,
  image: vehicle.image.startsWith('http') ? vehicle.image : `${BASE_URL}${vehicle.image}`,
  offers: {
    '@type': 'Offer',
    price: vehicle.price,
    priceCurrency: 'XOF',
    availability: 'https://schema.org/InStock',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Passagers', value: vehicle.seats },
    { '@type': 'PropertyValue', name: 'Transmission', value: vehicle.transmission === 'A' ? 'Automatique' : 'Manuelle' },
  ],
});

// Validation au chargement en dev
if (import.meta.env.DEV) {
  Object.entries(pageSEO).forEach(([route, data]) => validateSEOData(route, data));
}