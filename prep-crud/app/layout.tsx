import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Autores y Favoritos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <header className="bg-blue-600 text-white p-4">
          <nav role="navigation" aria-label="Navegación principal">
            <ul className="flex gap-4 list-none">
              <li>
                <a 
                  href="/authors" 
                  className="font-semibold hover:underline focus:ring-2 focus:ring-white focus:outline-none rounded px-2 py-1"
                  aria-label="Ver lista de autores"
                >
                  Autores
                </a>
              </li>
              <li>
                <a 
                  href="/crear" 
                  className="font-semibold hover:underline focus:ring-2 focus:ring-white focus:outline-none rounded px-2 py-1"
                  aria-label="Crear nuevo autor"
                >
                  Crear
                </a>
              </li>
              <li>
                <a 
                  href="/favoritos" 
                  className="font-semibold hover:underline focus:ring-2 focus:ring-white focus:outline-none rounded px-2 py-1"
                  aria-label="Ver autores favoritos"
                >
                  Favoritos
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main role="main" id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
