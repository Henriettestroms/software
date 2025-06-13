'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEstudiantePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    correo: '',
    fecha_nacimiento: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/alumnos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, historial_ensayos: [] }),
      });

      if (res.ok) {
        localStorage.setItem('rut', form.rut)
        localStorage.setItem('userType', 'estudiante')
        router.push('/estudiante');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al crear el perfil.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-blue-100 p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Crear Perfil Estudiante</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            ['rut', 'RUT'],
            ['nombre', 'Nombre'],
            ['apellido', 'Apellido'],
            ['correo', 'Correo Electrónico'],
            ['fecha_nacimiento', 'Fecha de Nacimiento'],
          ].map(([name, label]) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 text-blue-900 font-semibold text-sm">
                {label}
              </label>
              <input
                type="text"
                name={name}
                id={name}
                placeholder={label}
                value={(form as any)[name]}
                onChange={handleChange}
                required
                className="p-2 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Crear
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}