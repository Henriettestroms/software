'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Curso {
  nombre: string;
  promedio: number | null;
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [disponibles, setDisponibles] = useState<string[]>([]);
  const [seleccion, setSeleccion] = useState('');
  const router = useRouter();

  useEffect(() => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;
    const key = `subscriptions_${rut}`;
    setCursos(JSON.parse(localStorage.getItem(key) || '[]'));
    setDisponibles(JSON.parse(localStorage.getItem('availableCourses') || '[]'));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const rut = localStorage.getItem('rut');
    if (!rut || !seleccion) return;
    const key = `subscriptions_${rut}`;
    const updated = [...cursos, { nombre: seleccion, promedio: null }];
    setCursos(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setSeleccion('');
  };

  const handleRemove = (curso: string) => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;
    const key = `subscriptions_${rut}`;
    const updated = cursos.filter(c => c.nombre !== curso);
    setCursos(updated);
    localStorage.setItem(key, JSON.stringify(updated));
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
              <div className="flex items-center justify-between">
                <p><span className="font-medium">Curso:</span> {curso.nombre}</p>
                <button onClick={() => handleRemove(curso.nombre)} className="text-red-600 text-sm">Eliminar</button>
              </div>
              <p><span className="font-medium">Promedio:</span> {curso.promedio ?? 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No hay cursos registrados.</p>
        )}

        <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-2">
          <select
            value={seleccion}
            onChange={(e) => setSeleccion(e.target.value)}
            className="p-2 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
                   >
            <option value="">Seleccionar curso</option>
            {disponibles
              .filter((d) => !cursos.find((c) => c.nombre === d))
              .map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Inscribirse
          </button>
        </form>
      </div>
    </main>
  );
}