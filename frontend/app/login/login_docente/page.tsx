'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginDocente() {
  const [rut, setRut] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validarFormatoRut = (rut: string) => /^\d{8}$/.test(rut);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validarFormatoRut(rut)) {
      setError('El RUT no tiene el formato correcto. Ej: 12345678');
      return;
    }

    try {
       const res = await fetch(`http://localhost:3001/api/docentes/docente/${rut}`);
       if (res.ok) {
        // Guardamos el rut para usarlo en otras páginas
        localStorage.setItem('rut', rut);
        localStorage.setItem('userType', 'docente');
        router.push('/docente');
      } else {
        setError('El usuario no existe.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

 return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-green-100 rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">Ingreso Docente</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="rut" className="text-sm font-semibold text-green-800">
            RUT del docente
          </label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="Ej: 12345678-9"
            className="p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-green-400"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
          >
            Ingresar
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </main>
  );
}