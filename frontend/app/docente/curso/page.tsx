'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DocenteCursosPage() {
  const [asignaturas, setAsignaturas] = useState<string[]>([]);
  const [nueva, setNueva] = useState('');
  const [subscripciones, setSubscripciones] = useState<Record<string, { rut: string; promedio: number | null }[]>>({});
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('availableCourses') || '[]');
    setAsignaturas(stored);
    actualizarSubscripciones(stored);
  }, []);

    const actualizarSubscripciones = (cursos: string[]) => {
    const data: Record<string, { rut: string; promedio: number | null }[]> = {};
    cursos.forEach(c => {
      data[c] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('subscriptions_')) {
          const rut = key.replace('subscriptions_', '');
          const cursosEst = JSON.parse(localStorage.getItem(key) || '[]');
          const match = cursosEst.find((ce: any) => ce.nombre === c);
          if (match) {
            data[c].push({ rut, promedio: match.promedio ?? null });
          }
        }
      }
    });
    setSubscripciones(data);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nueva.trim()) return;
    const updated = [...asignaturas, nueva.trim()];
    setAsignaturas(updated);
    localStorage.setItem('availableCourses', JSON.stringify(updated));
    actualizarSubscripciones(updated);
    setNueva('');
  };

    const handleRemove = (curso: string) => {
    const updated = asignaturas.filter(a => a !== curso);
    setAsignaturas(updated);
    localStorage.setItem('availableCourses', JSON.stringify(updated));
    actualizarSubscripciones(updated);
  };

  const handleGradeChange = (rutEst: string, curso: string, grade: string) => {
    const key = `subscriptions_${rutEst}`;
    const subs = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = subs.findIndex((s: any) => s.nombre === curso);
    if (idx > -1) {
      subs[idx].promedio = grade === '' ? null : parseFloat(grade);
      localStorage.setItem(key, JSON.stringify(subs));
      actualizarSubscripciones(asignaturas);
    }
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
            <div key={idx} className="mb-4">
              <div className="flex items-center justify-between">
                <p className="text-green-900 font-medium">Curso: {a}</p>
                <button onClick={() => handleRemove(a)} className="text-red-600 text-sm">Eliminar</button>
              </div>
              {subscripciones[a]?.length ? (
                subscripciones[a].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 ml-4 mt-1">
                    <span className="text-green-900 text-sm">Alumno {s.rut}</span>
                    <input
                      type="number"
                      step="0.01"
                      value={s.promedio ?? ''}
                      onChange={(e) => handleGradeChange(s.rut, a, e.target.value)}
                      className="p-1 w-20 rounded-md border border-green-300 text-gray-900"
                      placeholder="Nota"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-700 ml-4">Sin alumnos inscritos.</p>
              )}
            </div>
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