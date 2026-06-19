'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Socios</h1>
          <Link href="/admin" className="text-emerald-700 font-semibold hover:underline">
            ← Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 mb-6">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none"
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-gray-500">
                    <th className="px-6 py-4 font-medium">N° Socio</th>
                    <th className="px-6 py-4 font-medium">Nombre Completo</th>
                    <th className="px-6 py-4 font-medium">Cédula</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredSocios.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No se encontraron socios.</td>
                    </tr>
                  ) : (
                    filteredSocios.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-gray-600">{s.numeroSocio}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                              <User size={14} />
                            </div>
                            {s.nombre} {s.apellido}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{s.cedula}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center justify-center px-2 py-1 rounded font-bold text-xs ${
                            s.scoreCooperativo >= 80 ? 'bg-emerald-100 text-emerald-700' :
                            s.scoreCooperativo >= 50 ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {s.scoreCooperativo}/100
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            s.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' :
                            s.estado === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {s.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/socios/${s.id}`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Ver detalle
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
      </div>
    </div>
  );
}
