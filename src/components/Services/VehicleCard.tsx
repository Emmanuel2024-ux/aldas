// src/components/Services/VehicleCard.tsx
import { Link } from 'react-router-dom';
import { Users, DoorOpen, Gauge, Luggage } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo } from 'react';

// --- TYPES ---
export interface CarData {
  id: number | string;
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

export interface VehicleCardProps {
  car: CarData;
  variant?: 'slider' | 'grid' | 'list';
  className?: string;
  /** Label ARIA personnalisé pour le lien (accessibilité) */
  ariaLabel?: string;
  /** Props supplémentaires pour microdata Schema.org */
  itemProp?: string;
}

// --- HELPERS ---
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

const getTransmissionLabel = (transmission: 'A' | 'M'): string => {
  return transmission === 'A' ? 'Automatique' : 'Manuelle';
};

// Composant Badge avec support microdata
const SpecBadge = ({ 
  icon: Icon, 
  value, 
  label,
  itemProp 
}: { 
  icon: LucideIcon; 
  value: string | number; 
  label?: string;
  itemProp?: string;
}) => (
  <span 
    className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5"
    {...(itemProp && { itemProp })}
  >
    <Icon size={14} className="text-white/70" aria-hidden="true" /> 
    <span {...(label && { 'aria-label': label })}>{value}</span>
  </span>
);

const VehicleCard = ({ 
  car, 
  variant = 'grid', 
  className = '',
  ariaLabel,
  itemProp
}: VehicleCardProps) => {

  // ✅ Mémoïsation des valeurs pour performance
  const {
    formattedPrice,
    transmissionLabel,
    carUrl,
    imageUrl,
    altText,
    linkAriaLabel
  } = useMemo(() => {
    return {
      formattedPrice: formatPrice(car.price),
      transmissionLabel: getTransmissionLabel(car.transmission),
      carUrl: `/services/catalogue?clcx=${car.code}`,
      imageUrl: car.image.startsWith('/') ? car.image : `/${car.image}`,
      altText: `${car.brand} ${car.name} - Véhicule de location premium à Abidjan, ${car.seats} places, boîte ${getTransmissionLabel(car.transmission)}`,
      linkAriaLabel: ariaLabel || `Réserver ${car.brand} ${car.name} à ${formatPrice(car.price)} par jour - ${car.seats} places, ${car.doors} portes, boîte ${getTransmissionLabel(car.transmission)}`
    };
  }, [car, ariaLabel]);

  // ✅ Classes CSS dynamiques selon la variante
  const containerClasses = useMemo(() => {
    const base = `relative w-full h-[440px] rounded-[22px] overflow-hidden border-[2.5px] border-white bg-[#15313D] hover:shadow-[0_15px_30px_rgba(0,210,255,0.15)] hover:border-white/70 transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 focus-within:ring-offset-[#15313D]`;
    const variants = {
      slider: 'w-[300px] flex-shrink-0',
      grid: '',
      list: 'h-auto flex flex-row'
    };
    return `${base} ${variants[variant]} ${className}`.trim();
  }, [variant, className]);

  return (
    // ✅ Article sémantique avec microdata Schema.org
    <article 
      className={containerClasses}
      role="article"
      {...(itemProp && { itemProp })}
      itemScope
      itemType="https://schema.org/Car"
    >
      {/* ✅ Meta Schema.org pour le véhicule */}
      <meta itemProp="name" content={`${car.brand} ${car.name}`} />
      <meta itemProp="brand" content={car.brand} />
      <meta itemProp="model" content={car.name} />
      <meta itemProp="price" content={car.price.toString()} />
      <meta itemProp="priceCurrency" content="XOF" />
      <meta itemProp="seatingCapacity" content={car.seats.toString()} />
      <meta itemProp="numberOfDoors" content={car.doors.toString()} />
      <meta itemProp="fuelType" content={car.fuelType || 'Essence'} />
      <meta itemProp="vehicleTransmission" content={car.transmission === 'A' ? 'Automatic' : 'Manual'} />
      <meta itemProp="cargoVolume" content={`${car.luggage} bagages`} />
      <meta itemProp="vehicleSpecialUsage" content="Rental" />
      <link itemProp="url" href={`https://www.aldas-ci.com${carUrl}`} />
      <link itemProp="image" href={`https://www.aldas-ci.com${imageUrl}`} />
      
      {/* ✅ Lien accessible vers la page de réservation */}
      <Link 
        to={carUrl}
        className="block h-full focus:outline-none"
        aria-label={linkAriaLabel}
        title={`Réserver ${car.brand} ${car.name} - ${formattedPrice}/jour`}
      >
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Section supérieure : Image + Spécifications */}
          <div className="car-light relative pt-4 ps-4 pe-4 z-0 flex-grow">
            
            {/* Effet de lumière décoratif - aria-hidden */}
            <div 
              className="absolute top-0 right-0 w-[150%] h-[120%] bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.2)_15%,transparent_40%)] blur-[1px] rotate-[-10deg] pointer-events-none z-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              aria-hidden="true"
            />
            
            {/* Ombre sous le véhicule - décorative */}
            <div 
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-[15px] pointer-events-none"
              aria-hidden="true"
            />
            
            {/* Marque du véhicule */}
            <h5 
              className="text-[20px] font-extrabold text-white mb-3 relative z-10 drop-shadow-md tracking-wide uppercase opacity-90"
              itemProp="brand"
            >
              {car.brand}
            </h5>
            
            {/* Spécifications techniques avec microdata */}
            <div className="flex flex-wrap gap-2 mt-2 relative z-10" role="list" aria-label={`Spécifications de ${car.brand} ${car.name}`}>
              <SpecBadge 
                icon={Users} 
                value={car.seats} 
                label={`${car.seats} passagers`}
                itemProp="seatingCapacity"
              />
              <SpecBadge 
                icon={DoorOpen} 
                value={car.doors} 
                label={`${car.doors} portes`}
                itemProp="numberOfDoors"
              />
              <SpecBadge 
                icon={Gauge} 
                value={car.transmission === 'A' ? 'Auto' : 'Man'} 
                label={`Boîte ${transmissionLabel}`}
                itemProp="vehicleTransmission"
              />
              <SpecBadge 
                icon={Luggage} 
                value={car.luggage} 
                label={`${car.luggage} bagages`}
                itemProp="cargoVolume"
              />
            </div>
            
            {/* Image du véhicule - optimisée SEO */}
            <div className="mt-4 mb-2 relative z-10 flex justify-center items-end h-[240px]">
              <img 
                src={imageUrl} 
                alt={altText}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 focus:scale-105 focus:-translate-y-2"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                itemProp="image"
              />
            </div>
          </div>
          
          {/* Section inférieure : Nom + Prix */}
          <div className="p-5 mt-auto relative z-10 bg-gradient-to-t from-black/50 to-transparent rounded-b-[20px] border-t border-white/5">
            <h6 
              className="text-white font-bold text-lg mb-1 truncate drop-shadow-md group-hover:text-[#00d2ff] transition-colors duration-300"
              itemProp="name"
            >
              {car.name}
            </h6>
            <div className="flex items-baseline gap-1">
              <span 
                className="text-[18px] font-extrabold text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="price" content={car.price.toString()} />
                <meta itemProp="priceCurrency" content="XOF" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                {formattedPrice}
              </span>
              <span className="text-[10px] text-white/50 font-medium uppercase" aria-label="par jour">/ jour</span>
            </div>
          </div>
        </div>
        
        {/* ✅ Overlay au focus pour accessibilité clavier */}
        <span className="sr-only" aria-live="polite">
          {car.brand} {car.name}, {formattedPrice} par jour, {car.seats} places
        </span>
      </Link>
    </article>
  );
};

export default VehicleCard;