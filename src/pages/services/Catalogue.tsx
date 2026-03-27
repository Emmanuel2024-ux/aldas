// src/pages/services/Catalogue.tsx
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../seo/pageSEO';
import { 
  Search, X, SlidersHorizontal, ChevronDown, ChevronUp, AlertCircle, Calendar, Clock, User, Mail, Phone, MapPin, CreditCard, ArrowLeft, Star
} from 'lucide-react';
import VehicleCard from '../../components/Services/VehicleCard';
import { carsData, getUniqueBrands } from '../../data/carsData';

// --- TYPES ---
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
  description?: string;
  fuelType?: string;
}

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // ✅ 1. SEO : Injection des meta tags via useSEO
  useSEO(pageSEO['/services/mobilite']);
  
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
  const selectedCar = useMemo(() => 
    carsData.find(c => c.code === selectedCarCode) as CarData | undefined, 
    [selectedCarCode]
  );

  // Données dérivées mémoïsées
  const brands = useMemo(() => ['All', ...getUniqueBrands(carsData)], []);
  const maxCatalogPrice = useMemo(() => Math.max(...carsData.map(c => Number(c.price))), []);
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

  // ✅ 2. Schema.org JSON-LD pour le catalogue (ItemList + Car)
  const catalogSchema = useMemo(() => {
    const baseUrl = 'https://www.aldas-ci.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${baseUrl}/services/mobilite#catalog`,
      name: 'Catalogue de Véhicules de Location Premium - ÁLDÁS CI',
      description: pageSEO['/services/mobilite'].description,
      url: `${baseUrl}/services/mobilite`,
      itemListElement: filteredCars.slice(0, 20).map((car: CarData, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Car',
          '@id': `${baseUrl}/services/mobilite#${car.code}`,
          name: `${car.brand} ${car.name}`,
          description: car.description || `Location de ${car.brand} ${car.name} premium à Abidjan, Côte d'Ivoire`,
          image: `${baseUrl}${car.image.startsWith('/') ? car.image : `/${car.image}`}`,
          offers: {
            '@type': 'Offer',
            price: car.price,
            priceCurrency: 'XOF',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/services/mobilite?clcx=${car.code}`,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          vehicleConfiguration: `${car.seats} places, ${car.doors} portes, ${car.transmission === 'A' ? 'Automatique' : 'Manuelle'}`,
          fuelType: car.fuelType || 'Essence',
          seatingCapacity: car.seats,
          numberOfDoors: car.doors,
          cargoVolume: `${car.luggage} bagages`,
          vehicleSpecialUsage: 'Rental'
        }
      })),
      numberOfItems: filteredCars.length,
      provider: {
        '@type': 'LocalBusiness',
        name: 'ÁLDÁS CI',
        image: `${baseUrl}/logo.jpg`,
        telephone: '+2250747265693',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Abidjan',
          addressCountry: 'CI'
        }
      }
    };
  }, [filteredCars]);

  // --- GESTION DE L'URL ---
  useEffect(() => {
    const code = searchParams.get('clcx');
    if (code) {
      setSelectedCarCode(code);
    }
  }, [searchParams]);

  const closeModal = useCallback(() => {
    setSelectedCarCode(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('clcx');
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // ✅ 3. Gestion du focus trap pour le modal (accessibilité)
  useEffect(() => {
    if (selectedCarCode) {
      document.body.style.overflow = 'hidden';
      // Focus sur le modal pour accessibilité clavier
      const modal = document.getElementById('reservation-modal');
      modal?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCarCode]);

  // ✅ 4. Gestion des touches pour le modal (Escape pour fermer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCarCode && e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCarCode, closeModal]);

  // --- HELPERS ---
  const formatPrice = useCallback((price: number | string) => 
    new Intl.NumberFormat('fr-FR').format(Number(price)) + ' FCFA', []);
  
  const toggleTransmission = useCallback((type: string) => {
    setTransmission(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedBrand('All');
    setMaxPrice(maxCatalogPrice);
    setSeatsFilter('All');
    setTransmission([]);
    setSortBy('price-asc');
  }, [maxCatalogPrice]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCar) {
      console.log('📤 Réservation soumise:', { 
        car: `${selectedCar.brand} ${selectedCar.name}`, 
        formData: new FormData(e.currentTarget as HTMLFormElement) 
      });
      // Ici : appeler votre API de réservation
      alert(`Demande envoyée pour ${selectedCar.brand} ${selectedCar.name} !`);
    }
    closeModal();
  }, [selectedCar, closeModal]);

  // Helper pour le prix formaté dans le schema
  const getSchemaPrice = (price: number) => Number(price);

  return (
    // ✅ Structure sémantique principale avec ARIA et microdata
    <main 
      className="bg-white min-h-screen font-sans antialiased pb-20 relative"
      role="main"
      aria-label="Catalogue de véhicules de location premium - ÁLDÁS CI"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* ✅ 5. Injection du Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      
      {/* ✅ 6. H1 unique pour SEO (sr-only car le header gère le visuel) */}
      <h1 className="sr-only" itemProp="name">
        Catalogue de Véhicules de Location Premium à Abidjan | ÁLDÁS CI
      </h1>
      <meta itemProp="description" content={pageSEO['/services/mobilite'].description} />
      <meta itemProp="image" content={pageSEO['/services/mobilite'].ogImage} />
      <link itemProp="url" href="https://www.aldas-ci.com/services/mobilite" />
      
      {/* --- 1. HEADER AVEC BOUTON RETOUR --- */}
      <header 
        className="relative overflow-hidden bg-[#1a1d08] text-white py-10 md:py-14"
        role="banner"
        aria-label="En-tête du catalogue de véhicules"
      >
        {/* Background grid professionnel - décoratif */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"
          aria-hidden="true"
        />

        {/* Glow décoratif */}
        <div 
          className="absolute -top-32 right-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Badge */}
          <span 
            className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur"
            itemProp="additionalType"
          >
            Flotte Premium
          </span>

          {/* Titre H1 visuel (doublon du sr-only pour le design) */}
          <h2 
            className="text-3xl md:text-5xl text-white font-extrabold tracking-tight leading-tight mb-3"
            aria-hidden="true"
          >
            Notre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">
              Catalogue
            </span>
          </h2>

          {/* Description */}
          <p 
            className="text-gray-300 text-base md:text-lg max-w-xl font-light leading-relaxed"
            itemProp="description"
          >
            Explorez notre flotte complète de véhicules premium. Filtrez par marque,
            prix ou caractéristiques pour trouver la voiture idéale.
          </p>
        </div>
      </header>

      {/* --- 2. BARRE DE FILTRES INTELLIGENTE --- */}
      <div 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300"
        role="search"
        aria-label="Filtres et recherche du catalogue"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* GAUCHE : Bouton Retour + Recherche */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-grow">
              
              {/* BOUTON RETOUR */}
              <Link
                to="/services/mobilite"
                className="group flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-sm font-bold text-gray-700 hover:text-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Retour vers le service mobilité"
              >
                <div className="p-1 rounded-full bg-gray-100 group-hover:bg-emerald-100 transition-colors" aria-hidden="true">
                  <ArrowLeft size={18} className="transform group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <span className="hidden sm:inline">Retour</span>
              </Link>

              {/* BARRE DE RECHERCHE */}
              <div className="relative w-full lg:w-96 group/search">
                <label htmlFor="vehicle-search" className="sr-only">
                  Rechercher un véhicule par nom ou marque
                </label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-emerald-600 transition-colors" size={20} aria-hidden="true" />
                <input 
                  id="vehicle-search"
                  type="search" 
                  placeholder="Rechercher (ex: Classe S, GLE...)" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white border-2 focus:border-emerald-500 rounded-xl focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium outline-none"
                  aria-describedby="search-hint"
                />
                <span id="search-hint" className="sr-only">
                  Saisissez le nom d'un véhicule ou d'une marque pour filtrer les résultats
                </span>
              </div>
            </div>

            {/* DROITE : Actions (Filtres & Tri) */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <button 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  isFilterExpanded 
                    ? 'bg-emerald-600 text-white shadow-emerald-500/30' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
                aria-expanded={isFilterExpanded}
                aria-controls="filter-panel-content"
                aria-label={isFilterExpanded ? 'Réduire les filtres' : 'Afficher les filtres'}
              >
                <SlidersHorizontal size={18} aria-hidden="true" />
                {isFilterExpanded ? 'Réduire' : 'Filtres'}
                {isFilterExpanded ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
              </button>

              <div className="relative hidden lg:block">
                <label htmlFor="sort-select" className="sr-only">Trier les véhicules par prix</label>
                <select 
                  id="sort-select"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc')}
                  className="appearance-none pl-4 pr-10 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-emerald-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="Trier les véhicules par prix"
                >
                  <option value="price-asc">Prix ↑</option>
                  <option value="price-desc">Prix ↓</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Panneau Filtres Animé */}
          <div 
            id="filter-panel-content"
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isFilterExpanded ? 'max-h-[900px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
            aria-hidden={!isFilterExpanded}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-4 pt-2 border-t border-gray-100" role="group" aria-label="Options de filtrage">
              
              {/* Marques */}
              <div className="lg:col-span-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" id="brands-label">Marques</label>
                <div 
                  className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1 bg-gray-50 rounded-xl"
                  role="radiogroup"
                  aria-labelledby="brands-label"
                >
                  {brands.map(brand => (
                    <button 
                      key={brand} 
                      onClick={() => setSelectedBrand(brand)} 
                      role="radio"
                      aria-checked={selectedBrand === brand}
                      aria-label={`Filtrer par marque ${brand === 'All' ? 'toutes' : brand}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                        selectedBrand === brand 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {brand === 'All' ? 'Toutes' : brand}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sièges & Transmission */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" id="seats-label">Passagers</label>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="seats-label">
                    {['All', '2', '4', '5', '7+'].map(opt => (
                      <button 
                        key={opt} 
                        onClick={() => setSeatsFilter(opt)} 
                        role="radio"
                        aria-checked={seatsFilter === opt}
                        aria-label={`Filtrer par ${opt === 'All' ? 'tous' : opt === '7+' ? '7 passagers ou plus' : opt + ' passagers'}`}
                        className={`flex-1 min-w-[40px] py-2 rounded-lg text-xs font-bold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                          seatsFilter === opt 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        {opt === 'All' ? 'Tous' : opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" id="transmission-label">Boîte</label>
                  <div className="flex gap-2" role="group" aria-labelledby="transmission-label">
                    {['A', 'M'].map(type => (
                      <button 
                        key={type} 
                        onClick={() => toggleTransmission(type)} 
                        aria-pressed={transmission.includes(type)}
                        aria-label={`Filtrer par boîte ${type === 'A' ? 'automatique' : 'manuelle'}`}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                          transmission.includes(type) 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
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
                    <label htmlFor="price-range" className="text-xs font-bold text-gray-500 uppercase">Budget Max</label>
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md" aria-live="polite">
                      {formatPrice(maxPrice)}
                    </span>
                  </div>
                  <input 
                    id="price-range"
                    type="range" 
                    min="50000" 
                    max={maxCatalogPrice} 
                    step="50000" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    aria-valuemin={50000}
                    aria-valuemax={maxCatalogPrice}
                    aria-valuenow={maxPrice}
                    aria-label="Budget maximum en FCFA"
                  />
                </div>
                <button 
                  onClick={resetFilters} 
                  className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-xs font-bold uppercase hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <X size={14} aria-hidden="true" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. GRILLE DES VÉHICULES --- */}
      <section 
        className="py-12 container mx-auto px-4 min-h-[600px]"
        role="region"
        aria-labelledby="vehicles-heading"
      >
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <h2 
            id="vehicles-heading" 
            className="text-xl font-bold text-gray-900 flex items-center gap-2"
            itemProp="numberOfItems"
          >
            Véhicules <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full" aria-live="polite">{filteredCars.length}</span>
          </h2>
        </div>

        {filteredCars.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            role="list"
            aria-label={`Liste de ${filteredCars.length} véhicules disponibles à la location`}
          >
            {filteredCars.map((car) => (
              <article 
                key={car.id} 
                role="listitem"
                itemScope
                itemType="https://schema.org/Car"
                className="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 rounded-2xl"
              >
                {/* Microdata Schema.org pour chaque véhicule */}
                <meta itemProp="name" content={`${car.brand} ${car.name}`} />
                <meta itemProp="brand" content={car.brand} />
                <meta itemProp="model" content={car.name} />
                <meta itemProp="price" content={getSchemaPrice(car.price).toString()} />
                <meta itemProp="priceCurrency" content="XOF" />
                <meta itemProp="seatingCapacity" content={car.seats.toString()} />
                <meta itemProp="numberOfDoors" content={car.doors.toString()} />
                <meta itemProp="fuelType" content={ 'Essence'} />
                <meta itemProp="vehicleTransmission" content={car.transmission === 'A' ? 'Automatic' : 'Manual'} />
                <meta itemProp="cargoVolume" content={`${car.luggage} bagages`} />
                <meta itemProp="vehicleSpecialUsage" content="Rental" />
                <link itemProp="url" href={`https://www.aldas-ci.com/services/mobilite?clcx=${car.code}`} />
                <link itemProp="image" href={`https://www.aldas-ci.com${car.image.startsWith('/') ? car.image : `/${car.image}`}`} />
                
                {/* VehicleCard avec props SEO */}
                <VehicleCard 
                  car={car} 
                  variant="grid"
                  // Props supplémentaires pour le SEO si VehicleCard les supporte
                  itemProp="offers"
                  ariaLabel={`Réserver ${car.brand} ${car.name} à ${formatPrice(car.price)} par jour`}
                />
              </article>
            ))}
          </div>
        ) : (
          <div 
            className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
            role="status"
            aria-live="polite"
          >
            <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900">Aucun résultat</h3>
            <p className="text-gray-600 mt-2">Aucun véhicule ne correspond à vos critères de recherche.</p>
            <button 
              onClick={resetFilters} 
              className="mt-4 text-emerald-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
            >
              Voir tout le catalogue
            </button>
          </div>
        )}
      </section>

      {/* --- 4. MODAL DE RÉSERVATION (Accessible) --- */}
      {selectedCar && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reservation-modal-title"
          aria-describedby="reservation-modal-description"
          id="reservation-modal"
          tabIndex={-1}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="relative w-full h-full md:max-h-[90vh] md:max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            {/* Bouton Fermer */}
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all md:bg-white/20 md:hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Fermer le formulaire de réservation"
            >
              <X size={24} aria-hidden="true" />
            </button>

            {/* GAUCHE : CARTE VÉHICULE */}
            <div 
              className="w-full md:w-2/5 bg-[#0b0f14] relative flex flex-col h-[40vh] md:h-auto overflow-y-auto"
              itemScope
              itemType="https://schema.org/Car"
            >
              {/* Microdata pour le véhicule dans le modal */}
              <meta itemProp="name" content={`${selectedCar.brand} ${selectedCar.name}`} />
              <meta itemProp="brand" content={selectedCar.brand} />
              <meta itemProp="model" content={selectedCar.name} />
              <meta itemProp="price" content={getSchemaPrice(selectedCar.price).toString()} />
              <meta itemProp="priceCurrency" content="XOF" />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" aria-hidden="true" />
              <img 
                src={selectedCar.image} 
                alt={`${selectedCar.brand} ${selectedCar.name} - Véhicule de location premium à Abidjan`} 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                itemProp="image"
                width={800}
                height={600}
                loading="lazy"
              />
              
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end h-full text-white mt-auto">
                {/* Badge Marque */}
                <span 
                  className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-4"
                  itemProp="brand"
                >
                  {selectedCar.brand}
                </span>
                
                <h2 
                  id="reservation-modal-title"
                  className="text-2xl md:text-4xl font-black mb-2 leading-tight"
                  itemProp="name"
                >
                  {selectedCar.name}
                </h2>
                <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-6 drop-shadow-lg">
                  <span itemProp="price" content={getSchemaPrice(selectedCar.price).toString()}>{formatPrice(selectedCar.price)}</span> 
                  <meta itemProp="priceCurrency" content="XOF" />
                  <span className="text-xs text-gray-400 font-normal"> / jour</span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <SpecItem icon={User} label="Passagers" value={selectedCar.seats} itemProp="seatingCapacity" />
                  <SpecItem icon={CreditCard} label="Boîte" value={selectedCar.transmission === 'A' ? 'Auto' : 'Man.'} itemProp="vehicleTransmission" />
                  <SpecItem icon={MapPin} label="Portes" value={selectedCar.doors} itemProp="numberOfDoors" />
                  <SpecItem icon={Calendar} label="Bagages" value={selectedCar.luggage} itemProp="cargoVolume" />
                </div>

                <div className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <p className="text-xs md:text-sm text-gray-300 italic" id="reservation-modal-description">
                    "Véhicule disponible immédiatement. Assurance tous risques incluse."
                  </p>
                </div>
              </div>
            </div>

            {/* DROITE : FORMULAIRE */}
            <div className="w-full md:w-3/5 bg-white flex flex-col h-full overflow-hidden">
              {/* Header Formulaire */}
              <div className="p-6 md:p-8 border-b border-gray-100 shrink-0 bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg" aria-hidden="true">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-none">Réservation</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Confirmez votre demande en ligne</p>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <form onSubmit={handleFormSubmit} className="space-y-5" aria-label="Formulaire de réservation de véhicule">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nom */}
                    <div>
                      <label htmlFor="reservation-name" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Nom complet <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-name"
                          name="name"
                          type="text" 
                          placeholder="Ex: Jean Kouassi"
                          required
                          autoComplete="name"
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    {/* Téléphone */}
                    <div>
                      <label htmlFor="reservation-phone" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Téléphone <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-phone"
                          name="phone"
                          type="tel" 
                          placeholder="+225 07..."
                          required
                          autoComplete="tel"
                          pattern="^\+?[\d\s\-()]{8,}$"
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="reservation-email" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Email <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-email"
                          name="email"
                          type="email" 
                          placeholder="jean@exemple.com"
                          required
                          autoComplete="email"
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    {/* Ville */}
                    <div>
                      <label htmlFor="reservation-city" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Ville <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-city"
                          name="city"
                          type="text" 
                          placeholder="Abidjan"
                          required
                          autoComplete="address-level2"
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                    <div>
                      <label htmlFor="reservation-start" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Début <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-start"
                          name="start"
                          type="datetime-local" 
                          required
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="reservation-end" className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
                        Fin <span className="text-red-500" aria-label="champ requis">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
                        <input 
                          id="reservation-end"
                          name="end"
                          type="datetime-local" 
                          required
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                          aria-required="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Type de location */}
                  <div className="pt-4 border-t border-gray-100">
                    <fieldset>
                      <legend className="block text-sm font-bold text-gray-700 mb-3">Type de location <span className="text-red-500" aria-label="requis">*</span></legend>
                      <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-label="Choisir le type de location">
                        <label className="cursor-pointer group">
                          <input 
                            type="radio" 
                            name="driver" 
                            value="sans" 
                            className="peer sr-only" 
                            defaultChecked 
                            required
                            aria-required="true"
                          />
                          <div className="p-3 md:p-4 rounded-xl border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all group-hover:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <span className="block font-bold text-gray-900 text-sm md:text-base">Sans Chauffeur</span>
                            <span className="text-[10px] md:text-xs text-gray-500">Vous conduisez</span>
                          </div>
                        </label>
                        <label className="cursor-pointer group">
                          <input 
                            type="radio" 
                            name="driver" 
                            value="avec" 
                            className="peer sr-only" 
                            required
                            aria-required="true"
                          />
                          <div className="p-3 md:p-4 rounded-xl border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all group-hover:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <span className="block font-bold text-gray-900 text-sm md:text-base">Avec Chauffeur</span>
                            <span className="text-[10px] md:text-xs text-gray-500">Service premium</span>
                          </div>
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  {/* Bouton de soumission */}
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1 mt-6 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    aria-busy={false}
                  >
                    Confirmer la réservation
                  </button>
                  <p className="text-center text-[10px] md:text-xs text-gray-400 mt-4">
                    En confirmant, vous acceptez nos{' '}
                    <a href="/conditions" className="text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded">
                      conditions générales
                    </a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Styles CSS pour accessibilité et reduced-motion */}
      <style>{`
        /* Focus visible pour navigation clavier */
        button:focus, input:focus, select:focus, textarea:focus, a:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Désactiver les animations si l'utilisateur préfère moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Styles pour les champs en erreur */
        input[aria-invalid="true"], select[aria-invalid="true"] {
          border-color: #ef4444 !important;
        }
        
        /* Scrollbar personnalisée */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </main>
  );
};

// --- Helpers (avec support microdata optionnel) ---
const SpecItem = ({ icon: Icon, label, value, itemProp }: { icon: any; label: string; value: string | number; itemProp?: string }) => (
  <div className="flex items-center gap-2 md:gap-3">
    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0" aria-hidden="true">
      <Icon size={14} className="md:w-4 md:h-4" />
    </div>
    <div className="min-w-0">
      <div className="text-[9px] md:text-[10px] uppercase text-gray-400 font-bold truncate">{label}</div>
      <div className="text-xs md:text-sm font-bold text-white truncate" {...(itemProp && { itemProp })}>
        {value}
      </div>
    </div>
  </div>
);

const InputGroup = ({ icon: Icon, label, type = "text", placeholder, required = false, id, name, ...props }: any) => (
  <div>
    <label htmlFor={id} className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
      {label} {required && <span className="text-red-500" aria-label="champ requis">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
      <input 
        id={id}
        name={name}
        type={type} 
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-medium"
        {...(required && { 'aria-required': 'true' })}
        {...props}
      />
    </div>
  </div>
);

export default Catalogue;