// src/data/carsData.ts

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  seats: number;
  doors: number;
  transmission: 'A' | 'M'; // A = Auto, M = Manuelle
  luggage: number;
  price: number; // Prix par jour en FCFA
  code: string;
  category?: 'Luxe' | 'SUV' | 'Berline' | 'Van' | 'Eco'; // Ajouté pour le filtrage avancé
}

export const carsData: Car[] = [
  // MERCEDES
  { id: '1', name: 'S550', brand: 'Mercedes', image: '/images/catalogue/mercedes_s550.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 450000, code: 'A1B2', category: 'Luxe' },
  { id: '2', name: 'Classe S 350 d Limousine AMG', brand: 'Mercedes', image: '/images/catalogue/mercedes_s350d_amg.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 1200000, code: 'S350D', category: 'Luxe' },
  { id: '3', name: 'Classe S 580 e Hybrid EQ 4MATIC', brand: 'Mercedes', image: '/images/catalogue/mercedes_s580e_amg.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 1400000, code: 'S580E', category: 'Luxe' },
  { id: '4', name: 'E350', brand: 'Mercedes', image: '/images/catalogue/mercedes_e350.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 300000, code: 'C4D5', category: 'Berline' },
  { id: '5', name: 'E220', brand: 'Mercedes', image: '/images/catalogue/mercedes_e220.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 250000, code: 'E6F7', category: 'Berline' },
  { id: '6', name: 'C300', brand: 'Mercedes', image: '/images/catalogue/mercedes_c3000.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 250000, code: 'A3F9', category: 'Berline' },
  { id: '7', name: 'GLE', brand: 'Mercedes', image: '/images/catalogue/mercedes_gle.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 300000, code: 'D9E3', category: 'SUV' },
  { id: '8', name: 'GLC', brand: 'Mercedes', image: '/images/catalogue/mercedes_glc.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 300000, code: 'F1A4', category: 'SUV' },
  { id: '9', name: 'Viano 4 places', brand: 'Mercedes', image: '/images/catalogue/mercedes_Viano_Sprinter_4_places.png', seats: 4, doors: 4, transmission: 'A', luggage: 4, price: 400000, code: '9B2C', category: 'Van' },
  { id: '10', name: 'Viano 6 places', brand: 'Mercedes', image: '/images/catalogue/mercedes_Viano_Sprinter_6_places.png', seats: 6, doors: 4, transmission: 'A', luggage: 6, price: 350000, code: '7D4E', category: 'Van' },
  { id: '11', name: 'Viano Sprinter 9 places', brand: 'Mercedes', image: '/images/catalogue/mercedes_Viano_Sprinter_9_places.png', seats: 9, doors: 4, transmission: 'A', luggage: 9, price: 800000, code: '5F8A', category: 'Van' },

  // ROLLS-ROYCE
  { id: '12', name: 'Rolls-Royce', brand: 'Rolls-Royce', image: '/images/catalogue/rolls_royce.png', seats: 4, doors: 4, transmission: 'A', luggage: 3, price: 1750000, code: 'RR01', category: 'Luxe' },

  // RANGE ROVER
  { id: '13', name: 'Vogue', brand: 'Range Rover', image: '/images/catalogue/range_rover_vogue.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 400000, code: '6A3F', category: 'SUV' },
  { id: '14', name: 'Velar', brand: 'Range Rover', image: '/images/catalogue/range_rover_velar.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 400000, code: '3E7B', category: 'SUV' },

  // CADILLAC
  { id: '15', name: 'Escalade', brand: 'Cadillac', image: '/images/catalogue/cadillac_escalade.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 450000, code: '9F4D', category: 'SUV' },
  { id: '16', name: 'G-Wagon', brand: 'Mercedes', image: '/images/catalogue/cadillac_g_wagon.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 700000, code: 'AF72', category: 'SUV' }, // Corrigé brand si c'est un G-Wagon

  // INFINITY
  { id: '17', name: 'QX80', brand: 'Infiniti', image: '/images/catalogue/infinite_qx80.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 250000, code: 'B9D1', category: 'SUV' },

  // BMW
  { id: '18', name: 'X7', brand: 'BMW', image: '/images/catalogue/bmw_x7.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 200000, code: 'C8E4', category: 'SUV' },
  { id: '19', name: 'X6', brand: 'BMW', image: '/images/catalogue/bmw_x6.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 200000, code: 'D3B2', category: 'SUV' },
  { id: '20', name: 'X4', brand: 'BMW', image: '/images/catalogue/bmw_x4.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 160000, code: 'E2F6', category: 'SUV' },

  // AUDI
  { id: '21', name: 'Q5', brand: 'Audi', image: '/images/catalogue/audi_q5.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 130000, code: 'F4A8', category: 'SUV' },
  { id: '22', name: 'Q7', brand: 'Audi', image: '/images/catalogue/audi_q7.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 160000, code: '8B5C', category: 'SUV' },

  // HYUNDAI
  { id: '23', name: 'Palissade', brand: 'Hyundai', image: '/images/catalogue/hyndai_pallissade.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 160000, code: '7C3E', category: 'SUV' },
  { id: '24', name: 'Santafé', brand: 'Hyundai', image: '/images/catalogue/hyndai_santafe.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '5E9A', category: 'SUV' },
  { id: '25', name: 'Tucson', brand: 'Hyundai', image: '/images/catalogue/hyndai_tucson.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '4D1F', category: 'SUV' },
  { id: '26', name: 'Sonata', brand: 'Hyundai', image: '/images/catalogue/hyndai_sonata.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 60000, code: '3C7B', category: 'Berline' },
  { id: '27', name: 'Elantra', brand: 'Hyundai', image: '/images/catalogue/hyndai_elantra.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 60000, code: '2A5D', category: 'Berline' },

  // TOYOTA
  { id: '28', name: 'Van H1', brand: 'Toyota', image: '/images/catalogue/toyota_van_h1.png', seats: 12, doors: 4, transmission: 'A', luggage: 12, price: 90000, code: '1F9C', category: 'Van' },
  { id: '29', name: 'Land Cruiser V8', brand: 'Toyota', image: '/images/catalogue/toyota_land_cruiser_v8.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 450000, code: '9E4B', category: 'SUV' },
  { id: '30', name: 'Land Cruiser V6', brand: 'Toyota', image: '/images/catalogue/toyota_land_cruiser_v6.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 250000, code: '8C2D', category: 'SUV' },
  { id: '31', name: 'Prado V6', brand: 'Toyota', image: '/images/catalogue/toyota_prado_v6.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 200000, code: '7A8F', category: 'SUV' },
  { id: '32', name: 'Fortuner', brand: 'Toyota', image: '/images/catalogue/toyota_fortuner.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 180000, code: '6D3E', category: 'SUV' },
  { id: '33', name: '4Runner', brand: 'Toyota', image: '/images/catalogue/toyota_4runner.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 180000, code: '5C7A', category: 'SUV' },
  { id: '34', name: 'Rav 4', brand: 'Toyota', image: '/images/catalogue/toyota_rav4.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 150000, code: '4E5C', category: 'SUV' },
  { id: '35', name: 'Belta', brand: 'Toyota', image: '/images/catalogue/toyota_belta.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '3F9A', category: 'Eco' },

  // NISSAN
  { id: '36', name: 'Kicks', brand: 'Nissan', image: '/images/catalogue/nissan_kicks.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 65000, code: '2D8C', category: 'Eco' },
  { id: '37', name: 'Quaskaï', brand: 'Nissan', image: '/images/catalogue/nissan_quaskai.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '1C3F', category: 'SUV' },
  { id: '38', name: 'Patrol Platinium', brand: 'Nissan', image: '/images/catalogue/nissan_patrol_platinum.png', seats: 7, doors: 4, transmission: 'A', luggage: 6, price: 400000, code: '0A7B', category: 'SUV' },

  // MITSUBISHI
  { id: '39', name: 'Éclipse', brand: 'Mitsubishi', image: '/images/catalogue/mitsubishi_eclipse.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 60000, code: 'F123', category: 'Eco' },
  { id: '40', name: 'L200', brand: 'Mitsubishi', image: '/images/catalogue/mitsubishi_l200.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 75000, code: 'E45A', category: 'SUV' },

  // SUZUKI
  { id: '41', name: 'Ciaz', brand: 'Suzuki', image: '/images/catalogue/suzuki_ciaz.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 70000, code: 'D39E', category: 'Eco' },
  { id: '42', name: 'Vitara', brand: 'Suzuki', image: '/images/catalogue/suzuki_vitara.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 70000, code: 'C6A1', category: 'SUV' },
  { id: '43', name: 'Grand Vitara', brand: 'Suzuki', image: '/images/catalogue/suzuki_gd_vitara.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: 'B5F2', category: 'SUV' },

  // KIA
  { id: '44', name: 'Seltos', brand: 'Kia', image: '/images/catalogue/kia_seltos.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 100000, code: 'A8C3', category: 'SUV' },
  { id: '45', name: 'Telluride', brand: 'Kia', image: '/images/catalogue/kia_telluride.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 100000, code: '9B7E', category: 'SUV' },
  { id: '46', name: 'Sportage', brand: 'Kia', image: '/images/catalogue/kia_sportage.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 100000, code: '8D2A', category: 'SUV' },

  // MAZDA
  { id: '47', name: 'CX-5', brand: 'Mazda', image: '/images/catalogue/mazda_cx5.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '7F6C', category: 'SUV' },
  { id: '48', name: 'CX-7', brand: 'Mazda', image: '/images/catalogue/mazda_cx7.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 100000, code: '6A9F', category: 'SUV' },

  // DACIA
  { id: '49', name: 'Sandéro', brand: 'Dacia', image: '/images/catalogue/dacia_sandero.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 50000, code: '5B4E', category: 'Eco' },

  // PEUGEOT
  { id: '50', name: '3008', brand: 'Peugeot', image: '/images/catalogue/peugeot_3008.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 90000, code: '4C7B', category: 'SUV' },
  { id: '51', name: '2008', brand: 'Peugeot', image: '/images/catalogue/peugeot_2008.png', seats: 5, doors: 4, transmission: 'A', luggage: 4, price: 80000, code: '3A5C', category: 'SUV' },
];

// Helper pour extraire les marques uniques
export const getUniqueBrands = (cars: Car[]) => {
  return Array.from(new Set(cars.map(c => c.brand))).sort();
};

// Helper pour extraire les catégories uniques
export const getUniqueCategories = (cars: Car[]) => {
  return Array.from(new Set(cars.map(c => c.category).filter(Boolean))).sort() as string[];
};