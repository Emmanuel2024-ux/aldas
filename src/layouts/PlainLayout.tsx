// src/layouts/PlainLayout.tsx
import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';

// ✅ Interface pour les props
interface PlainLayoutProps {
  children?: ReactNode;
}

export default function PlainLayout({ children }: PlainLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Contenu Principal */}
      <main className="flex-grow">
        {/* ✅ Priorité : children si passé, sinon Outlet pour le routing */}
        {children || <Outlet />}
      </main>

      {/* Footer Minimaliste (Copyright uniquement) */}
      <footer className="w-full py-8 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {currentYear} <span className="text-gray-900 font-bold">ÁLDÁS Conciergerie</span>. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Excellence • Discrétion • Disponibilité
          </p>
        </div>
      </footer>
    </div>
  );
}