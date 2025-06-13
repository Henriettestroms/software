'use client';
import { useEffect, useState } from 'react';

type Docente = {
  rut: number;
  nombre: string;
  apellido: string;
  correo: string;
  asignaturas: string;
  sueldo: number;
  ensayos_generados: number;
  fecha_nacimiento: string;
};

export default function DocentePage() {
  const [teacher, setTeacher] = useState<Docente | null>(null);

  useEffect(() => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;

    fetch(`http://localhost:3001/api/docentes/docente/${rut}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setTeacher(data))
      .catch(() => setTeacher(null));
  }, []);

  if (!teacher) {
    return <p className="text-red-500 text-center mt-10">Error fetching teacher data.</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">Perfil Docente</h1>

        <div className="bg-green-100 p-5 rounded-xl mb-6 shadow">
          <h2 className="text-xl font-bold text-green-800 mb-4">Información Personal</h2>
          <p className="text-gray-800"><strong>Nombre:</strong> {teacher.nombre} {teacher.apellido}</p>
          <p className="text-gray-800"><strong>Correo:</strong> {teacher.correo}</p>
          <p className="text-gray-800"><strong>Asignaturas:</strong> {teacher.asignaturas || 'N/A'}</p>
          <p className="text-gray-800"><strong>Sueldo mensual:</strong> {teacher.sueldo ?? 'N/A'}</p>
          <p className="text-gray-800"><strong>Ensayos generados:</strong> {teacher.ensayos_generados}</p>
          <p className="text-gray-800"><strong>Fecha de nacimiento:</strong> {teacher.fecha_nacimiento}</p>
        </div>
      </div>
    </main>
  );
}