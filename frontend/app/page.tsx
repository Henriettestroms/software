'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

    const handleLogout = () => {
    localStorage.removeItem('rut');
    localStorage.removeItem('userType');
    setUserType(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Bienvenido a el portal
        </h1>

        {!userType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Box */}
            <div className="bg-blue-100 hover:bg-blue-200 rounded-2xl shadow-md p-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">Estudiante</h2>
              <div className="flex flex-col gap-3">
                <Link href="/login/login_estudiante" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl text-center transition-all">
                  Ingresar como estudiante
                </Link>
                <Link href="/new_perfil/new_estudiante" className="text-blue-700 hover:underline text-center">
                  Crear cuenta de estudiante
                </Link>
              </div>
            </div>

            {/* Teacher Box */}
            <div className="bg-green-100 hover:bg-green-200 rounded-2xl shadow-md p-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-green-900">Docente</h2>
              <div className="flex flex-col gap-3">
                <Link href="/login/login_docente" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl text-center transition-all">
                  Ingresar como docente
                </Link>
                <Link href="/new_perfil/new_docente" className="text-green-700 hover:underline text-center">
                  Crear cuenta de docente
                </Link>
              </div>
            </div>
          </div>
        )}

        {userType === 'estudiante' && (
          <div className="flex flex-col items-center gap-4">
            <Link href="/estudiante" className="text-blue-600 underline text-xl">
              Ir a mi perfil
            </Link>
            <Link href="/estudiante/curso" className="text-blue-600 underline text-xl">
              Ver mis cursos
            </Link>
                        <button onClick={handleLogout} className="text-blue-600 underline">
              Cerrar sesión
            </button>
          </div>
        )}

        {userType === 'docente' && (
          <div className="flex flex-col items-center gap-4">
            <Link href="/docente" className="text-green-600 underline text-xl">
              Ir a mi perfil
            </Link>
            <Link href="/docente/curso" className="text-green-600 underline text-xl">
              Ver mis cursos
            </Link>
            <button onClick={handleLogout} className="text-green-600 underline">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </main>
  );
}