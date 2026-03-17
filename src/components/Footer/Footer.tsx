// src/components/Footer/Footer.tsx
import { footerData } from './FooterData';
import { Phone, MessageCircle, Mail, MapPin, CarFront, Users, Stars, Gem, Facebook, Instagram, Linkedin, ArrowRight, Send } from 'lucide-react';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollToTop from './ScrollToTop';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'car-front': return <CarFront size={18} />;
      case 'people': return <Users size={18} />;
      case 'stars': return <Stars size={18} />;
      case 'gem': return <Gem size={18} />;
      default: return null;
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return <Facebook size={18} />;
      case 'instagram': return <Instagram size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      default: return null;
    }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-black text-white pt-20 pb-10 mt-auto overflow-hidden">
        
        {/* Effets de fond (Inchangés) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-aldas/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
            
            {/* 1. COLONNE MARQUE & NEWSLETTER */}
            <div className="lg:col-span-4 space-y-8" data-aos="fade-up" data-aos-duration="1000">
              <a href="/" className="block w-fit group">
                <img 
                  src={footerData.brand.logo} 
                  alt="Logo ÁLDÁS" 
                  className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  itemProp="logo"
                />
              </a>
              <p className="text-gray-400 text-sm leading-relaxed text-justify pr-2" itemProp="description">
                {footerData.brand.description}
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-aldas/10 hover:border-aldas/30 transition-all duration-300 cursor-default">
                <span className="w-2 h-2 rounded-full bg-aldas animate-pulse"></span>
                <span className="text-xs font-bold text-aldas-light tracking-wide uppercase">Excellence & Discrétion</span>
              </div>

              <div className="pt-4" data-aos="fade-up" data-aos-delay="200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Restez informé</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-aldas focus:bg-white/10 transition-all"
                  />
                  <button className="bg-aldas hover:bg-aldas-light text-white p-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:-translate-y-0.5">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. COLONNE SERVICES */}
            <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                Nos Services
              </h6>
              <ul className="space-y-4">
                {footerData.services.map((service, idx) => (
                  <li key={idx} data-aos="fade-left" data-aos-delay={200 + (idx * 50)}>
                    <a href={service.href} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300">
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300 transform group-hover:rotate-3">
                        {getServiceIcon(service.icon)}
                      </span>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        {service.label}
                      </span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-aldas" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. COLONNE LOCALISATION */}
            <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                Localisation
              </h6>
              <div className="text-gray-400 text-sm mb-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-aldas">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed">
                  {footerData.contacts.address.street}, <br/>
                  <span className="text-white font-medium">{footerData.contacts.address.city}</span>, <br/>
                  {footerData.contacts.address.country}
                </span>
              </div>
              
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl group" data-aos="zoom-in" data-aos-delay="300">
                <div className="absolute inset-0 bg-aldas/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <iframe 
                  src={footerData.contacts.address.mapUrl}
                  width="100%" 
                  height="160" 
                  allowFullScreen 
                  loading="lazy"
                  className="w-full h-full filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                  title="Carte Google Maps - ÁLDÁS Abidjan"
                ></iframe>
              </div>
            </div>

            {/* 4. COLONNE CONTACT & SOCIAL */}
            <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
              <h6 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-aldas rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                Contact
              </h6>
              <div className="space-y-4">
                <a href={`tel:${footerData.contacts.phone}`} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all" data-aos="fade-left" data-aos-delay="400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-medium">{footerData.contacts.phone}</span>
                </a>
                <a href={`https://wa.me/${footerData.contacts.whatsappNumber}`} target="_blank" rel="noopener" className="group flex items-center gap-3 text-gray-400 hover:text-green-400 transition-all" data-aos="fade-left" data-aos-delay="450">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <MessageCircle size={16} />
                  </div>
                  <span className="text-sm font-medium">WhatsApp Direct</span>
                </a>
                <a href={`mailto:${footerData.contacts.email}`} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all" data-aos="fade-left" data-aos-delay="500">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-aldas group-hover:text-white transition-all duration-300">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium break-all">{footerData.contacts.email}</span>
                </a>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-white/5" data-aos="fade-up" data-aos-delay="600">
                {footerData.socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-aldas hover:text-white hover:border-aldas hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COPYRIGHT BAR */}
          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500" data-aos="fade-in" data-aos-delay="800">
            <p className="flex items-center gap-2">
              &copy; {currentYear} <span className="text-white font-semibold">{footerData.brand.name}</span>. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <p className="flex items-center gap-1.5 text-gray-400">
                Fait avec <span className="text-red-500 animate-pulse">❤️</span> par <span className="text-aldas font-bold">{footerData.brand.developedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat number={footerData.contacts.whatsappNumber} />
      <ScrollToTop />
    </>
  );
};

export default Footer;