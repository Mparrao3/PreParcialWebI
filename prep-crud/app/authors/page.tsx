'use client';
import { useAuthorsCrud } from '../../hooks/useAuthorsCrud';

export default function AuthorsPage() {
  const { authors, toggleFavorite, isFavorite, deleteAuthor } = useAuthorsCrud();

  return (
    <section className="p-6 space-y-4" aria-labelledby="authors-heading">
      <h1 id="authors-heading" className="text-2xl font-bold">Lista de Autores</h1>
      
      {authors.length === 0 ? (
        <p role="status" aria-live="polite" className="text-gray-500">
          No hay autores disponibles.
        </p>
      ) : (
        <ul className="space-y-3" role="list" aria-label={`Lista de ${authors.length} autores`}>
          {authors.map((a) => (
            <li key={a.id} className="border rounded p-4 shadow flex gap-4" role="listitem">
              {a.image && (
                <img 
                  src={a.image} 
                  alt={`Foto de ${a.name}`} 
                  className="w-24 h-24 object-cover rounded"
                  loading="lazy"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {a.name}
                  <button
                    onClick={() => a.id && toggleFavorite(a.id)}
                    aria-pressed={a.id ? isFavorite(a.id) : false}
                    aria-label={a.id && isFavorite(a.id) ? `Quitar ${a.name} de favoritos` : `Marcar ${a.name} como favorito`}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 
                      ${a.id && isFavorite(a.id) 
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:text-yellow-600'
                      }
                    `}
                    title={a.id && isFavorite(a.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    {a.id && isFavorite(a.id) ? (
                      <>
                        <span className="text-yellow-500">★</span> Favorito
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400">☆</span> Favorito
                      </>
                    )}
                  </button>
                </h2>
                <p className="text-gray-600 mb-3">{a.description}</p>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-3" role="group" aria-label={`Acciones para ${a.name}`}>
                  <a
                    href={`/authors/${a.id}/editar`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded text-sm font-medium hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    aria-label={`Editar información de ${a.name}`}
                    role="button"
                  >
                     Editar
                  </a>
                  
                  <button
                    onClick={() => {
                      if (a.id && confirm(`¿Estás seguro de que quieres eliminar a ${a.name}?`)) {
                        deleteAuthor(a.id);
                      }
                    }}
                    className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded text-sm font-medium hover:bg-red-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    aria-label={`Eliminar a ${a.name} de la lista de autores`}
                    disabled={!a.id}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
