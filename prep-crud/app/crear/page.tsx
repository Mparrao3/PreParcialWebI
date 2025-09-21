'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Reutilizamos el mismo tipo
type Author = {
  id?: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
};

export default function CrearAutorPage() {
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
      const res = await fetch('http://127.0.0.1:8080/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error al crear autor');
      await res.json();
      router.push('/authors'); // redirigir a la lista
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Crear Autor</h1>
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          className="w-full border p-2 rounded"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="URL de imagen"
          className="w-full border p-2 rounded"
          value={form.image}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </section>
  );
}
