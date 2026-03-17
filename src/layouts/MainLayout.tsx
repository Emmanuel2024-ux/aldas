// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'; // <--- C'est la magie ici !
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Toujours affiché */}
      
      <main className="flex-grow">
        {/* Outlet agit comme un "trou" ou un "écran" qui affiche la page actuelle */}
        <Outlet /> 
      </main>
      
      <Footer /> {/* Toujours affiché */}
    </div>
  );
}