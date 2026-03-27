// src/components/Footer/Footer.tsx
import { useMemo } from 'react';
import { footerData } from './FooterData';
import { Phone, MessageCircle, Mail, MapPin, CarFront, Users, Stars, Gem, Facebook, Instagram, Linkedin, ArrowRight, Send } from 'lucide-react';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollToTop from './ScrollToTop';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

// --- TYPES ---
interface FooterService {
  label: string;
  href: string;
  icon: string;
}



interface FooterSocial {
  name: string;
  href: string;
  icon: string;
}

// --- HELPERS ---
const getServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ size?: number }>> = {
    'car-front': CarFront,
    'people': Users,
    'stars': Stars,
    'gem': Gem,
  };
  const Icon = icons[iconName];
  return Icon ? <Icon size={18} aria-hidden="true" /> : null;
};

const getSocialIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ size?: number }>> = {
    'facebook': Facebook,
    'instagram': Instagram,
    'linkedin': Linkedin,
  };
  const Icon = icons[iconName];
  return Icon ? <Icon size={18} aria-hidden="true" /> : null;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Schema.org Organization JSON-LD
  const organizationSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.aldas-ci.com/#organization',
    name: footerData.brand.name,
    alternateName: ['ÁLDÁS', 'Aldas Conciergerie'],
    description: footerData.brand.description,
    url: 'https://www.aldas-ci.com',
    image: `${window.location.origin}${footerData.brand.logo}`,
    telephone: footerData.contacts.phone,
    email: footerData.contacts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: footerData.contacts.address.street,
      addressLocality: footerData.contacts.address.city,
      addressCountry: 'CI',
      addressRegion: 'Abidjan'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '5.3600',
      longitude: '-4.0083'
    },
    openingHours: 'Mo-Su 08:00-20:00',
    priceRange: '$$$',
    sameAs: footerData.socials.map(s => s.href),
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Services premium ÁLDÁS',
        serviceType: ['Location de voitures', 'Navettes', 'Conciergerie', 'Événementiel'],
        areaServed: 'Abidjan, Côte d\'Ivoire'
      }
    }
  }), []);

  // ✅ Gestionnaire de soumission newsletter
  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('📧 Newsletter subscription:', email);
      setEmail('');
      // Ici : appeler votre API de newsletter
    }
  }, [email]);

  return (
    <>
      {/* ✅ Schema.org JSON-LD injecté dans le footer (présent sur toutes les pages) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <footer 
        className="relative bg-gradient-to-b from-[#0a0a0a] to-black text-white pt-20 pb-10 mt-auto overflow-hidden"
        role="contentinfo"
        aria-label="Pied de page - Informations, liens et contact ÁLDÁS CI"
      >
        
        {/* Effets de fond - décoratifs */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-aldas/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
            
            {/* 1. COLONNE MARQUE & NEWSLETTER */}
            <div className="lg:col-span-4 space-y-8" itemScope itemType="https://schema.org/Organization">
              <Link 
                to="/" 
                className="block w-fit group focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                aria-label="ÁLDÁS CI - Retour à l'accueil"
              >
                <img 
                  src={footerData.brand.logo} 
                  alt="Logo ÁLDÁS CI - Services premium à Abidjan" 
                  className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  itemProp="logo"
                  width={160}
                  height={48}
                  loading="lazy"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed text-justify pr-2" itemProp="description">
                {footerData.brand.description}
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-aldas/10 hover:border-aldas/30 transition-all duration-300 cursor-default">
                <span className="w-2 h-2 rounded-full bg-aldas animate-pulse" aria-hidden="true" />
                <span className="text-xs font-bold text-aldas-light tracking-wide uppercase">Excellence & Discrétion</span>
              </div>

              {/* Newsletter avec accessibilité */}
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" id="newsletter-label">
                  Restez informé
                </p>
                <form 
                  onSubmit={handleNewsletterSubmit} 
                  className="flex gap-2"
                  aria-labelledby="newsletter-label"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Votre adresse email pour la newsletter
                  </label>
                  <input 
                    id="newsletter-email"
                    type="email" 
                    placeholder="Votre email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-aldas focus:bg-white/10 transition-all focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                    required
                    aria-required="true"
                  />
                  <button 
                    type="submit" 
                    className="bg-aldas hover:bg-aldas-light text-white p-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] ${!prefersReducedMotion ? 'hover:-translate-y-0.5' : ''} focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                    aria-label="S'inscrire à la newsletter ÁLDÁS CI"
                  >
                    <Send size={18} aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>

            {/* 2. COLONNE SERVICES */}
            <div className="lg:col-span-2">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" aria-hidden="true" />
                Nos Services
              </h6>
              <ul className="space-y-4" role="list" aria-label="Liens vers nos services">
                {(footerData.services as FooterService[]).map((service) => (
                  <li key={service.label} role="listitem">
                    <Link 
                      to={service.href} 
                      className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                      aria-label={`Accéder au service ${service.label}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300 transform group-hover:rotate-3" aria-hidden="true">
                        {getServiceIcon(service.icon)}
                      </span>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        {service.label}
                      </span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-aldas" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. COLONNE LOCALISATION avec microdata */}
            <div className="lg:col-span-3" itemScope itemType="https://schema.org/Place">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" aria-hidden="true" />
                Localisation
              </h6>
              <div className="text-gray-400 text-sm mb-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-aldas" aria-hidden="true">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">{footerData.contacts.address.street}</span>, <br/>
                  <span className="text-white font-medium">
                    <span itemProp="addressLocality">{footerData.contacts.address.city}</span>
                  </span>, <br/>
                  <span itemProp="addressCountry">{footerData.contacts.address.country}</span>
                </span>
              </div>
              
              {/* Iframe carte avec accessibilité */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className={`absolute inset-0 bg-aldas/10 mix-blend-overlay opacity-0 group-hover:opacity-100 ${!prefersReducedMotion ? 'transition-opacity duration-500' : ''} z-10`} aria-hidden="true" />
                <iframe 
                  src={footerData.contacts.address.mapUrl}
                  width="100%" 
                  height="160" 
                  allowFullScreen 
                  loading="lazy"
                  className="w-full h-full filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                  title="Carte Google Maps - Localisation de ÁLDÁS CI à Riviera Ciad, Abidjan"
                  aria-label="Carte interactive montrant l'emplacement de ÁLDÁS CI"
                />
              </div>
            </div>

            {/* 4. COLONNE CONTACT & SOCIAL */}
            <div className="lg:col-span-3">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" aria-hidden="true" />
                Contact
              </h6>
              <div className="space-y-4" role="list" aria-label="Coordonnées de contact">
                <a 
                  href={`tel:${footerData.contacts.phone}`} 
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded" 
                  aria-label={`Appeler ÁLDÁS CI au ${footerData.contacts.phone}`}
                  role="listitem"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300" aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-medium">{footerData.contacts.phone}</span>
                </a>
                <a 
                  href={`https://wa.me/${footerData.contacts.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-green-400 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded" 
                  aria-label="Contacter ÁLDÁS CI sur WhatsApp"
                  role="listitem"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-300" aria-hidden="true">
                    <MessageCircle size={16} />
                  </div>
                  <span className="text-sm font-medium">WhatsApp Direct</span>
                </a>
                <a 
                  href={`mailto:${footerData.contacts.email}`} 
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded" 
                  aria-label={`Envoyer un email à ÁLDÁS CI : ${footerData.contacts.email}`}
                  role="listitem"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300" aria-hidden="true">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium break-all">{footerData.contacts.email}</span>
                </a>
              </div>

              {/* Réseaux sociaux */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-white/5" role="navigation" aria-label="Réseaux sociaux d'ÁLDÁS CI">
                {(footerData.socials as FooterSocial[]).map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-aldas hover:text-white hover:border-aldas hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(6,182,212,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                    aria-label={social.name}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COPYRIGHT BAR avec microdata */}
          <div 
            className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
            itemProp="copyrightNotice"
          >
            <p className="flex items-center gap-2">
              &copy; <time itemProp="copyrightYear" dateTime={currentYear.toString()}>{currentYear}</time>{' '}
              <span className="text-white font-semibold" itemProp="copyrightHolder">{footerData.brand.name}</span>. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6" role="navigation" aria-label="Liens légaux">
              <Link to="/mentions-legales" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded" itemProp="privacyPolicy">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded" itemProp="privacyPolicy">
                Confidentialité
              </Link>
              <p className="flex items-center gap-1.5 text-gray-400">
                Fait avec <span className="text-red-500 animate-pulse" aria-hidden="true">❤️</span> par <span className="text-aldas font-bold">{footerData.brand.developedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Composants flottants */}
      <WhatsAppFloat number={footerData.contacts.whatsappNumber} />
      <ScrollToTop />

      {/* ✅ Styles CSS pour reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
          .animate-pulse {
            animation: none !important;
          }
          .group-hover\\:scale-105:hover,
          .group-hover\\:rotate-3:hover,
          .group-hover\\:translate-x-1:hover {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;