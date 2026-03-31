// src/hooks/useSEO.ts
// ============================================================================
// 🎯 HOOK SEO - VERSION PRODUCTION - ÁLDÁS CI
// ============================================================================
// • Cleanup automatique des meta tags créés (pas de fuite mémoire)
// • Injection avec useLayoutEffect pour exécution avant le paint browser
// • Types stricts : zéro `any`, interfaces exportées
// • SSR-safe : vérifications window/document avant exécution
// • Gestion robuste : erreurs silencieuses en prod, logs en dev
// • Tracking des tags créés vs mis à jour pour cleanup précis
// ============================================================================

import { useLayoutEffect } from 'react';

// ============================================================================
// 🎯 TYPES EXPORTÉS (pour réutilisation et documentation)
// ============================================================================

export type OGType = 'website' | 'article' | 'product' | 'service' | 'profile';

export interface SchemaOrgData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface SEOProps {
  /** Titre de la page (sans suffixe) */
  title: string;
  /** Description meta (150-160 caractères recommandés) */
  description: string;
  /** Mots-clés pour les moteurs (optionnel, impact SEO limité) */
  keywords?: string;
  /** Chemin relatif pour l'URL canonique (ex: '/services/navette') */
  canonical?: string;
  /** URL de l'image Open Graph (1200x630 recommandé) */
  ogImage?: string;
  /** Type Open Graph */
  ogType?: OGType;
  /** Données Schema.org JSON-LD (optionnel) */
  schema?: SchemaOrgData;
  /** Empêcher l'indexation (pour pages dev/staging) */
  noIndex?: boolean;
  /** Préfixe du titre (défaut: ' | ÁLDÁS CI') */
  titleSuffix?: string;
}

// ============================================================================
// 🧩 HOOK PRINCIPAL
// ============================================================================

export const useSEO = ({
  title,
  description,
  keywords = '',
  canonical,
  ogImage = 'https://www.aldas-ci.com/ogs/og-default.jpg',
  ogType = 'website',
  schema,
  noIndex = false,
  titleSuffix = ' | ÁLDÁS CI',
}: SEOProps): void => {
  // ✅ useLayoutEffect : injection avant le paint browser (meilleur pour SEO)
  // Guard SSR : ne pas exécuter côté serveur où document n'existe pas
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    try {
      const BASE_URL = 'https://www.aldas-ci.com';
      
      // ✅ Track des éléments CRÉÉS par ce hook (pour cleanup précis)
      const createdElements: Array<HTMLElement | HTMLLinkElement> = [];

      // ======================================================================
      // 🔧 HELPERS INTERNES
      // ======================================================================

      /**
       * Met à jour ou crée un meta tag
       * @param name - Nom de l'attribut (name ou property)
       * @param content - Contenu du meta tag
       * @param attribute - 'name' ou 'property'
       * @param track - Si true, track l'élément pour cleanup
       */
      const setMetaTag = (
        name: string,
        content: string,
        attribute: 'name' | 'property' = 'name',
        track: boolean = true
      ): void => {
        const selector = `meta[${attribute}="${name}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement | null;
        const wasCreated = !element;

        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
          if (track && wasCreated) {
            createdElements.push(element);
          }
        }
        
        // Mise à jour du contenu (évite les writes inutiles)
        if (element.content !== content) {
          element.content = content;
        }
      };

      /**
       * Met à jour ou crée un lien canonical
       */
      const setCanonical = (path: string): void => {
        const selector = 'link[rel="canonical"]';
        let element = document.querySelector(selector) as HTMLLinkElement | null;
        const wasCreated = !element;

        if (!element) {
          element = document.createElement('link');
          element.rel = 'canonical';
          document.head.appendChild(element);
          if (wasCreated) {
            createdElements.push(element);
          }
        }
        
        const fullUrl = `${BASE_URL}${path}`;
        if (element.href !== fullUrl) {
          element.href = fullUrl;
        }
      };

      /**
       * Met à jour ou crée le script Schema.org JSON-LD
       */
      const setSchemaScript = (data: SchemaOrgData): void => {
        const elementId = 'schema-ldjson';
        let element = document.getElementById(elementId) as HTMLScriptElement | null;
        const wasCreated = !element;

        if (!element) {
          element = document.createElement('script');
          element.type = 'application/ld+json';
          element.id = elementId;
          document.head.appendChild(element);
          if (wasCreated) {
            createdElements.push(element);
          }
        }
        
        const jsonString = JSON.stringify(data);
        if (element.textContent !== jsonString) {
          element.textContent = jsonString;
        }
      };

      // ======================================================================
      // 🚀 INJECTION DES META TAGS
      // ======================================================================

      // 1. Titre de la page
      const fullTitle = `${title}${titleSuffix}`;
      if (document.title !== fullTitle) {
        document.title = fullTitle;
      }

      // 2. Meta tags de base
      setMetaTag('description', description);
      
      if (keywords) {
        setMetaTag('keywords', keywords);
      }
      
      if (noIndex) {
        setMetaTag('robots', 'noindex, nofollow');
      } else {
        // S'assurer que robots n'est pas noindex par défaut
        const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        if (robotsMeta && (robotsMeta.content === 'noindex, nofollow' || robotsMeta.content === 'noindex')) {
          robotsMeta.content = 'index, follow';
        }
      }

      // 3. URL canonique
      if (canonical) {
        setCanonical(canonical);
      }

      // 4. Open Graph (Facebook, LinkedIn, WhatsApp)
      setMetaTag('og:type', ogType, 'property');
      setMetaTag('og:site_name', 'ÁLDÁS CI', 'property');
      setMetaTag('og:locale', 'fr_CI', 'property');
      setMetaTag('og:title', title, 'property');
      setMetaTag('og:description', description, 'property');
      setMetaTag('og:url', `${BASE_URL}${canonical || window.location.pathname}`, 'property');
      setMetaTag('og:image', ogImage, 'property');
      setMetaTag('og:image:width', '1200', 'property');
      setMetaTag('og:image:height', '630', 'property');

      // 5. Twitter Card
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', title);
      setMetaTag('twitter:description', description);
      setMetaTag('twitter:image', ogImage);
      setMetaTag('twitter:site', '@aldas_ci');

      // 6. Schema.org JSON-LD (si fourni)
      if (schema && typeof schema === 'object' && Object.keys(schema).length > 0) {
        setSchemaScript(schema);
      }

      // 7. Langue et région du document
      if (document.documentElement.lang !== 'fr-CI') {
        document.documentElement.lang = 'fr-CI';
      }

      // ======================================================================
      // 🧹 CLEANUP AU DÉMONTAGE
      // ======================================================================
      return () => {
        // Supprimer uniquement les éléments CRÉÉS par cette instance du hook
        // Les éléments pré-existants (dans index.html) sont préservés
        createdElements.forEach((element) => {
          if (element.parentNode === document.head) {
            document.head.removeChild(element);
          }
        });
      };

    } catch (error) {
      // ⚠️ Gestion d'erreur : ne jamais bloquer le rendu pour un problème SEO
      if (import.meta.env.DEV) {
        console.warn('⚠️ useSEO error (non bloquant):', error instanceof Error ? error.message : error);
      }
      // En production : échec silencieux pour ne pas impacter l'UX
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    schema,
    noIndex,
    titleSuffix,
  ]);
};

// ============================================================================
// 🎁 UTILITAIRES EXPORTÉS (optionnels mais utiles)
// ============================================================================

/**
 * Génère une URL canonique complète depuis un chemin relatif
 * @param path - Chemin relatif (ex: '/services/navette')
 * @param baseUrl - URL de base (défaut: config du projet)
 */
export const buildCanonicalUrl = (
  path: string,
  baseUrl: string = 'https://www.aldas-ci.com'
): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Tronque une description pour respecter les limites SEO
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale (défaut: 160 pour meta description)
 */
export const truncateForSEO = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Valide le format d'une URL d'image Open Graph
 * @param url - URL à valider
 */
export const isValidOGImage = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname !== '';
  } catch {
    return false;
  }
};