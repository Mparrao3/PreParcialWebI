'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Author = {
  id?: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
};

export default function EditarAutorPage() {
  const { id } = useParams<{ id: string }>();
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
    async function fetchAuthor() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`);
        if (!res.ok) throw new Error('Error al cargar autor');
        const data: Author = await res.json();
        setForm(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAuthor();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error al actualizar autor');
      await res.json();
      router.push('/authors');
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <section className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Editar Autor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Actualizar
        </button>
      </form>
    </section>
  );
}
