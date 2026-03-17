// src/components/Footer/FooterData.ts

export const footerData = {
  brand: {
    name: "ÁLDÁS",
    logo: "/images/icon.jpg", // Assure-toi de mettre ton image dans le dossier public/images
    description: "ÁLDÁS met à votre disposition quatre pôles d’excellence : Location de voiture, Service de Navette, Événementiel et Conciergerie haut de gamme. Pour chaque besoin, nous offrons un accompagnement précis, discret et orienté excellence.",
    developedBy: "ÁLDÁS IT"
  },
  contacts: {
    phone: "+225 07 49 22 98 74",
    whatsappNumber: "2250747265693",
    email: "contact@aldas-ci.com",
    address: {
      street: "Rue E22",
      city: "Cocody – Riviera Ciad",
      country: "Côte d’Ivoire",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63561.5979902716!2d-4.0216612815857085!3d5.32493555824972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed003087fa37%3A0x5a8dae7e21d7003a!2sMaison%20Ciad!5e0!3m2!1sfr!2sci!4v1749592464538!5m2!1sfr!2sci"
    }
  },
  services: [
    { label: "Location de voiture", icon: "car-front", href: "/services/mobilite" },
    { label: "Service de navette", icon: "people", href: "/services/navette" },
    { label: "Agence événementielle", icon: "stars", href: "/services/evenements" },
    { label: "Conciergerie haut de gamme", icon: "gem", href: "/services/conciergerie" },
  ],
  socials: [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
  ]
};