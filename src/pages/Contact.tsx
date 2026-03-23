// src/pages/Contact.tsx
import { Phone, MessageCircle, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import PageHero from '../components/UI/PageHero';
import ContactFormSplit from '../components/Contact/ContactFormSplit';
import ContactMapCTA from '../components/Contact/ContactMapCTA';

const Contact = () => {
  const contactMethods = [
    { 
      icon: Phone, 
      title: 'Téléphone', 
      value: '+225 07 49 22 98 74', 
      sub: 'Service Client 24/7',
      href: 'tel:+2250749229874', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'group-hover:border-emerald-200',
      glow: 'group-hover:shadow-emerald-500/20',
      delay: 100 
    },
    { 
      icon: MessageCircle, 
      title: 'WhatsApp', 
      value: '+225 07 47 26 56 93', 
      sub: 'Réponse immédiate',
      href: 'https://wa.me/2250747265693', 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      border: 'group-hover:border-green-200',
      glow: 'group-hover:shadow-green-500/20',
      delay: 200 
    },
    { 
      icon: Mail, 
      title: 'Email', 
      value: 'contact@aldas-ci.com', 
      sub: 'Sous 2 heures',
      href: 'mailto:contact@aldas-ci.com', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'group-hover:border-blue-200',
      glow: 'group-hover:shadow-blue-500/20',
      delay: 300 
    },
    { 
      icon: MapPin, 
      title: 'Adresse', 
      value: 'Riviera Ciad, Rue E22', 
      sub: 'Abidjan, Côte d\'Ivoire',
      href: 'https://maps.app.goo.gl/dTu86XWuUoiZYYLh7', 
      color: 'text-rose-600', 
      bg: 'bg-rose-50', 
      border: 'group-hover:border-rose-200',
      glow: 'group-hover:shadow-rose-500/20',
      delay: 400 
    }
  ];

  return (
    <div className="bg-white font-sans antialiased selection:bg-aldas selection:text-white overflow-x-hidden">
      
      {/* --- 1. HERO CINÉMATOGRAPHIQUE --- */}
      <div className="relative h-[100vh] min-h-[700px] w-full overflow-hidden">
        <PageHero 
          image="https://mycapital229.net/wp-content/uploads/2022/08/nous-contacter.jpg"
          title="Contactez Áldás"
          subtitle="Une expertise premium à votre écoute. Mobilité, Événementiel, Conciergerie."
          btnText="Nous écrire"
          btnLink="#contact-form-section"
        />
        
        {/* Élément décoratif de transition (Vague subtile) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </div>

      {/* --- 2. CARTES FLOTTANTES "CRYSTAL" --- */}
      <section className="py-24 bg-gray-50 relative -mt-12 md:-mt-20 z-30 pb-32">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Petit titre introductif discret */}
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-widest text-gray-500 uppercase shadow-sm">
              <Sparkles size={14} className="text-aldas" />
              Disponibles 24/7
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Nos canaux directs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => (
              <a 
                key={idx} 
                href={method.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative bg-white/80 backdrop-blur-xl p-8 rounded-none shadow-lg hover:shadow-2xl ${method.glow} transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${method.border} flex flex-col items-center text-center overflow-hidden`}
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay={method.delay}
              >
                {/* Effet de lueur interne sophistiqué */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-${method.color.split('-')[1]}-50/40 to-transparent pointer-events-none`}></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  {/* Conteneur Icône avec anneau subtil */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 ${method.bg} ${method.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner border border-white/50`}>
                      <method.icon size={32} strokeWidth={1.5} />
                    </div>
                    {/* Anneau animé autour de l'icône */}
                    <div className="absolute inset-0 rounded-full border border-current opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700 animate-ping"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{method.title}</h3>
                  <p className="text-xs font-bold text-aldas uppercase tracking-widest mb-3">{method.sub}</p>
                  <p className="text-gray-600 font-medium text-lg">{method.value}</p>
                  
                  {/* Flèche apparaissant au survol */}
                  <ArrowRight size={20} className="mt-4 text-gray-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-aldas transition-all duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. FORMULAIRE SPLIT (Le cœur de la page) --- */}
      <div className="relative z-40 -mt-20">
        <ContactFormSplit />
      </div>

      {/* --- 4. MAP IMMERSIVE & CTA FINAL --- */}
      <div className="relative z-50">
        <ContactMapCTA 
          showCTA={true}
          ctaText="Commencer l'expérience"
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63561.5979902716!2d-4.0216612815857085!3d5.32493555824972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed003087fa37%3A0x5a8dae7e21d7003a!2sMaison%20Ciad!5e0!3m2!1sfr!2sci!4v1749592464538!5m2!1sfr!2sci"
        />
      </div>

    </div>
  );
};

export default Contact;