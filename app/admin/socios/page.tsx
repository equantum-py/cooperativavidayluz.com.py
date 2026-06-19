'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2, User } from 'lucide-react';
import Link from 'next/link';
import type { Socio } from '@/lib/db';

export default function AdminSociosList() {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetch('/api/admin/socios')
      .then(res => res.json())
      .then(data => {
        setSocios(data);
        setLoading(false);
      });
  }, []);

  const filteredSocios = socios.filter(s => {
    const matchesSearch = s.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          s.apellido.toLowerCase().includes(search.toLowerCase()) || 
                          s.cedula.includes(search) ||
                          s.numeroSocio.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? s.estado === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Socios</h1>
          <p className="text-sm text-gray-500 mt-1">Directorio completo de miembros de la cooperativa</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, cédula o N° de socio..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="w-full sm:w-48 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Suspendido">Suspendido</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-gray-500">
                  <th className="px-6 py-4 font-semibold">N° Socio</th>
                  <th className="px-6 py-4 font-semibold">Nombre Completo</th>
                  <th className="px-6 py-4 font-semibold">Cédula</th>
                  <th className="px-6 py-4 font-semibold">Score</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSocios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No se encontraron socios.</td>
                  </tr>
                ) : (
                  filteredSocios.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors bg-white">
                      <td className="px-6 py-4 font-mono text-gray-600 text-xs">{s.numeroSocio}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <User size={14} />
                          </div>
                          {s.nombre} {s.apellido}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">{s.cedula}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${
                          s.scoreCooperativo >= 80 ? 'bg-emerald-100 text-emerald-700' :
                          s.scoreCooperativo >= 50 ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {s.scoreCooperativo}/100
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          s.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' :
                          s.estado === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/socios/${s.id}`} className="text-[#006059] hover:underline font-semibold text-sm">
                          Ficha completa →
                        </Link>
                      </td>
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
