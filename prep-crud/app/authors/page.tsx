'use client';

import { useAuthorsCrud } from '../../hooks/useAuthorsCrud';

export default function AuthorsPage() {
  const { authors, loading, error, deleteAuthor } = useAuthorsCrud();

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lista de Autores</h1>
      {authors.length === 0 && <p>No hay autores aún.</p>}
      <ul className="space-y-3">
        {authors.map((a) => (
          <li
            key={a.id}
            className="border rounded p-4 shadow flex gap-4 items-start"
          >
            {/* Imagen */}
            {a.image && (
              <img
                src={a.image}
                alt={a.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{a.name}</h2>
              <p className="text-sm text-gray-700">{a.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Nacimiento: {a.birthDate}
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href={`/authors/${a.id}/editar`}
                  className="text-blue-600 underline"
                >
                  Editar
                </a>
                <button
                  onClick={() => a.id && deleteAuthor(a.id)}
                  className="text-red-600 underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
