'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  ci: string;
  nombre: string;
  rol: string;
  estado: string;
}

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser({
          id: data.user.id,
          ci: data.user.ci,
          nombre: 'Usuario Autenticado',
          rol: data.user.rol,
          estado: 'activo',
        });
      } catch (error) {
        console.error('Error validating token:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Portal del Socio</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Información Personal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Cédula de Identidad (CI)</label>
                <p className="text-lg text-gray-900 font-mono">{user.ci}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Nombre</label>
                <p className="text-lg text-gray-900">{user.nombre}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Estado del Socio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Rol</label>
                <p className="text-lg text-gray-900">{user.rol}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Estado</label>
                <div className="flex items-center mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {user.estado}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Bienvenido</h2>
          <p className="text-gray-700">
            Hola <span className="font-semibold">{user.nombre}</span>, bienvenido al Portal del Socio de la Cooperativa Vida y Luz.
            Aquí puedes acceder a tu información personal y estado como miembro de la cooperativa.
          </p>
        </div>
      </main>
    </div>
  );
}
