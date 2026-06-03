'use client';

/**
 * Panel de administración — /admin/creditos
 * ⚠️  Sin autenticación. Agregar middleware de auth antes de producción.
 */

import { useEffect, useState, useCallback } from 'react';
import type { CreditRequest, CreditStatus } from '@/lib/db';
import { RefreshCw, ChevronDown, Search } from 'lucide-react';

/* ─── Status badge ───────────────────────────────────────────────────── */

const BADGE: Record<CreditStatus, string> = {
  pendiente: 'bg-amber-50 text-amber-700 border-amber-200',
  revisado:  'bg-blue-50  text-blue-700  border-blue-200',
  aprobado:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  rechazado: 'bg-red-50   text-red-700   border-red-200',
};

const LABEL: Record<CreditStatus, string> = {
  pendiente: 'Pendiente',
  revisado:  'Revisado',
  aprobado:  'Aprobado',
  rechazado: 'Rechazado',
};

const ESTADOS: CreditStatus[] = ['pendiente', 'revisado', 'aprobado', 'rechazado'];

function StatusBadge({ estado }: { estado: CreditStatus }) {
  return (
    <span className={`inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${BADGE[estado]}`}>
      {LABEL[estado]}
    </span>
  );
}

/* ─── Fila ───────────────────────────────────────────────────────────── */

function Row({
  item,
  onStatusChange,
}: {
  item: CreditRequest;
  onStatusChange: (id: string, estado: CreditStatus) => void;
}) {
  const fmt = (n: number) => new Intl.NumberFormat('es-PY').format(n);
  const date = new Date(item.createdAt).toLocaleDateString('es-PY', {
    day: '2-digit', month: '2-digit', year: '2-digit',
  });

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-[13.5px]">
      <td className="px-4 py-3 text-gray-400 font-mono text-[11px]">{item.id}</td>
      <td className="px-4 py-3 font-semibold text-gray-900">{item.nombre}</td>
      <td className="px-4 py-3 text-gray-600">{item.ci}</td>
      <td className="px-4 py-3 font-semibold text-emerald-700">Gs. {fmt(item.monto)}</td>
      <td className="px-4 py-3 text-gray-500">{item.tipoPrestamo}</td>
      <td className="px-4 py-3 text-gray-400">{date}</td>
      <td className="px-4 py-3">
        <StatusBadge estado={item.estado} />
      </td>
      <td className="px-4 py-3">
        <div className="relative">
          <select
            value={item.estado}
            onChange={(e) => onStatusChange(item.id, e.target.value as CreditStatus)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-7 text-[12px] text-gray-700 focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{LABEL[e]}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </td>
    </tr>
  );
}

/* ─── Panel ──────────────────────────────────────────────────────────── */

export default function AdminCreditosPage() {
  const [items, setItems] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState<CreditStatus | 'todos'>('todos');
  const [busqueda, setBusqueda] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/creditos');
      if (!res.ok) throw new Error('Error al obtener solicitudes');
      setItems(await res.json());
    } catch {
      setError('No se pudieron cargar las solicitudes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleStatusChange(id: string, estado: CreditStatus) {
    const prev = items;
    setItems((all) => all.map((i) => i.id === id ? { ...i, estado } : i));
    try {
      const res = await fetch(`/api/admin/creditos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setItems(prev);
      alert('No se pudo actualizar el estado. Intentá de nuevo.');
    }
  }

  const filtered = items.filter((item) => {
    const matchFiltro = filtro === 'todos' || item.estado === filtro;
    const q = busqueda.toLowerCase();
    const matchBusqueda =
      !q ||
      item.nombre.toLowerCase().includes(q) ||
      item.ci.includes(q) ||
      item.id.toLowerCase().includes(q);
    return matchFiltro && matchBusqueda;
  });

  const counts = ESTADOS.reduce((acc, e) => {
    acc[e] = items.filter((i) => i.estado === e).length;
    return acc;
  }, {} as Record<CreditStatus, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-emerald-200 text-[11px] font-bold uppercase tracking-widest mb-1">
              Cooperativa Vida &amp; Luz — Administración
            </p>
            <h1 className="text-[22px] font-bold text-white">Solicitudes de crédito</h1>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-[13px] font-medium px-4 py-2 rounded-xl transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {([['todos', 'Total', items.length], ...ESTADOS.map(e => [e, LABEL[e], counts[e]])] as [string, string, number][]).map(([key, label, count]) => (
            <button
              key={key}
              onClick={() => setFiltro(key as CreditStatus | 'todos')}
              className={`text-left p-4 rounded-2xl border transition-all ${
                filtro === key
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'bg-white border-gray-100 text-gray-700 hover:border-emerald-200'
              }`}
            >
              <p className={`text-[26px] font-bold ${filtro === key ? 'text-white' : 'text-gray-900'}`}>{count}</p>
              <p className={`text-[12px] font-medium ${filtro === key ? 'text-emerald-100' : 'text-gray-500'}`}>{label}</p>
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative mb-5 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, CI o ID..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Cargando solicitudes...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            {busqueda || filtro !== 'todos' ? 'Sin resultados para este filtro.' : 'No hay solicitudes aún.'}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">CI</th>
                    <th className="px-4 py-3 text-left">Monto</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Fecha</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Cambiar</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <Row key={item.id} item={item} onStatusChange={handleStatusChange} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 text-[12px] text-gray-400 text-right">
              {filtered.length} de {items.length} solicitudes
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
