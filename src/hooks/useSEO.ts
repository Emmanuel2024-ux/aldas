 // src/hooks/useSEO.ts
import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'service';
  schema?: Record<string, any>;
  noIndex?: boolean; // Pour pages en développement
}

export const useSEO = ({ 
  title, 
  description, 
  keywords = '', 
  canonical,
  ogImage = 'https://www.aldas-ci.com/ogs/og-default.jpg',
  ogType = 'website',
  schema,
  noIndex = false
}: SEOProps) => {
  useEffect(() => {
    try {
      const BASE_URL = 'https://www.aldas-ci.com';
      
      // 1. Titre de la page
      document.title = `${title} | ÁLDÁS CI`;
      
      // 2. Meta description
      const setMeta = (name: string, content: string, property = 'name') => {
        let meta = document.querySelector(`meta[${property}="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta') as HTMLMetaElement;
          meta.setAttribute(property, name);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };
      
      setMeta('description', description);
      if (keywords) setMeta('keywords', keywords);
      if (noIndex) setMeta('robots', 'noindex, nofollow');
      
      // 3. Canonical URL
      if (canonical) {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link') as HTMLLinkElement;
          link.rel = 'canonical';
          document.head.appendChild(link);
        }
        link.href = `${BASE_URL}${canonical}`;
      }
      
      // 4. Open Graph (Facebook, LinkedIn, WhatsApp)
      const setOG = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta') as HTMLMetaElement;
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };
      
      setOG('og:type', ogType);
      setOG('og:site_name', 'ÁLDÁS CI');
      setOG('og:locale', 'fr_CI');
      setOG('og:title', title);
      setOG('og:description', description);
      setOG('og:url', `${BASE_URL}${canonical || window.location.pathname}`);
      setOG('og:image', ogImage);
      setOG('og:image:width', '1200');
      setOG('og:image:height', '630');
      
      // 5. Twitter Card
      setMeta('twitter:card', 'summary_large_image', 'name');
      setMeta('twitter:title', title, 'name');
      setMeta('twitter:description', description, 'name');
      setMeta('twitter:image', ogImage, 'name');
      setMeta('twitter:site', '@aldas_ci', 'name'); // À configurer si compte Twitter
      
      // 6. Schema.org JSON-LD
      if (schema) {
        let script = document.getElementById('schema-ldjson') as HTMLScriptElement;
        if (!script) {
          script = document.createElement('script') as HTMLScriptElement;
          script.type = 'application/ld+json';
          script.id = 'schema-ldjson';
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
      }
      
      // 7. Langue et région
      document.documentElement.lang = 'fr-CI';
      
      // Cleanup optionnel : réinitialiser au démontage
      return () => {
        // Optionnel : restaurer les valeurs par défaut si nécessaire
      };
      
    } catch (error) {
      // ⚠️ Ne jamais bloquer le rendu de la page pour une erreur SEO
      console.warn('⚠️ useSEO warning (non bloquant):', error);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, schema, noIndex]);
};