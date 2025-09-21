'use client';

import { useEffect, useState } from 'react';

export type Author = {
  id?: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
};

export function useAuthorsCrud() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const BASE = 'http://127.0.0.1:8080/api/authors';


  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE);
      if (!res.ok) throw new Error('Error al obtener autores');
      const data: Author[] = await res.json();
      setAuthors(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

 
  const createAuthor = async (a: Author) => {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a),
    });
    if (!res.ok) throw new Error('Error al crear autor');
    await fetchAuthors();
  };


  const updateAuthor = async (id: number, a: Author) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a),
    });
    if (!res.ok) throw new Error('Error al actualizar autor');
    await fetchAuthors();
  };


  const deleteAuthor = async (id: number) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar autor');
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };


  const getById = (id: number) => authors.find((a) => a.id === id);


  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    loading,
    error,
    fetchAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getById,
  };
}
