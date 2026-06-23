'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { Socio } from '@/lib/db';

export default function AportesPage() {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/socios')
      .then(res => res.json())
      .then(data => setSocios(data))
      .finally(() => setLoading(false));
  }, []);

  const totalAportes = socios.reduce((sum, s) => sum + s.saldoAportes, 0);
  const fmt = (n: number) => new Intl.NumberFormat('es-PY').format(Math.round(n));

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aportes y Solidaridad</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de recaudación, saldos y extractos sociales</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Total Aportado</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">Gs. {fmt(totalAportes)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Promedio por Socio</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">Gs. {fmt(totalAportes / Math.max(socios.length, 1))}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Socios Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{socios.filter(s => s.estado === 'Activo').length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900">Resumen de Aportes por Socio</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-white">
                    <th className="px-6 py-3 font-medium text-gray-500">N° Socio</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Nombre</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Aporte Mensual</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Saldo Acumulado</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {socios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay socios registrados</td>
                    </tr>
                  ) : (
                    socios.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-xs text-gray-600">{s.numeroSocio}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{s.nombre} {s.apellido}</td>
                        <td className="px-6 py-4 text-gray-600">Gs. {fmt(s.aporteMensual)}</td>
                        <td className="px-6 py-4 font-semibold text-emerald-700">Gs. {fmt(s.saldoAportes)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            s.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {s.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
