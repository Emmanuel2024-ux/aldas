// src/utils/analytics.ts
// ============================================================================
// 🎯 UTILITAIRE ANALYTICS - TYPESCRIPT STRICT - ÁLDÁS CI
// ============================================================================

// --- TYPES ---
export type TrackingMethod = 'form' | 'whatsapp' | 'phone' | 'email';
export type VehicleCategory = 'economy' | 'premium' | 'suv' | 'luxury' | 'van';
export type ServiceType = 'location' | 'navette' | 'conciergerie' | 'evenementiel';
export type ContactSource = 'header' | 'footer' | 'floating' | 'page';

export interface GA4EventParams {
  [key: string]: string | number | boolean | null | undefined;
}

export interface TrackOptions {
  ignoreConsent?: boolean;
  debug?: boolean;
  sessionId?: string;
  timestamp?: number;
}

export interface AnalyticsConfig {
  measurementId: string;
  debugMode: boolean;
  requireConsent: boolean;
  getConsent?: () => boolean;
}

// --- CONFIGURATION ---
const defaultConfig: AnalyticsConfig = {
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-CDZ0SJ9W77',
  debugMode: import.meta.env.DEV,
  requireConsent: import.meta.env.PROD,
  getConsent: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('aldas-consent-analytics') === 'true';
  },
};

let config: AnalyticsConfig = { ...defaultConfig };

// --- TYPES POUR GTAG ---
type GtagFunction = (
  command: 'event' | 'config' | 'js',
  targetId?: string,
  params?: GA4EventParams
) => void;

interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
  dataLayer?: unknown[];
}

// --- FONCTION PRINCIPALE ---
export const trackEvent = (
  eventName: string,
  params: GA4EventParams = {},
  options: TrackOptions = {}
): void => {
  if (typeof window === 'undefined') {
    if (config.debugMode) {
      console.debug(`[Analytics SSR] Skipped: ${eventName}`, params);
    }
    return;
  }

  if (config.requireConsent && !options.ignoreConsent) {
    const hasConsent = config.getConsent?.() ?? false;
    if (!hasConsent) {
      if (config.debugMode) {
        console.debug(`[Analytics] Skipped (no consent): ${eventName}`);
      }
      return;
    }
  }

  if (config.debugMode || options.debug) {
    console.log(`[Analytics] 📊 ${eventName}`, {
      measurementId: config.measurementId,
      params,
      options,
      timestamp: options.timestamp || Date.now(),
    });
    return;
  }

  try {
    const gtag = (window as WindowWithGtag).gtag;
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        send_to: config.measurementId,
        event_timestamp: options.timestamp || Math.floor(Date.now() / 1000),
        session_id: options.sessionId,
        ...params,
      });
    } else if (config.debugMode) {
      console.warn('[Analytics] gtag not loaded. Did you include the GA4 script?');
    }
  } catch (error) {
    if (config.debugMode) {
      console.error('[Analytics] Error sending event:', error);
    }
  }
};

// --- CONFIGURATION ---
export const configureAnalytics = (newConfig: Partial<AnalyticsConfig>): void => {
  config = { ...config, ...newConfig };
  if (config.debugMode) {
    console.log('[Analytics] Config updated:', config);
  }
};

export const resetAnalyticsConfig = (): void => {
  config = { ...defaultConfig };
  if (config.debugMode) {
    console.log('[Analytics] Config reset to defaults');
  }
};

// --- ÉVÉNEMENTS PRÉDÉFINIS ---
export const analytics = {
  // 🚗 LOCATION
  reservation: (service: ServiceType, vehicleCode?: string, price?: number) => 
    trackEvent('begin_checkout', {
      service_type: service,
      item_id: vehicleCode,
      value: price,
      currency: 'XOF',
    }),
  
  reservationSubmitted: (service: ServiceType, vehicleCode: string) => 
    trackEvent('purchase', {
      service_type: service,
      item_id: vehicleCode,
      transaction_id: `${service}_${vehicleCode}_${Date.now()}`,
    }),
  
  vehicleView: (vehicleCode: string, category: VehicleCategory, price: number) => 
    trackEvent('view_item', {
      item_id: vehicleCode,
      item_category: category,
      price,
      currency: 'XOF',
    }),
  
  vehicleFavorite: (vehicleCode: string, category: VehicleCategory) => 
    trackEvent('add_to_wishlist', {
      item_id: vehicleCode,
      item_category: category,
    }),
  
  catalogFilter: (filters: Record<string, string | number>) => 
    trackEvent('filter_applied', {
      ...filters,
      content_type: 'vehicle_catalog',
    }),
  
  catalogSearch: (query: string, resultsCount: number) => 
    trackEvent('search', {
      search_term: query,
      search_results: resultsCount,
      content_type: 'vehicle_catalog',
    }),
  
  // 🚌 NAVETTES
  shuttleQuote: (pickup: string, dropoff: string, passengers: number) => 
    trackEvent('generate_lead', {
      service_type: 'navette',
      pickup_location: pickup,
      dropoff_location: dropoff,
      passenger_count: passengers,
    }),
  
  shuttleTypeSelected: (type: 'airport' | 'corporate' | 'tourism' | 'ong') => 
    trackEvent('select_item', {
      item_category: 'shuttle_type',
      item_variant: type,
    }),
  
  // 🛎️ CONCIERGERIE
  conciergeServiceView: (serviceCategory: string) => 
    trackEvent('view_item', {
      item_category: 'conciergerie',
      item_variant: serviceCategory,
      content_type: 'service',
    }),
  
  conciergeRequest: (requestType: string, urgency: 'low' | 'medium' | 'high') => 
    trackEvent('contact', {
      service_type: 'conciergerie',
      request_type: requestType,
      urgency_level: urgency,
    }),
  
  // 🎉 ÉVÉNEMENTIEL
  eventQuote: (eventType: string, guestCount: number, budget?: number) => 
    trackEvent('generate_lead', {
      service_type: 'evenementiel',
      event_type: eventType,
      guest_count: guestCount,
      estimated_budget: budget,
      currency: budget ? 'XOF' : undefined,
    }),
  
  realizationView: (realizationId: string, category: string) => 
    trackEvent('view_item', {
      item_id: realizationId,
      item_category: category,
      content_type: 'portfolio',
    }),
  
  // 📞 CONTACT
  contact: (method: TrackingMethod, source: ContactSource = 'page') => 
    trackEvent('contact', {
      contact_method: method,
      contact_source: source,
    }),
  
  whatsappClick: (source: 'floating' | 'page' | 'modal') => 
    trackEvent('click', {
      element_type: 'whatsapp_button',
      element_source: source,
      contact_method: 'whatsapp',
    }),
  
  phoneCall: (source: ContactSource) => 
    trackEvent('click', {
      element_type: 'phone_link',
      element_source: source,
      contact_method: 'phone',
    }),
  
  contactFormSubmitted: (service?: ServiceType) => 
    trackEvent('form_submit', {
      form_name: 'contact_form',
      service_type: service,
      form_success: true,
    }),
  
  // 📄 CONTENU
  brochureDownload: (documentName: string) => 
    trackEvent('file_download', {
      file_name: documentName,
      content_type: 'brochure',
    }),
  
  pageEngagement: (pagePath: string, scrollPercent: number) => 
    trackEvent('scroll', {
      page_path: pagePath,
      scroll_depth: scrollPercent,
    }),
  
  pageView: (pagePath: string, pageTitle: string, duration?: number) => 
    trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      engagement_time: duration,
    }),
  
  externalLink: (url: string, label: string) => 
    trackEvent('click', {
      element_type: 'external_link',
      outbound_url: url,
      link_label: label,
    }),
  
  // 🎯 PERSONNALISÉS
  track: (eventName: string, params: GA4EventParams = {}, options?: TrackOptions) => {
    if (!/^[a-z][a-z0-9_]*$/.test(eventName)) {
      if (config.debugMode) {
        console.warn(`[Analytics] Invalid event name: "${eventName}". Use snake_case.`);
      }
      return;
    }
    trackEvent(eventName, params, options);
  },
  
  batch: (events: Array<{ name: string; params?: GA4EventParams; options?: TrackOptions }>) => {
    events.forEach(({ name, params = {}, options = {} }) => {
      trackEvent(name, params, options);
    });
  },
};

// --- HOOKS REACT ---
export const usePageView = (pagePath: string, pageTitle: string): void => {
  if (typeof window === 'undefined') return;
  
  // ✅ Appel simple de fonction, pas de règle ESLint à désactiver
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const useTrackClick = (
  eventName: string,
  params: GA4EventParams = {}
) => {
  return () => {
    trackEvent(eventName, params);
  };
};

// --- INITIALISATION GA4 ---
export const initGA4 = (customConfig?: Partial<AnalyticsConfig>): void => {
  if (customConfig) {
    configureAnalytics(customConfig);
  }
  
  if (typeof window === 'undefined') return;
  
  const windowWithGtag = window as WindowWithGtag;
  
  if (!windowWithGtag.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    document.head.appendChild(script);
    
    const dataLayer = windowWithGtag.dataLayer = windowWithGtag.dataLayer || [];
    const gtag: GtagFunction = (...args: [string, string?, GA4EventParams?]) => {
      dataLayer.push(args);
    };
    windowWithGtag.gtag = gtag;
    
   {/*gtag('js', new Date());*/}
    gtag('config', config.measurementId, {
      send_page_view: false,
      debug_mode: config.debugMode,
    });
    
    if (config.debugMode) {
      console.log(`[Analytics] GA4 initialized: ${config.measurementId}`);
    }
  }
};