'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewDocentePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    sueldo: '',
    correo: '',
    fecha_nacimiento: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormatoRut = (rut: string) => /^\d{8}$/.test(rut);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validarFormatoRut(form.rut)) {
      setError('El RUT debe tener 8 dígitos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/docentes/docente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ensayos_generados: 0 }),
      });

      if (res.ok) {
        localStorage.setItem('rut', form.rut);
        localStorage.setItem('userType', 'docente');
        router.push('/docente');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al crear el perfil.');
      }
    } catch {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-green-100 p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Crear Perfil Docente
        </h1>

        {/* Her manglet <form> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["rut", "RUT", "Ej: 12345678"],
            ["nombre", "Nombre", "Ej: Juan"],
            ["apellido", "Apellido", "Ej: Pérez"],
            ["correo", "Correo Electrónico", "ejemplo@correo.com"],
            ["fecha_nacimiento", "Fecha de Nacimiento", "YYYY-MM-DD"],
          ].map(([name, label, ph]) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 text-green-900 font-semibold text-sm">
                {label}
              </label>
              <input
                type="text"
                name={name}
                id={name}
                placeholder={ph}
                value={(form as any)[name]}
                onChange={handleChange}
                required
                className="p-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label htmlFor="sueldo" className="mb-1 text-green-900 font-semibold text-sm">
              Sueldo mensual
            </label>
            <input
              type="number"
              name="sueldo"
              id="sueldo"
              min="0"
              step="any"
              placeholder="Ej: 500000"
              value={form.sueldo}
              onChange={handleChange}
              required
              className="appearance-none p-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-500 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Crear
          </button>
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}