'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface AuditEntry {
  id: string;
  usuarioId: string;
  usuarioEmail: string;
  accion: string;
  entidad: string;
  entidadId: string;
  fecha: string;
}

export default function AuditoriaPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auditoria')
      .then(r => r.json())
      .then(data => setEntries(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const accionColor: Record<string, string> = {
    CREATE: 'bg-blue-100 text-blue-700',
    UPDATE: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
    APPROVE: 'bg-emerald-100 text-emerald-700',
    REJECT: 'bg-red-100 text-red-700',
    LOGIN: 'bg-purple-100 text-purple-700',
    LOGOUT: 'bg-slate-100 text-slate-700',
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bitácora de Auditoría</h1>
          <p className="text-sm text-gray-500 mt-1">Trazabilidad completa de operaciones del sistema</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 font-medium">Fecha</th>
                  <th className="px-6 py-3 font-medium">Usuario</th>
                  <th className="px-6 py-3 font-medium">Acción</th>
                  <th className="px-6 py-3 font-medium">Entidad</th>
                  <th className="px-6 py-3 font-medium">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No hay registros de auditoría
                    </td>
                  </tr>
                ) : (
                  entries.map(entry => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {new Date(entry.fecha).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium text-xs">
                        {entry.usuarioEmail}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${accionColor[entry.accion] || 'bg-gray-100 text-gray-700'}`}>
                          {entry.accion}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{entry.entidad}</td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">{entry.entidadId.slice(0, 8)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
