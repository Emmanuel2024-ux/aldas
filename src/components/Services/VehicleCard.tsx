// src/components/Services/VehicleCard.tsx
import { Link } from 'react-router-dom';
import { Users, DoorOpen, Gauge, Luggage } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CarData {
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
  description?: string; // Nouveau champ optionnel pour la description détaillée
}

interface VehicleCardProps {
  car: CarData;
  variant?: 'slider' | 'grid' | 'list';
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

const VehicleCard = ({ car}: VehicleCardProps) => {

  // --- STYLES DYNAMIQUES ---
  const containerClasses = `relative w-full h-[440px] rounded-[22px] overflow-hidden border-[2.5px] border-white bg-[#15313D] hover:shadow-[0_15px_30px_rgba(0,210,255,0.15)] hover:border-white/70 transition-all duration-500 ease-out`
    
  return (
    <Link 
      to={`/services/catalogue?clcx=${car.code}`}
      className={`block h-full`}
    >
      <article className={containerClasses}>
        
            <div className="absolute top-0 right-0 w-[150%] h-[120%] bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.2)_15%,transparent_40%)] blur-[1px] rotate-[-10deg] pointer-events-none z-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="car-light relative pt-4 ps-4 pe-4 z-0 flex-grow">
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-[15px] pointer-events-none"></div>
                <h5 className="text-[20px] font-extrabold text-white mb-3 relative z-10 drop-shadow-md tracking-wide uppercase opacity-90">{car.brand}</h5>
                <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                  <SpecBadge icon={Users} value={car.seats} />
                  <SpecBadge icon={DoorOpen} value={car.doors} />
                  <SpecBadge icon={Gauge} value={car.transmission === 'A' ? 'Auto' : 'Man'} />
                  <SpecBadge icon={Luggage} value={car.luggage} />
                </div>
                <div className="mt-4 mb-2 relative z-10 flex justify-center items-end h-[240px]">
                  <img src={car.image} alt={car.name} className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2" loading="lazy" />
                </div>
              </div>
              <div className="p-5 mt-auto relative z-10 bg-gradient-to-t from-black/50 to-transparent rounded-b-[20px] border-t border-white/5">
                <h6 className="text-white font-bold text-lg mb-1 truncate drop-shadow-md group-hover:text-[#00d2ff] transition-colors duration-300">{car.name}</h6>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] font-extrabold text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">{formatPrice(car.price)}</span>
                  <span className="text-[10px] text-white/50 font-medium uppercase">/ jour</span>
                </div>
              </div>
            </div>
      </article>
    </Link>
  );
};

// --- Helpers Slider ---
const SpecBadge = ({ icon: Icon, value }: { icon: LucideIcon, value: string | number }) => (
  <span className="text-[12px] text-white/90 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
    <Icon size={14} className="text-white/70" /> {value}
  </span>
);

export default VehicleCard;