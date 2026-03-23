
import { useState } from 'react';
import { Clock, MapPin, CheckCircle, User, Mail, Phone, Briefcase, MessageSquare, Send } from 'lucide-react';
import contactFixe from '../../assets/images/contact-fixe.jpeg';

interface ContactFormSplitProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onFormSubmit?: (data: any) => void; 
}

const ContactFormSplit = ({
  title = "Une demande spéciale ?",
  subtitle = "Parlez-nous de votre projet",
  backgroundImage = contactFixe,
  onFormSubmit
}: ContactFormSplitProps) => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', service: '', subject: '', message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (onFormSubmit) onFormSubmit(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1500);
  };

  return (
    <section id="contact-form-section" className="relative w-full min-h-[800px] flex items-center bg-white overflow-hidden">
      
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
        
        {/* --- GAUCHE (5/12) : CONTENEUR PARALLAXE --- */}
        <div className="col-span-1 lg:col-span-5 relative overflow-hidden bg-gray-900">
          
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Astuce : Sur desktop on utilise fixed, sur mobile on laisse scroll pour éviter les bugs iOS
              backgroundAttachment: 'fixed', 
            }}
          >
             {/* Overlay sombre */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-aldas/90"></div>
          </div>

          {/* LE CONTENU TEXTE (Scrollable par dessus l'image fixe) */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-20 text-white h-full">
            <div className="space-y-8 max-w-xl">
              <div>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-aldas-light uppercase bg-white/10 border border-white/20 rounded-none backdrop-blur-md">
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
                  {title}
                </h2>
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">
                  Remplissez le formulaire ci-contre. Notre équipe d'experts vous répondra sous moins de 2 heures.
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/20">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-aldas/20 text-aldas-light rounded-none backdrop-blur-md border border-aldas/30">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Horaires d'ouverture</h4>
                    <p className="text-gray-300 mt-1">Lundi – Vendredi : 7h00 – 21h50</p>
                    <p className="text-gray-300">Week-end : Sur rendez-vous</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-aldas/20 text-aldas-light rounded-none backdrop-blur-md border border-aldas/30">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Notre Siège</h4>
                    <p className="text-gray-300 mt-1">Cocody – Riviera Ciad, Rue E22</p>
                    <p className="text-gray-300">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- DROITE (7/12) : FORMULAIRE (Fond Blanc Opaque) --- */}
        <div 
          className="col-span-1 lg:col-span-7 bg-white p-8 md:p-12 lg:p-20 flex items-center shadow-2xl z-20"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {isSuccess ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Message envoyé !</h3>
              <p className="text-gray-600 text-lg font-light">Merci de nous avoir contactés.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Envoyez votre message</h3>
                <div className="w-20 h-1 bg-aldas mx-auto mt-4 rounded-none"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400" placeholder="Votre nom" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400" placeholder="votre@email.com" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400" placeholder="+225..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Service</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all appearance-none cursor-pointer text-gray-600">
                      <option value="" disabled>-- Choisissez --</option>
                      <option value="Location">Location de voiture premium</option>
                      <option value="Navette">Service de navette VIP</option>
                      <option value="Événementiel">Organisation d'événements</option>
                      <option value="Conciergerie">Conciergerie haut de gamme</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Sujet</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400" placeholder="Sujet de votre demande" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-aldas focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all resize-none placeholder-gray-400" placeholder="Décrivez votre besoin en détail..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="group w-full py-5 bg-gray-900 hover:bg-aldas text-white font-bold rounded-none shadow-lg hover:shadow-aldas/40 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center gap-3 mt-4 uppercase tracking-widest text-sm">
                {isSubmitting ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-none animate-spin"></span> : (
                  <> <span>Envoyer le message</span> <Send size={20} className="transform group-hover:translate-x-1 transition-transform" /> </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactFormSplit;