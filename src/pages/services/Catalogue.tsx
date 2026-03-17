// src/pages/services/Catalogue.tsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, X, SlidersHorizontal, ChevronDown, ChevronUp, AlertCircle, Calendar, Clock, User, Mail, Phone, MapPin, CreditCard, ArrowLeft, Star
} from 'lucide-react';
import VehicleCard from '../../components/Services/VehicleCard';
import { carsData, getUniqueBrands } from '../../data/carsData';

// --- CORRECTION TYPE : Accepte string OU number pour l'ID ---
interface CarData {
  id: string | number;
  code: string;
  brand: string;
  name: string;
  price: number;
  seats: number;
  doors: number;
  transmission: 'A' | 'M';
  luggage: number;
  image: string;
  category?: string;
}

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // --- ÉTATS DES FILTRES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [seatsFilter, setSeatsFilter] = useState<string>('All');
  const [transmission, setTransmission] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc'>('price-asc');
  
  // État pour l'affichage des filtres
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // État pour le Modal
  const [selectedCarCode, setSelectedCarCode] = useState<string | null>(null);
  
  // Correction Typage : selectedCar sera de type CarData | undefined
  const selectedCar = useMemo(() => carsData.find(c => c.code === selectedCarCode) as CarData | undefined, [selectedCarCode]);

  // Données dérivées
  const brands = useMemo(() => ['All', ...getUniqueBrands(carsData)], []);
  const maxCatalogPrice = useMemo(() => Math.max(...carsData.map(c => Number(c.price))), []);

  // --- GESTION DE L'URL ---
  useEffect(() => {
    const code = searchParams.get('clcx');
    if (code) {
      setSelectedCarCode(code);
    }
  }, [searchParams]);

  const closeModal = () => {
    setSelectedCarCode(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('clcx');
    setSearchParams(newParams, { replace: true });
  };

  // --- LOGIQUE DE FILTRAGE ---
  const filteredCars = useMemo(() => {
    return carsData
      .filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              car.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
        const matchesPrice = Number(car.price) <= maxPrice;
        
        let matchesSeats = true;
        if (seatsFilter === '7+') matchesSeats = car.seats >= 7;
        else if (seatsFilter !== 'All') matchesSeats = car.seats === parseInt(seatsFilter);

        const matchesTrans = transmission.length === 0 || transmission.includes(car.transmission);

        return matchesSearch && matchesBrand && matchesPrice && matchesSeats && matchesTrans;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [searchTerm, selectedBrand, maxPrice, seatsFilter, transmission, sortBy]);

  // --- HELPERS ---
  const formatPrice = (price: number | string) => new Intl.NumberFormat('fr-FR').format(Number(price)) + ' FCFA';
  
  const toggleTransmission = (type: string) => {
    setTransmission(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setMaxPrice(maxCatalogPrice);
    setSeatsFilter('All');
    setTransmission([]);
    setSortBy('price-asc');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demande envoyée pour ${selectedCar?.brand} ${selectedCar?.name} !`);
    closeModal();
  };

  // Bloquer le scroll du body
  useEffect(() => {
    if (selectedCarCode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCarCode]);

  return (
    <div className="bg-white min-h-screen font-sans antialiased pb-20 relative">
      
      {/* --- 1. HEADER AVEC BOUTON RETOUR --- */}
      <section className="relative overflow-hidden bg-[#1a1d08] text-white py-10 md:py-14">

  {/* Background grid professionnel */}
  <div className="absolute inset-0 
    bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
    bg-[size:40px_40px]">
  </div>

  {/* Glow décoratif */}
  <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full"></div>

  <div className="container mx-auto px-4 relative z-10">

    {/* Badge */}
    <span className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur">
      Flotte Premium
    </span>

    {/* Titre */}
    <h1 className="text-3xl md:text-5xl text-white font-extrabold tracking-tight leading-tight mb-3">
      Notre{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">
        Catalogue
      </span>
    </h1>

    {/* Description */}
    <p className="text-gray-300 text-base md:text-lg max-w-xl font-light leading-relaxed">
      Explorez notre flotte complète de véhicules premium. Filtrez par marque,
      prix ou caractéristiques pour trouver la voiture idéale.
    </p>

  </div>
</section>

      {/* --- 2. BARRE DE FILTRES INTELLIGENTE --- */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* GAUCHE : Bouton Retour + Recherche */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-grow">
              
              {/* BOUTON RETOUR */}
              <button 
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-sm font-bold text-gray-700 hover:text-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
                aria-label="Retour à la page précédente"
              >
                <div className="p-1 rounded-full bg-gray-100 group-hover:bg-emerald-100 transition-colors">
                  <ArrowLeft size={18} className="transform group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <span className="hidden sm:inline">Retour</span>
              </button>

              {/* BARRE DE RECHERCHE */}
              <div className="relative w-full lg:w-96 group/search">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-emerald-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Rechercher (ex: Classe S, GLE...)" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white border-2 focus:border-emerald-500 rounded-xl focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium outline-none"
                />
              </div>
            </div>

            {/* DROITE : Actions (Filtres & Tri) */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <button 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                  isFilterExpanded 
                    ? 'bg-emerald-600 text-white shadow-emerald-500/30' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                <SlidersHorizontal size={18} />
                {isFilterExpanded ? 'Réduire' : 'Filtres'}
                {isFilterExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <div className="relative hidden lg:block">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-4 pr-10 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-emerald-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                >
                  <option value="price-asc">Prix ↑</option>
                  <option value="price-desc">Prix ↓</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Panneau Filtres Animé (Inchangé) */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFilterExpanded ? 'max-h-[900px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-4 pt-2 border-t border-gray-100">
              {/* Marques */}
              <div className="lg:col-span-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marques</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1 bg-gray-50 rounded-xl">
                  {brands.map(brand => (
                    <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 border ${selectedBrand === brand ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}>
                      {brand === 'All' ? 'Toutes' : brand}
                    </button>
                  ))}
                </div>
              </div>
              {/* Sièges & Transmission */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Passagers</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', '2', '4', '5', '7+'].map(opt => (
                      <button key={opt} onClick={() => setSeatsFilter(opt)} className={`flex-1 min-w-[40px] py-2 rounded-lg text-xs font-bold transition-all duration-300 border ${seatsFilter === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                        {opt === 'All' ? 'Tous' : opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Boîte</label>
                  <div className="flex gap-2">
                    {['A', 'M'].map(type => (
                      <button key={type} onClick={() => toggleTransmission(type)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-300 border ${transmission.includes(type) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200'}`}>
                        {type === 'A' ? 'Auto' : 'Man.'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Prix & Reset */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-gray-500 uppercase">Budget Max</label>
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{formatPrice(maxPrice)}</span>
                  </div>
                  <input type="range" min="50000" max={maxCatalogPrice} step="50000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                </div>
                <button onClick={resetFilters} className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-xs font-bold uppercase hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <X size={14} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. GRILLE DES VÉHICULES --- */}
      <section className="py-12 container mx-auto px-4 min-h-[600px]">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Véhicules <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{filteredCars.length}</span>
          </h2>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredCars.map((car) => (
              <VehicleCard key={car.id} car={car} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Aucun résultat</h3>
            <button onClick={resetFilters} className="mt-4 text-emerald-600 font-bold hover:underline">Voir tout le catalogue</button>
          </div>
        )}
      </section>

      {/* --- 4. MODAL DE RÉSERVATION (RESPONSIVE & LOGO) --- */}
      {selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={closeModal}></div>

          {/* Modal Content : Full screen on mobile, centered card on desktop */}
          <div className="relative w-full h-full md:max-h-[90vh] md:max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            {/* Bouton Fermer (Mobile: Top Right absolute, Desktop: Relative inside flow) */}
            <button onClick={closeModal} className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all md:bg-white/20 md:hover:bg-white/40">
              <X size={24} />
            </button>

            {/* GAUCHE : CARTE VÉHICULE (Scrollable sur mobile si besoin) */}
            <div className="w-full md:w-2/5 bg-[#0b0f14] relative flex flex-col h-[40vh] md:h-auto overflow-y-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10"></div>
              <img src={selectedCar.image} alt={selectedCar.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
              
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end h-full text-white mt-auto">
                {/* Badge Marque */}
                <span className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-4">
                  {selectedCar.brand}
                </span>
                
                <h2 className="text-2xl md:text-4xl font-black mb-2 leading-tight">{selectedCar.name}</h2>
                <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-6 drop-shadow-lg">
                  {formatPrice(selectedCar.price)} <span className="text-xs text-gray-400 font-normal">/ jour</span>
                </div>

                {/* Specs Grid Responsive */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <SpecItem icon={User} label="Passagers" value={selectedCar.seats} />
                  <SpecItem icon={CreditCard} label="Boîte" value={selectedCar.transmission === 'A' ? 'Auto' : 'Man.'} />
                  <SpecItem icon={MapPin} label="Portes" value={selectedCar.doors} />
                  <SpecItem icon={Calendar} label="Bagages" value={selectedCar.luggage} />
                </div>

                <div className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <p className="text-xs md:text-sm text-gray-300 italic">"Véhicule disponible immédiatement. Assurance tous risques incluse."</p>
                </div>
              </div>
            </div>

            {/* DROITE : FORMULAIRE (Scrollable) */}
            <div className="w-full md:w-3/5 bg-white flex flex-col h-full overflow-hidden">
              {/* Header Formulaire avec Logo */}
              <div className="p-6 md:p-8 border-b border-gray-100 shrink-0 bg-white">
                <div className="flex items-center gap-3 mb-2">
                  {/* LOGO PLACEHOLDER (Remplace src par ton logo réel) */}
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-none">Réservation</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Confirmez votre demande en ligne</p>
                  </div>
                </div>
              </div>

              {/* Scroll Area Formulaire */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup icon={User} label="Nom complet" placeholder="Ex: Jean Kouassi" required />
                    <InputGroup icon={Phone} label="Téléphone" placeholder="+225 07..." required type="tel" />
                    <InputGroup icon={Mail} label="Email" placeholder="jean@exemple.com" required type="email" />
                    <InputGroup icon={MapPin} label="Ville" placeholder="Abidjan" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                    <InputGroup icon={Calendar} label="Début" type="datetime-local" required />
                    <InputGroup icon={Clock} label="Fin" type="datetime-local" required />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Type de location</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="cursor-pointer group">
                        <input type="radio" name="driver" value="sans" className="peer sr-only" defaultChecked />
                        <div className="p-3 md:p-4 rounded-xl border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all group-hover:border-emerald-200">
                          <span className="block font-bold text-gray-900 text-sm md:text-base">Sans Chauffeur</span>
                          <span className="text-[10px] md:text-xs text-gray-500">Vous conduisez</span>
                        </div>
                      </label>
                      <label className="cursor-pointer group">
                        <input type="radio" name="driver" value="avec" className="peer sr-only" />
                        <div className="p-3 md:p-4 rounded-xl border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all group-hover:border-emerald-200">
                          <span className="block font-bold text-gray-900 text-sm md:text-base">Avec Chauffeur</span>
                          <span className="text-[10px] md:text-xs text-gray-500">Service premium</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1 mt-6 text-base md:text-lg">
                    Confirmer la réservation
                  </button>
                  <p className="text-center text-[10px] md:text-xs text-gray-400 mt-4">
                    En confirmant, vous acceptez nos conditions générales.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helpers ---
const SpecItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-2 md:gap-3">
    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
      <Icon size={14} className="md:w-4 md:h-4" />
    </div>
    <div className="min-w-0">
      <div className="text-[9px] md:text-[10px] uppercase text-gray-400 font-bold truncate">{label}</div>
      <div className="text-xs md:text-sm font-bold text-white truncate">{value}</div>
    </div>
  </div>
);

const InputGroup = ({ icon: Icon, label, type = "text", placeholder, required = false }: any) => (
  <div>
    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input 
        type={type} 
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
      />
    </div>
  </div>
);

export default Catalogue;