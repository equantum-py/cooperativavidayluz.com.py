'use client';

import { useState, useEffect } from 'react';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';

interface Solicitud {
  id: string;
  nombre: string;
  email: string;
  ci: string;
  telefono: string;
  ciudad: string;
  estado: string;
  createdAt: string;
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(r => r.json())
      .then(data => setSolicitudes(data.pendientes || []))
      .finally(() => setLoading(false));
  }, []);

  const handleAprobar = async (id: string) => {
    try {
      const res = await fetch('/api/admin/socios/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asocId: id }),
      });
      if (res.ok) {
        setSolicitudes(s => s.filter(x => x.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRechazar = (id: string) => {
    setSolicitudes(s => s.filter(x => x.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Solicitudes</h1>
          <p className="text-sm text-gray-500 mt-1">Bandeja de entrada y análisis de nuevas afiliaciones</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      ) : solicitudes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500">No hay solicitudes pendientes en la bandeja</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {solicitudes.map(solicitud => (
            <div key={solicitud.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{solicitud.nombre}</h3>
                  <p className="text-sm text-gray-500 mt-1">Solicitud recibida {new Date(solicitud.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                  Pendiente
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span>{solicitud.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{solicitud.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{solicitud.ciudad}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-mono text-xs text-gray-500">CI: {solicitud.ci}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleRechazar(solicitud.id)}
                  className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleAprobar(solicitud.id)}
                  className="px-6 py-2 rounded-lg bg-[#006059] text-white font-semibold hover:bg-[#004C47] transition-colors"
                >
                  Aprobar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
