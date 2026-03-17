import PageHero from '../../components/UI/PageHero';
import ServiceGrid from '../../components/Services/ServiceGrid';
import { servicesData } from '../../data/servicesData';
import { CheckCircle2 } from 'lucide-react';

const Navette = () => {
  // On récupère les données spécifiques à cette page
  const pageData = servicesData['navette'];

  return (
    <div>
      {/* Hero Spécifique au service */}
      <PageHero 
        image={pageData.img}
        title={pageData.title}
        subtitle={pageData.heroHeadline} // Ou un sous-titre plus court
        btnText="Réserver maintenant"
        btnLink="/contact"
      />

      {/* Section Détails du service (Contenu unique) */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir notre flotte ?</h2>
            <p className="text-gray-600 mb-6">{pageData.details}</p>
            <ul className="space-y-3">
              {pageData.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-aldas shrink-0" size={20} />
                  {feat.text}
                </li>
              ))}
            </ul>
          </div>
          <img src={pageData.img} alt={pageData.title} className="rounded-2xl shadow-xl" />
        </div>
      </section>

      {/* Intégration du Grid : Exclura AUTOMATIQUEMENT 'mobilite' */}
      <ServiceGrid title="Découvrez nos autres pôles d'excellence" heroTitle={pageData.heroHeadline}/>
    </div>
  );
};

export default Navette
;