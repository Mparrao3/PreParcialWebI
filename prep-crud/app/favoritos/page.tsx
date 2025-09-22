'use client';
import { useAuthorsCrud } from '../../hooks/useAuthorsCrud';

export default function FavoritosPage() {
  const { authors, isFavorite, toggleFavorite } = useAuthorsCrud();
  const favAuthors = authors.filter((a) => a.id && isFavorite(a.id));

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-yellow-500">★</span>
        Autores Favoritos ({favAuthors.length})
      </h1>
      
      {favAuthors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No hay favoritos aún.</p>
          <p className="text-gray-400 text-sm mt-2">
            Ve a la <a href="/authors" className="text-blue-500 hover:underline">lista de autores</a> y marca algunos como favoritos.
          </p>
        </div>
      )}
      
      <ul className="space-y-3">
        {favAuthors.map((a) => (
          <li key={a.id} className="border rounded p-4 shadow flex gap-4">
            {a.image && <img src={a.image} alt={a.name} className="w-24 h-24 object-cover rounded" />}
            <div className="flex-1">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <span className="text-yellow-500">★</span>
                {a.name}
                <button
                  onClick={() => a.id && toggleFavorite(a.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-full text-sm font-medium hover:bg-red-200 transition-all duration-200"
                  title="Quitar de favoritos"
                >
                  Quitar ✕
                </button>
              </h2>
              <p className="text-gray-600 mt-1">{a.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Fecha de nacimiento:</strong> {a.birthDate}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
