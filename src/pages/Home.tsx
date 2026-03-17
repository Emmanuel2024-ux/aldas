// src/pages/Home.tsx
import ContactFormSplit from '../components/Contact/ContactFormSplit';
import HeroSlider from '../components/Home/HeroSlider';
import VehicleShowcase from '../components/Services/VehicleShowcase';
import PartnersSlider from '../components/UI/PartnersSlider';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* 1. Le Slider Héro (Uniquement sur la page d'accueil) */}
      <HeroSlider />

      {/* 2. Section Engagements (Exemple rapide pour remplir) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-aldas-dark mb-4">Pourquoi choisir ÁLDÁS ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Excellence, discrétion et réactivité sont au cœur de notre métier.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Flotte Premium", desc: "Des véhicules récents et entretenus." },
              { title: "Chauffeurs Experts", desc: "Professionnels, courtois et formés." },
              { title: "Disponibilité 24/7", desc: "Un service client toujours joignable." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-aldas mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <VehicleShowcase />
      <div className="relative z-40 -mt-20">
        <ContactFormSplit 
          title="Une demande exclusive ?"
          subtitle="Parlez-nous de votre projet"
          backgroundImage="https://www.africaguestservices.com/img/agency/portfolio/carousel/AdobeStock_78477370.jpeg"
        />
      </div>
      <PartnersSlider />
    </div>
  );
};

export default Home;