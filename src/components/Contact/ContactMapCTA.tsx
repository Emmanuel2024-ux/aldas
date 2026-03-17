// src/components/Contact/ContactMapCTA.tsx
import { ArrowRight } from 'lucide-react';

interface ContactMapCTAProps {
  mapUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  showCTA?: boolean;
}

const ContactMapCTA = ({
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63561.5979902716!2d-4.0216612815857085!3d5.32493555824972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed003087fa37%3A0x5a8dae7e21d7003a!2sMaison%20Ciad!5e0!3m2!1sfr!2sci!4v1749592464538!5m2!1sfr!2sci",
  ctaText = "Commencer l'expérience",
  ctaLink = "#contact-form-section",
  showCTA = true
}: ContactMapCTAProps) => {
  return (
    <>
      {/* MAP CLAIRE */}
      {/* Ajout de z-0 pour s'assurer qu'elle est en dessous du header (qui doit être z-50+) */}
      <section className="w-full h-[500px] relative z-0 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src={mapUrl} 
          width="100%" 
          height="100%" 
          style={{border:0, position: 'relative', zIndex: 0}} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation ÁLDÁS"
          className="w-full h-full block"
        ></iframe>
      </section>

      {/* CTA FINAL */}
      {showCTA && (
        <section className="py-24 bg-white relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aldas/5 via-white to-white pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-20 text-center">
            <div className="max-w-4xl mx-auto" data-aos="zoom-in-up" data-aos-duration="1000">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Vivez une expérience unique avec <span className="text-aldas">ÁLDÁS</span>
              </h2>
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Découvrez nos solutions innovantes et testez-les par vous-même.
              </p>
              <a href={ctaLink}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-aldas transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-aldas/30 relative z-30">
                {ctaText}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactMapCTA;