// src/components/Contact/ContactFormSplit.tsx
import { useState, useMemo, useCallback} from 'react';
import { motion, type Variants, useAnimation } from 'framer-motion';
import { 
  Clock, MapPin, CheckCircle, User, Mail, Phone, Briefcase, 
  MessageSquare, Send, AlertCircle, Loader2 
} from 'lucide-react';

import contactFixe from '../../assets/images/contact-fixe.jpeg'; // ✅ WebP pour performance

// --- TYPES ---
export interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormSplitProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onFormSubmit?: (data: FormData) => Promise<void> | void;
  /** ID unique pour l'ancrage et l'accessibilité */
  formId?: string;
  /** Label ARIA pour le formulaire */
  ariaLabel?: string;
}

// --- VARIANTES D'ANIMATION FRAMER MOTION ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const ContactFormSplit = ({
  title = "Une demande spéciale ?",
  subtitle = "Parlez-nous de votre projet",
  backgroundImage = contactFixe,
  onFormSubmit,
  formId = "contact-form-main",
  ariaLabel = "Formulaire de contact pour demander un devis ou une réservation chez ÁLDÁS CI"
}: ContactFormSplitProps) => {
  
  // ✅ États du formulaire
  const [formData, setFormData] = useState<FormData>({ 
    name: '', email: '', phone: '', service: '', subject: '', message: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false, email: false, phone: false, service: false, subject: false, message: false
  });

  
  // ✅ Détection prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Validation des champs (fonctions pures pour testabilité)
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        return undefined;
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Format d\'email invalide';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Le téléphone est requis';
        if (!/^\+?[\d\s\-()]{8,}$/.test(value)) return 'Format de téléphone invalide';
        return undefined;
      case 'service':
        if (!value) return 'Veuillez sélectionner un service';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Le sujet est requis';
        if (value.trim().length < 5) return 'Le sujet doit contenir au moins 5 caractères';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  // ✅ Validation complète du formulaire
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // ✅ Gestionnaire de changement de champ
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel si le champ a été touché
    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // ✅ Gestionnaire de blur (marquer comme touché)
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Valider le champ au blur
    const error = validateField(name as keyof FormData, (e.target as HTMLInputElement).value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // ✅ Soumission du formulaire
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés pour afficher les erreurs
    setTouched({
      name: true, email: true, phone: true, service: true, subject: true, message: true
    });
    
    // Validation complète
    if (!validateForm()) {
      // Scroll vers le premier champ en erreur pour accessibilité
      const firstErrorField = Object.keys(errors)[0] as keyof FormData;
      if (firstErrorField) {
        const element = document.getElementById(`${formId}-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Appel à la fonction de soumission fournie en prop
      if (onFormSubmit) {
        await Promise.resolve(onFormSubmit(formData));
      } else {
        // Fallback : simulation d'envoi (à remplacer par un vrai appel API)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('📤 Formulaire soumis (simulation):', formData);
      }
      
      // Succès
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' });
      setTouched({ name: false, email: false, phone: false, service: false, subject: false, message: false });
      
      // Reset du statut après 6 secondes
      setTimeout(() => setSubmitStatus('idle'), 6000);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus('error');
      
      // Reset du statut d'erreur après 6 secondes
      setTimeout(() => setSubmitStatus('idle'), 6000);
      
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onFormSubmit, validateForm, errors, formId, prefersReducedMotion]);

  // ✅ Schema.org JSON-LD pour le formulaire de contact
  const contactSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `https://www.aldas-ci.com/contact#${formId}`,
    name: 'Formulaire de contact ÁLDÁS CI',
    description: 'Formulaire pour demander un devis ou une réservation pour nos services premium',
    potentialAction: {
      '@type': 'CommunicateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.aldas-ci.com/contact',
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform']
      }
    }
  }), [formId]);

  // ✅ Liste des services pour le select (mémoïsée)
  const serviceOptions = useMemo(() => [
    { value: '', label: '-- Choisissez --', disabled: true },
    { value: 'Location', label: 'Location de voiture premium' },
    { value: 'Navette', label: 'Service de navette VIP' },
    { value: 'Événementiel', label: 'Organisation d\'événements' },
    { value: 'Conciergerie', label: 'Conciergerie haut de gamme' }
  ], []);

  return (
    // ✅ Section sémantique avec ARIA et Schema.org
    <motion.section 
      id="contact-form-wrapper"
      className="relative w-full min-h-[800px] flex items-center bg-white overflow-hidden"
      role="region"
      aria-label="Section de contact - Formulaire et informations"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
        
        {/* --- GAUCHE (5/12) : CONTENEUR PARALLAXE --- */}
        <motion.div 
          className="col-span-1 lg:col-span-5 relative overflow-hidden bg-gray-900"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Image de fond avec fallback */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
            role="img"
            aria-label="Image décorative : équipe ÁLDÁS prête à vous assister"
          >
            {/* Overlay sombre pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-aldas/90" aria-hidden="true" />
          </div>

          {/* Contenu texte */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-20 text-white h-full">
            <motion.div 
              className="space-y-8 max-w-xl"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-aldas-light uppercase bg-white/10 border border-white/20 rounded-none backdrop-blur-md">
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
                  {title}
                </h2>
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">
                  Remplissez le formulaire ci-contre. Notre équipe d'experts vous répondra sous moins de 2 heures.
                </p>
              </motion.div>

              <motion.div 
                className="space-y-6 pt-8 border-t border-white/20"
                variants={fadeInUp}
              >
                {/* Horaires */}
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-aldas/20 text-aldas-light rounded-none backdrop-blur-md border border-aldas/30" aria-hidden="true">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Horaires d'ouverture</h4>
                    <p className="text-gray-300 mt-1">Lundi – Vendredi : 7h00 – 21h50</p>
                    <p className="text-gray-300">Week-end : Sur rendez-vous</p>
                  </div>
                </div>
                
                {/* Adresse */}
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-aldas/20 text-aldas-light rounded-none backdrop-blur-md border border-aldas/30" aria-hidden="true">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div itemScope itemType="https://schema.org/PostalAddress">
                    <h4 className="font-bold text-white text-lg">Notre Siège</h4>
                    <p className="text-gray-300 mt-1" itemProp="streetAddress">Cocody – Riviera Ciad, Rue E22</p>
                    <p className="text-gray-300">
                      <span itemProp="addressLocality">Abidjan</span>, 
                      <span itemProp="addressCountry">Côte d'Ivoire</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* --- DROITE (7/12) : FORMULAIRE --- */}
        <motion.div 
          className="col-span-1 lg:col-span-7 bg-white p-8 md:p-12 lg:p-20 flex items-center shadow-2xl z-20"
          role="form"
          aria-label={ariaLabel}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
        >
          {/* ✅ État : Succès */}
          {submitStatus === 'success' && (
            <motion.div 
              className="w-full h-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="status"
              aria-live="polite"
            >
              <motion.div 
                className="w-24 h-24 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-6 shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 1 }}
              >
                <CheckCircle size={48} strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Message envoyé !</h3>
              <p className="text-gray-600 text-lg font-light">Merci de nous avoir contactés. Nous vous répondrons sous 2 heures.</p>
              <button
                type="button"
                onClick={() => setSubmitStatus('idle')}
                className="mt-6 text-aldas font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2 rounded"
              >
                Envoyer un autre message
              </button>
            </motion.div>
          )}

          {/* ✅ État : Erreur */}
          {submitStatus === 'error' && (
            <motion.div 
              className="w-full h-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="alert"
              aria-live="assertive"
            >
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-none flex items-center justify-center mb-6 shadow-lg">
                <AlertCircle size={48} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Oups, une erreur est survenue</h3>
              <p className="text-gray-600 text-lg font-light mb-4">Nous n'avons pas pu envoyer votre message. Veuillez réessayer.</p>
              <button
                type="button"
                onClick={() => setSubmitStatus('idle')}
                className="px-6 py-3 bg-aldas text-white font-medium rounded-none hover:bg-aldas-light transition-colors focus:outline-none focus:ring-2 focus:ring-aldas focus:ring-offset-2"
              >
                Réessayer
              </button>
            </motion.div>
          )}

          {/* ✅ État : Formulaire */}
          {submitStatus === 'idle' && (
            <form 
              id={formId}
              onSubmit={handleSubmit} 
              noValidate
              className="w-full max-w-2xl mx-auto space-y-6"
              aria-describedby={Object.keys(errors).length > 0 ? `${formId}-errors` : undefined}
            >
              {/* Message d'erreur global */}
              {Object.keys(errors).length > 0 && (
                <div 
                  id={`${formId}-errors`}
                  className="p-4 bg-red-50 border border-red-200 rounded-none text-red-700 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Veuillez corriger les erreurs ci-dessous avant de soumettre.</span>
                  </div>
                </div>
              )}

              <motion.div 
                className="text-center mb-10"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Envoyez votre message</h3>
                <div className="w-20 h-1 bg-aldas mx-auto mt-4 rounded-none" aria-hidden="true" />
              </motion.div>

              {/* Champs du formulaire en grille */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Nom */}
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label 
                    htmlFor={`${formId}-name`} 
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                  >
                    Nom complet <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                    <input 
                      id={`${formId}-name`}
                      name="name"
                      type="text" 
                      required 
                      autoComplete="name"
                      value={formData.name} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400 ${
                        errors.name && touched.name 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-aldas'
                      }`} 
                      placeholder="Votre nom" 
                    />
                  </div>
                  {errors.name && touched.name && (
                    <p id={`${formId}-name-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} aria-hidden="true" /> {errors.name}
                    </p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label htmlFor={`${formId}-email`} className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Email <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                    <input 
                      id={`${formId}-email`}
                      name="email"
                      type="email" 
                      required 
                      autoComplete="email"
                      value={formData.email} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400 ${
                        errors.email && touched.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-aldas'
                      }`} 
                      placeholder="votre@email.com" 
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p id={`${formId}-email-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} aria-hidden="true" /> {errors.email}
                    </p>
                  )}
                </motion.div>

                {/* Téléphone */}
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label htmlFor={`${formId}-phone`} className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Téléphone <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                    <input 
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel" 
                      required 
                      autoComplete="tel"
                      value={formData.phone} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400 ${
                        errors.phone && touched.phone 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-aldas'
                      }`} 
                      placeholder="+225..." 
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p id={`${formId}-phone-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} aria-hidden="true" /> {errors.phone}
                    </p>
                  )}
                </motion.div>

                {/* Service */}
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label htmlFor={`${formId}-service`} className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Service <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                    <select 
                      id={`${formId}-service`}
                      name="service"
                      required 
                      value={formData.service} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? `${formId}-service-error` : undefined}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all appearance-none cursor-pointer text-gray-600 ${
                        errors.service && touched.service 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-aldas'
                      }`}
                    >
                      {serviceOptions.map(opt => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" aria-hidden="true">▼</div>
                  </div>
                  {errors.service && touched.service && (
                    <p id={`${formId}-service-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} aria-hidden="true" /> {errors.service}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Sujet */}
              <motion.div className="space-y-2" variants={fadeInUp}>
                <label htmlFor={`${formId}-subject`} className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Sujet <span className="text-red-500" aria-label="requis">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                  <input 
                    id={`${formId}-subject`}
                    name="subject"
                    type="text" 
                    required 
                    value={formData.subject} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all placeholder-gray-400 ${
                      errors.subject && touched.subject 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-aldas'
                    }`} 
                    placeholder="Sujet de votre demande" 
                  />
                </div>
                {errors.subject && touched.subject && (
                  <p id={`${formId}-subject-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.subject}
                  </p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div className="space-y-2" variants={fadeInUp}>
                <label htmlFor={`${formId}-message`} className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Message <span className="text-red-500" aria-label="requis">*</span>
                </label>
                <textarea 
                  id={`${formId}-message`}
                  name="message"
                  required 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                  className={`w-full px-4 py-4 bg-gray-50 border rounded-none focus:outline-none focus:bg-white focus:ring-4 focus:ring-aldas/10 transition-all resize-none placeholder-gray-400 ${
                    errors.message && touched.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-aldas'
                  }`} 
                  placeholder="Décrivez votre besoin en détail..."
                />
                {errors.message && touched.message && (
                  <p id={`${formId}-message-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.message}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {formData.message.length}/500 caractères
                </p>
              </motion.div>

              {/* Bouton de soumission */}
              <motion.div variants={fadeInUp}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group w-full py-5 bg-gray-900 hover:bg-aldas text-white font-bold rounded-none shadow-lg hover:shadow-aldas/40 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4 uppercase tracking-widest text-sm focus:outline-none focus:ring-4 focus:ring-aldas/50 focus:ring-offset-2"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <> 
                      <span>Envoyer le message</span> 
                      <motion.span
                        aria-hidden="true"
                        animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Send size={20} className="transform group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Note de confidentialité */}
              <p className="text-gray-400 text-xs text-center mt-4">
                Vos données sont protégées. Consultez notre{' '}
                <a href="/confidentialite" className="text-aldas hover:underline focus:outline-none focus:ring-2 focus:ring-aldas rounded">
                  politique de confidentialité
                </a>.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* ✅ Styles CSS pour états focus et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        input:focus, textarea:focus, select:focus, button:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* Styles pour les champs en erreur */
        input[aria-invalid="true"], textarea[aria-invalid="true"], select[aria-invalid="true"] {
          border-color: #ef4444 !important;
        }
      `}</style>
    </motion.section>
  );
};

export default ContactFormSplit;