'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DocenteCursosPage() {
  const [asignaturas, setAsignaturas] = useState<string[]>([]);
  const [nueva, setNueva] = useState('');
  const router = useRouter();

  useEffect(() => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;
    fetch(`http://localhost:3001/api/docentes/docente/${rut}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setAsignaturas(data.asignaturas ? data.asignaturas.split(',') : []))
      .catch(() => setAsignaturas([]));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nueva.trim()) return;
    setAsignaturas([...asignaturas, nueva.trim()]);
    setNueva('');
  };

  const handleLogout = () => {
    localStorage.removeItem('rut');
    localStorage.removeItem('userType');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <div className="flex gap-4 mb-6">
        <Link href="/" className="text-green-600 underline">Inicio</Link>
        <button onClick={handleLogout} className="text-green-600 underline">Cerrar sesión</button>
      </div>
      <div className="bg-green-100 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">Cursos</h1>
        {asignaturas.length > 0 ? (
          asignaturas.map((a, idx) => (
            <p key={idx} className="mb-2 text-green-900"><span className="font-medium">Curso:</span> {a}</p>
          ))
        ) : (
          <p className="text-gray-700">No hay cursos registrados.</p>
        )}

        <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Curso"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            className="p-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-500 text-gray-900"
          />
          <button type="submit" className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">Agregar curso</button>
        </form>
      </div>
    </main>
  );
}