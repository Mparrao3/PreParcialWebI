'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthorsCrud, type Author } from '../../../../hooks/useAuthorsCrud';

export default function EditarAutorPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, updateAuthor, authors, loading: authorsLoading } = useAuthorsCrud();
  const [form, setForm] = useState<Author>({
    name: '',
    description: '',
    birthDate: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    
    if (!authorsLoading && authors.length > 0 && id) {
      const author = getById(Number(id));
      if (author) {
        setForm(author);
        setLoading(false);
      } else {
        setError('Autor no encontrado');
        setLoading(false);
      }
    } else if (!authorsLoading && authors.length === 0) {
      
      setError('No hay autores disponibles');
      setLoading(false);
    }
  }, [id, getById, authors, authorsLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAuthor(Number(id), form);
      router.push('/authors');
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading || authorsLoading) return (
    <p className="p-6" role="status" aria-live="polite">
      Cargando...
    </p>
  );
  
  if (error) return (
    <div className="p-6" role="alert" aria-live="assertive">
      <p className="text-red-600 p-3 bg-red-50 border border-red-200 rounded">
        <strong>Error:</strong> {error}
      </p>
    </div>
  );

  return (
    <section className="p-6 max-w-xl">
      <h1 id="page-title" className="text-2xl font-bold mb-4">Editar Autor</h1>
      {error && (
        <div 
          role="alert" 
          aria-live="polite"
          className="text-red-600 mb-4 p-3 bg-red-50 border border-red-200 rounded"
          id="form-error"
        >
          <strong>Error:</strong> {error}
        </div>
      )}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        aria-labelledby="page-title"
        noValidate
      >
        <div>
          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del autor *
          </label>
          <input
            id="edit-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
          <textarea
            id="edit-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="edit-birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de nacimiento *
          </label>
          <input
            id="edit-birthDate"
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-1">
            URL de imagen (opcional)
          </label>
          <input
            id="edit-image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-describedby={error ? "form-error" : undefined}
        >
          Actualizar Autor
        </button>
      </form>
    </section>
  );
}
