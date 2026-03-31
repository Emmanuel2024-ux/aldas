// src/components/Contact/ContactFormSplit.tsx
// ============================================================================
// 🎯 FORMULAIRE DE CONTACT PREMIUM - ÁLDÁS CI
// ============================================================================
// CORRECTION : Tous les éléments avec props Framer Motion utilisent motion.*
// ============================================================================

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, MapPin, CheckCircle, User, Mail, Phone, Briefcase, 
  MessageSquare, Send, AlertCircle, Loader2, Sparkles
} from 'lucide-react';

import contactFixe from '../../assets/images/contact-fixe.jpeg';

// ============================================================================
// 🎯 TYPES
// ============================================================================

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
  onFormSubmit?: ( arg0: FormData) => Promise<void> | void;
  formId?: string;
  ariaLabel?: string;
}

// ============================================================================
// 🎨 VARIANTES (typées)
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

// ============================================================================
// 🧩 COMPOSANT PRINCIPAL
// ============================================================================

const ContactFormSplit = ({
  title = "Une demande spéciale ?",
  subtitle = "Parlez-nous de votre projet",
  backgroundImage = contactFixe,
  onFormSubmit,
  formId = "contact-form-main",
  ariaLabel = "Formulaire de contact pour demander un devis ou une réservation chez ÁLDÁS CI",
}: ContactFormSplitProps) => {
  // ✅ États
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', service: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false, email: false, phone: false, service: false, subject: false, message: false
  });

  // ✅ prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ✅ Détection mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    const handler = () => check();
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  // ✅ Parallaxe optimisé
  const { scrollY } = useScroll();
  const parallaxRange = isMobile ? 20 : 60;
  const backgroundY = useTransform(
    scrollY,
    [0, 300],
    prefersReducedMotion ? [0, 0] : [0, parallaxRange]
  );

  // ✅ Validation
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Au moins 2 caractères';
        return undefined;
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Le téléphone est requis';
        if (!/^\+?[\d\s\-()]{8,}$/.test(value)) return 'Format invalide';
        return undefined;
      case 'service':
        if (!value) return 'Sélectionnez un service';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Le sujet est requis';
        if (value.trim().length < 5) return 'Au moins 5 caractères';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.trim().length < 10) return 'Au moins 10 caractères';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // ✅ Handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, service: true, subject: true, message: true });
    
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0] as keyof FormData;
      if (firstError) {
        const el = document.getElementById(`${formId}-${firstError}`);
        el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onFormSubmit) {
        await Promise.resolve(onFormSubmit(formData));
      } else {
        await new Promise(res => setTimeout(res, 1500));
        console.log('📤 Formulaire soumis:', formData);
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' });
      setTouched({ name: false, email: false, phone: false, service: false, subject: false, message: false });
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (err) {
      console.error('❌ Erreur formulaire:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onFormSubmit, validateForm, errors, formId, prefersReducedMotion]);

  // ✅ Schema.org
  const contactSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `https://www.aldas-ci.com/contact#${formId}`,
    name: 'Formulaire de contact ÁLDÁS CI',
    description: 'Demandez un devis ou une réservation pour nos services premium',
    potentialAction: {
      '@type': 'CommunicateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.aldas-ci.com/contact',
        actionPlatform: ['DesktopWebPlatform', 'MobileWebPlatform']
      }
    }
  }), [formId]);

  // ✅ Options services
  const serviceOptions = useMemo(() => [
    { value: '', label: '-- Choisissez --', disabled: true },
    { value: 'Location', label: 'Location de voiture premium' },
    { value: 'Navette', label: 'Service de navette VIP' },
    { value: 'Événementiel', label: 'Organisation d\'événements' },
    { value: 'Conciergerie', label: 'Conciergerie haut de gamme' }
  ], []);

  return (
    // ✅ Section principale - motion.section pour les animations de section
    <motion.section
      id="contact-form-wrapper"
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center bg-white overflow-hidden"
      role="region"
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 min-h-inherit">
        
        {/* === GAUCHE : IMAGE DÉCORATIVE === */}
        {/* ✅ motion.div pour les animations */}
        <motion.div
          className="col-span-1 lg:col-span-5 relative overflow-hidden bg-slate-900"
          variants={slideInRight}
        >
          {/* Container background avec parallaxe */}
          <motion.div
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{ y: backgroundY, willChange: 'transform' }}
            aria-hidden="true"
          >
            {/* Image - div standard car pas d'animation */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Overlays - divs standards */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-emerald-900/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.1)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
            }} />
          </motion.div>

          {/* Contenu texte */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16 text-white h-full">
            {/* ✅ motion.div pour container avec variants */}
            <motion.div className="space-y-6 sm:space-y-8 max-w-lg" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              
              {/* Badge - motion.div pour animation */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-medium text-emerald-300 uppercase tracking-wider">{subtitle}</span>
              </motion.div>

              {/* Titre - motion.h2 pour animation */}
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">{title}</motion.h2>

              {/* Description - motion.p pour animation */}
              <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                Remplissez le formulaire. Notre équipe d'experts vous répondra sous moins de 2 heures.
              </motion.p>

              {/* Infos contact - motion.div pour container */}
              <motion.div className="space-y-5 pt-6 border-t border-white/20" variants={containerVariants}>
                {/* Horaires - motion.div pour item */}
                <motion.div className="flex items-start gap-4" variants={itemVariants}>
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30" aria-hidden="true">
                    <Clock size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Horaires</h4>
                    <p className="text-slate-300 text-sm mt-0.5">Lun–Ven : 7h–21h50</p>
                    <p className="text-slate-400 text-xs">Week-end : sur rendez-vous</p>
                  </div>
                </motion.div>

                {/* Adresse - motion.div pour item + microdata sur div interne */}
                <motion.div className="flex items-start gap-4" variants={itemVariants}>
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30" aria-hidden="true">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div itemScope itemType="https://schema.org/PostalAddress">
                    <h4 className="font-semibold text-white">Notre siège</h4>
                    <p className="text-slate-300 text-sm mt-0.5" itemProp="streetAddress">Cocody – Riviera Ciad, Rue E22</p>
                    <p className="text-slate-400 text-xs">
                      <span itemProp="addressLocality">Abidjan</span>, <span itemProp="addressCountry">Côte d'Ivoire</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* === DROITE : FORMULAIRE === */}
        <motion.div
          className="col-span-1 lg:col-span-7 bg-white p-6 sm:p-8 md:p-12 lg:p-16 flex items-center"
          role="form"
          aria-label={ariaLabel}
          variants={itemVariants}
        >
          {/* État : Succès - motion.div pour animations */}
          {submitStatus === 'success' && (
            <motion.div className="w-full h-full flex flex-col items-center justify-center text-center py-8" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} role="status" aria-live="polite">
              <motion.div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.4 }}>
                <CheckCircle size={40} strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message envoyé !</h3>
              <p className="text-slate-600 mb-5">Merci. Nous vous répondrons sous 2 heures.</p>
              <button type="button" onClick={() => setSubmitStatus('idle')} className="text-emerald-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                Envoyer un autre message
              </button>
            </motion.div>
          )}

          {/* État : Erreur - motion.div pour animations */}
          {submitStatus === 'error' && (
            <motion.div className="w-full h-full flex flex-col items-center justify-center text-center py-8" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} role="alert" aria-live="assertive">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <AlertCircle size={40} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Une erreur est survenue</h3>
              <p className="text-slate-600 mb-5">Veuillez réessayer ou nous contacter directement.</p>
              <button type="button" onClick={() => setSubmitStatus('idle')} className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Réessayer
              </button>
            </motion.div>
          )}

          {/* État : Formulaire */}
          {submitStatus === 'idle' && (
            <form id={formId} onSubmit={handleSubmit} noValidate className="w-full max-w-xl mx-auto space-y-5" aria-describedby={Object.keys(errors).length ? `${formId}-errors` : undefined}>
              
              {/* Erreurs globales - div standard car pas d'animation */}
              {Object.keys(errors).length > 0 && (
                <div id={`${formId}-errors`} className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert" aria-live="assertive">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Corrigez les erreurs avant de soumettre.</span>
                  </div>
                </div>
              )}

              {/* En-tête formulaire - motion.div pour animation */}
              <motion.div className="text-center mb-6" variants={itemVariants}>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Envoyez votre message</h3>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-3" aria-hidden="true" />
              </motion.div>

              {/* Grille des champs - motion.div pour container */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={containerVariants} initial="hidden" animate="visible">
                
                {/* Nom - motion.div pour item */}
                <motion.div className="space-y-1.5" variants={itemVariants}>
                  <label htmlFor={`${formId}-name`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <input id={`${formId}-name`} name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${formId}-name-error` : undefined} className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-400 text-sm ${errors.name && touched.name ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`} placeholder="Votre nom" />
                  </div>
                  {errors.name && touched.name && <p id={`${formId}-name-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.name}</p>}
                </motion.div>

                {/* Email - motion.div pour item */}
                <motion.div className="space-y-1.5" variants={itemVariants}>
                  <label htmlFor={`${formId}-email`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <input id={`${formId}-email`} name="email" type="email" required autoComplete="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${formId}-email-error` : undefined} className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-400 text-sm ${errors.email && touched.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`} placeholder="vous@email.com" />
                  </div>
                  {errors.email && touched.email && <p id={`${formId}-email-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.email}</p>}
                </motion.div>

                {/* Téléphone - motion.div pour item */}
                <motion.div className="space-y-1.5" variants={itemVariants}>
                  <label htmlFor={`${formId}-phone`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <input id={`${formId}-phone`} name="phone" type="tel" required autoComplete="tel" value={formData.phone} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${formId}-phone-error` : undefined} className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-400 text-sm ${errors.phone && touched.phone ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`} placeholder="+225..." />
                  </div>
                  {errors.phone && touched.phone && <p id={`${formId}-phone-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.phone}</p>}
                </motion.div>

                {/* Service - motion.div pour item */}
                <motion.div className="space-y-1.5" variants={itemVariants}>
                  <label htmlFor={`${formId}-service`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <select id={`${formId}-service`} name="service" required value={formData.service} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.service} aria-describedby={errors.service ? `${formId}-service-error` : undefined} className={`w-full pl-10 pr-8 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer text-slate-700 text-sm ${errors.service && touched.service ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`}>
                      {serviceOptions.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" aria-hidden="true">▾</div>
                  </div>
                  {errors.service && touched.service && <p id={`${formId}-service-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.service}</p>}
                </motion.div>
              </motion.div>

              {/* Sujet - motion.div pour item */}
              <motion.div className="space-y-1.5" variants={itemVariants}>
                <label htmlFor={`${formId}-subject`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 text-slate-400" size={18} aria-hidden="true" />
                  <input id={`${formId}-subject`} name="subject" type="text" required value={formData.subject} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? `${formId}-subject-error` : undefined} className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-400 text-sm ${errors.subject && touched.subject ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`} placeholder="Sujet de votre demande" />
                </div>
                {errors.subject && touched.subject && <p id={`${formId}-subject-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.subject}</p>}
              </motion.div>

              {/* Message - motion.div pour item */}
              <motion.div className="space-y-1.5" variants={itemVariants}>
                <label htmlFor={`${formId}-message`} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea id={`${formId}-message`} name="message" required rows={4} value={formData.message} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${formId}-message-error` : undefined} className={`w-full px-3 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none placeholder-slate-400 text-sm ${errors.message && touched.message ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'}`} placeholder="Décrivez votre besoin en détail..." />
                {errors.message && touched.message && <p id={`${formId}-message-error`} className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><AlertCircle size={11} aria-hidden="true" /> {errors.message}</p>}
                <p className="text-slate-400 text-[10px] mt-0.5 text-right">{formData.message.length}/500</p>
              </motion.div>

              {/* Bouton submit - motion.div pour animation */}
              <motion.div variants={itemVariants}>
                <button type="submit" disabled={isSubmitting} className="group w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer</span>
                      <Send size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </motion.div>

              {/* Confidentialité - div standard */}
              <p className="text-slate-400 text-[10px] text-center mt-2">
                Vos données sont protégées. <a href="/confidentialite" className="text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded">Politique de confidentialité</a>.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* ✅ Styles CSS */}
      <style>{`
        input:focus, textarea:focus, select:focus, button:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; transform: none !important; }
        }
        [aria-invalid="true"] { border-color: #ef4444 !important; }
      `}</style>
    </motion.section>
  );
};

export default ContactFormSplit;