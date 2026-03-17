// src/pages/services/Catalogue.tsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Gauge, Users, Briefcase, Zap, 
  ArrowRight
} from 'lucide-react';
import { carsData, getUniqueBrands, getUniqueCategories } from '../../data/carsData';

const Catalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const brands = useMemo(() => getUniqueBrands(carsData), []);
  const categories = useMemo(() => getUniqueCategories(carsData), []);

  // Logique de filtrage et de tri
  const filteredCars = useMemo(() => {
    return carsData
      .filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              car.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
        const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
        const matchesPrice = car.price <= maxPrice;
        return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [searchTerm, selectedBrand, selectedCategory, maxPrice, sortBy]);

  // Formatteur de prix (FCFA)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      {/* --- 2. BARRE DE FILTRES & RECHERCHE --- */}
      <div id="catalogue-grid" className="sticky top-[112px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Recherche */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher un modèle (ex: Classe S, GLE...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-aldas focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            {/* Filtres Desktop */}
            <div className="hidden lg:flex gap-3 items-center">
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-aldas cursor-pointer hover:border-aldas transition-colors"
              >
                <option value="All">Toutes les marques</option>
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>

              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-aldas cursor-pointer hover:border-aldas transition-colors"
              >
                <option value="All">Toutes catégories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-aldas cursor-pointer hover:border-aldas transition-colors"
              >
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>

            {/* Bouton Filtre Mobile */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-bold text-sm"
            >
              <Filter size={18} />
              Filtres
            </button>
          </div>

          {/* Panneau Filtres Mobile */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4 animate-fade-in-down">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Marque</label>
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 bg-white">
                  <option value="All">Toutes</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Catégorie</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 bg-white">
                  <option value="All">Toutes</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Prix Max: {formatPrice(maxPrice)}</label>
                <input type="range" min="50000" max="2000000" step="50000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-aldas" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Trier par</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="w-full p-2.5 rounded-lg border border-gray-200 bg-white">
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- 3. GRILLE DES VÉHICULES (SHOWROOM) --- */}
      <section className="py-12 container mx-auto px-4">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Véhicules Disponibles</h2>
            <p className="text-gray-500 text-sm mt-1">{filteredCars.length} résultats trouvés</p>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCars.map((car) => (
              <div 
                key={car.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-aldas/10 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col"
                data-aos="fade-up"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=Véhicule'; }}
                  />
                  {/* Badge Catégorie */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {car.category}
                  </span>
                  {/* Badge Prix */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <p className="text-white font-bold text-lg">{formatPrice(car.price)}<span className="text-xs font-normal text-gray-300 block">/ jour</span></p>
                  </div>
                </div>

                {/* Contenu Carte */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <p className="text-xs font-bold text-aldas uppercase tracking-widest mb-1">{car.brand}</p>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{car.name}</h3>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span>{car.seats} Places</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-gray-400" />
                      <span>{car.luggage} Valises</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-gray-400" />
                      <span>{car.transmission === 'A' ? 'Auto' : 'Manuelle'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge size={16} className="text-gray-400" />
                      <span>{car.doors} Portes</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    to={`/contact?vehicle=${car.code}`}
                    className="mt-auto w-full py-3 bg-gray-900 hover:bg-aldas text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-aldas/30 flex items-center justify-center gap-2 group-hover:gap-3"
                  >
                    Réserver ce véhicule
                    <ArrowRight size={18} className="transform transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
            <button onClick={() => {setSelectedBrand('All'); setSearchTerm(''); setMaxPrice(2000000);}} className="mt-6 text-aldas font-bold hover:underline">Réinitialiser les filtres</button>
          </div>
        )}
      </section>

    </div>
  );
};

export default Catalogue;