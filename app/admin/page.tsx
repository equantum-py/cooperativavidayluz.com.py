'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
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
    // En una app real, esto llamaría a un endpoint /api/admin/dashboard
    // Para simplificar, simulamos con datos iniciales o una llamada que trae todo.
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <button onClick={() => router.push('/admin/socios')} className="text-emerald-700 font-semibold hover:underline">
            Ver Todos los Socios →
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[
                { label: 'Socios Activos', value: stats.activos, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Solicitudes Ptes.', value: stats.pendientes, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Créditos Activos', value: stats.creditosActivos, icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Aportes Ptes.', value: stats.aportesPendientes, icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Créd. Preaprobados', value: stats.preaprobados, icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${kpi.bg}`}>
                    <kpi.icon size={20} className={kpi.color} />
                  </div>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Pendientes de Aprobación */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Solicitudes de Asociación Pendientes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Fecha</th>
                      <th className="pb-3 font-medium">Nombre Completo</th>
                      <th className="pb-3 font-medium">CI</th>
                      <th className="pb-3 font-medium">Ciudad</th>
                      <th className="pb-3 font-medium text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-gray-500">No hay solicitudes pendientes.</td>
                      </tr>
                    ) : (
                      solicitudes.map(s => (
                        <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                          <td className="py-4 text-gray-600">{new Date(s.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 font-medium text-gray-900">{s.nombre}</td>
                          <td className="py-4 text-gray-600">{s.ci}</td>
                          <td className="py-4 text-gray-600">{s.ciudad}</td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => handleAprobar(s.id)}
                              disabled={approving === s.id}
                              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              {approving === s.id ? <Loader2 size={16} className="animate-spin" /> : 'Aprobar Socio'}
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
      </div>
    </div>
  );
}
