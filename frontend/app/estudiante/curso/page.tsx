'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Curso {
  nombre: string;
  promedio: number;
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nuevo, setNuevo] = useState({ nombre: '', promedio: '' });
  const router = useRouter();

  useEffect(() => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;
    fetch(`http://localhost:3001/api/alumnos/${rut}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setCursos(data.cursos || []))
      .catch(() => setCursos([]));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.promedio) return;
    setCursos([...cursos, { nombre: nuevo.nombre, promedio: parseFloat(nuevo.promedio) }]);
    setNuevo({ nombre: '', promedio: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('rut');
    localStorage.removeItem('userType');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <div className="flex gap-4 mb-6">
        <Link href="/" className="text-blue-600 underline">Inicio</Link>
        <button onClick={handleLogout} className="text-blue-600 underline">Cerrar sesión</button>
      </div>
      <div className="bg-blue-100 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Cursos</h1>
        {cursos.length > 0 ? (
          cursos.map((curso, idx) => (
            <div key={idx} className="mb-3 text-blue-900">
               <p><span className="font-medium">Curso:</span> {curso.nombre}</p>
              <p><span className="font-medium">Promedio:</span> {curso.promedio}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No hay cursos registrados.</p>
        )}

        <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Curso"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            className="p-2 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Promedio"
            value={nuevo.promedio}
            onChange={(e) => setNuevo({ ...nuevo, promedio: e.target.value })}
            className="p-2 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Agregar curso</button>
        </form>
      </div>
    </main>
  );
}