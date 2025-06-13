'use client';

import { useEffect, useState } from 'react';

type Curso = {
  nombre: string;
  promedio: number;
};

type Estudiante = {
  nombre: string;
  apellido: string;
  correo: string;
  curso: string;
  fecha_nacimiento: string;
  cursos: Curso[];
};

export default function EstudiantePage() {
  const [student, setStudent] = useState<Estudiante | null>(null);

  useEffect(() => {
    const rut = localStorage.getItem('rut');
    if (!rut) return;

    fetch(`http://localhost:3001/api/alumnos/${rut}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(() => setStudent(null));
  }, []);

  if (!student) {
    return <p className="text-red-500 text-center mt-10">Error fetching student data.</p>;
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-blue-100 p-8 rounded-2xl shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Perfil Estudiante</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Información Personal</h2>
          <p className="text-gray-900"><span className="font-medium">Nombre:</span> {student.nombre} {student.apellido}</p>
          <p className="text-gray-900"><span className="font-medium">Correo:</span> {student.correo}</p>
          <p className="text-gray-900"><span className="font-medium">Curso:</span> {student.curso}</p>
          <p className="text-gray-900"><span className="font-medium">Fecha de nacimiento:</span> {student.fecha_nacimiento}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Cursos y Promedios</h2>
          {student.cursos?.length > 0 ? (
            student.cursos.map((curso: any, index: number) => (
              <div key={index} className="mb-3 text-blue-900">
                <p><span className="font-medium">Curso:</span> {curso.nombre}</p>
                <p><span className="font-medium">Promedio:</span> {curso.promedio}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">Este estudiante no tiene cursos registrados aún.</p>
          )}
        </div>
      </div>
    </main>
  );
}