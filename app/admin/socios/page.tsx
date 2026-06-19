import { getAllCreditos, getAllAsociaciones } from '@/lib/db';
import Navbar from '@/components/landing/Navbar';

export default function AdminSociosPage() {
  const creditos = getAllCreditos();
  const asociaciones = getAllAsociaciones();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#006059] mb-4">Solicitudes de Asociación ({asociaciones.length})</h2>
            <div className="space-y-4">
              {asociaciones.map(a => (
                <div key={a.id} className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">{a.nombre}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">{a.estado}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">CI: {a.ci} | Tel: {a.telefono}</p>
                  <p className="text-sm text-gray-600 mb-1">Ciudad: {a.ciudad}</p>
                  <p className="text-xs text-gray-400 mt-2">ID: {a.id} | {new Date(a.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {asociaciones.length === 0 && <p className="text-sm text-gray-500">No hay solicitudes de asociación.</p>}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#006059] mb-4">Solicitudes de Crédito ({creditos.length})</h2>
            <div className="space-y-4">
              {creditos.map(c => (
                <div key={c.id} className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">{c.nombre}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{c.estado}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Monto: Gs. {c.monto.toLocaleString('es-PY')} | {c.cuotas} cuotas</p>
                  <p className="text-sm text-gray-600 mb-1">Destino: {c.destino}</p>
                  <p className="text-xs text-gray-400 mt-2">ID: {c.id} | {new Date(c.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {creditos.length === 0 && <p className="text-sm text-gray-500">No hay solicitudes de crédito.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
