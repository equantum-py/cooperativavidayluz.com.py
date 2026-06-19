'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, Banknote, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    activos: 0,
    pendientes: 0,
    creditosActivos: 0,
    aportesPendientes: 0,
    preaprobados: 0
  });
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/data').then(r => r.json()).catch(() => ({}))
    ]).then(([data]) => {
      if (data) {
        setStats(data.stats || { activos: 0, pendientes: 0, creditosActivos: 0, aportesPendientes: 0, preaprobados: 0 });
        setSolicitudes(data.pendientes || []);
      }
      setLoading(false);
    });
  }, []);

  async function handleAprobar(id: string) {
    setApproving(id);
    try {
      const res = await fetch('/api/admin/socios/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asocId: id, aprobadoPor: 'Admin User' })
      });
      if (res.ok) {
        setSolicitudes(s => s.filter(x => x.id !== id));
        setStats(s => ({ ...s, activos: s.activos + 1, pendientes: s.pendientes - 1 }));
      }
    } finally {
      setApproving(null);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h1>
          <p className="text-sm text-gray-500 mt-1">Visión general del estado cooperativo</p>
        </div>
        <button onClick={() => router.push('/admin/socios')} className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm">
          Ver Todos los Socios
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Socios Activos', value: stats.activos, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Solicitudes Ptes.', value: stats.pendientes, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Créditos Activos', value: stats.creditosActivos, icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Aportes Ptes.', value: stats.aportesPendientes, icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Créd. Preaprobados', value: stats.preaprobados, icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.bg}`}>
                    <kpi.icon size={16} className={kpi.color} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wide mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Pendientes de Aprobación */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-base font-bold text-gray-900">Solicitudes de Asociación Pendientes</h2>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md">{solicitudes.length} esperando</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-100 bg-white">
                    <th className="px-6 py-3 font-medium">Fecha</th>
                    <th className="px-6 py-3 font-medium">Nombre Completo</th>
                    <th className="px-6 py-3 font-medium">CI</th>
                    <th className="px-6 py-3 font-medium">Ciudad</th>
                    <th className="px-6 py-3 font-medium text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {solicitudes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">No hay solicitudes pendientes en la bandeja.</td>
                    </tr>
                  ) : (
                    solicitudes.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors bg-white">
                        <td className="px-6 py-4 text-gray-500 text-xs font-medium">{new Date(s.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{s.nombre}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-xs">{s.ci}</td>
                        <td className="px-6 py-4 text-gray-600">{s.ciudad}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleAprobar(s.id)}
                            disabled={approving === s.id}
                            className="inline-flex items-center justify-center gap-2 bg-[#006059] hover:bg-[#004C47] disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                          >
                            {approving === s.id ? <Loader2 size={14} className="animate-spin" /> : 'Aprobar'}
                          </button>
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
