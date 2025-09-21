import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BookStore - Autores',
  icons: {
    icon: 'prep-crud\app\favicon-16x16.png',
  },
  description: 'Aplicación CRUD de Autores con Next.js y TypeScript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-blue-600 text-white p-4 flex gap-4">
          <a href="/authors" className="font-semibold hover:underline">
            Autores
          </a>
          <a href="/crear" className="font-semibold hover:underline">
            Crear
          </a>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
