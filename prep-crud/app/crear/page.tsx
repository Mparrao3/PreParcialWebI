'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthorsCrud, type Author } from '../../hooks/useAuthorsCrud';

export default function CrearAutorPage() {
  const { createAuthor } = useAuthorsCrud();
  const [form, setForm] = useState<Author>({
    name: '',
    description: '',
    birthDate: '',
    image: '',
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAuthor(form);
      router.push('/authors'); 
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="p-6 max-w-xl">
      <h1 id="page-title" className="text-2xl font-bold mb-4">Crear Autor</h1>
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del autor *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ej: Gabriel García Márquez"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripcion"
            className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.description}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de nacimiento *
          </label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.birthDate}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            URL de imagen (opcional)
          </label>
          <input
            id="image"
            name="image"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.image}
            onChange={handleChange}
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-describedby={error ? "form-error" : undefined}
        >
          Crear Autor
        </button>
      </form>
    </section>
  );
}
