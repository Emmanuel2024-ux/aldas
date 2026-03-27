// src/utils/analytics.ts
export const trackEvent = (
  eventName: string, 
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      'send_to': 'G-CDZ0SJ9W77',
      ...eventParams
    });
  }
};

// Événements prédéfinis pour ÁLDÁS
export const analytics = {
  reservation: (service: string) => 
    trackEvent('reservation_started', { service_type: service }),
  
  contact: (method: 'form' | 'whatsapp' | 'phone') => 
    trackEvent('contact_initiated', { method }),
  
  vehicle_view: (vehicleId: string, category: string) => 
    trackEvent('view_item', { item_id: vehicleId, item_category: category }),
  
  brochure_download: () => 
    trackEvent('download', { content_type: 'brochure' })
};