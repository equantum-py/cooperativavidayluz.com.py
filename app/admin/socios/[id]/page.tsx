'use client';

import { useState, useEffect, use } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Socio } from '@/lib/db';

export default function AdminSocioDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [socio, setSocio] = useState<Socio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/socios/${unwrappedParams.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSocio(data);
        setLoading(false);
      });
  }, [unwrappedParams.id]);

  if (loading) {
    return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
  }

  if (!socio) {
    return <div className="py-32 text-center text-gray-500 font-medium">Socio no encontrado en la base de datos.</div>;
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/socios" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ficha de Socio</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestión individual de historial y datos</p>
        </div>
      </div>
      
      {/* Header Ficha */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <User size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{socio.nombre} {socio.apellido}</h2>
              <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                socio.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {socio.estado}
              </span>
            </div>
            <p className="text-gray-500 font-mono text-sm">N°: {socio.numeroSocio} • CI: {socio.cedula}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 min-w-[160px] text-center">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Score Cooperativo</p>
          <p className="text-3xl font-extrabold text-[#006059]">{socio.scoreCooperativo}<span className="text-sm font-medium text-[#006059]/60">/100</span></p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Datos Personales */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5 pb-4 border-b border-gray-100">
            Datos Personales
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="text-gray-400 shrink-0" size={16} /> <span className="text-gray-500 w-24 shrink-0">Email:</span> <span className="text-gray-900 font-medium truncate">{socio.email || '-'}</span></div>
            <div className="flex items-center gap-3"><Phone className="text-gray-400 shrink-0" size={16} /> <span className="text-gray-500 w-24 shrink-0">Teléfono:</span> <span className="text-gray-900 font-medium">{socio.telefono}</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-gray-400 shrink-0" size={16} /> <span className="text-gray-500 w-24 shrink-0">Dirección:</span> <span className="text-gray-900 font-medium truncate">{socio.direccion}, {socio.ciudad}</span></div>
            <div className="flex items-center gap-3"><Calendar className="text-gray-400 shrink-0" size={16} /> <span className="text-gray-500 w-24 shrink-0">Nacimiento:</span> <span className="text-gray-900 font-medium">{socio.fechaNacimiento}</span></div>
            <div className="flex items-center gap-3"><Briefcase className="text-gray-400 shrink-0" size={16} /> <span className="text-gray-500 w-24 shrink-0">Profesión:</span> <span className="text-gray-900 font-medium truncate">{socio.profesion || '-'}</span></div>
          </div>
        </section>

        {/* Datos Cooperativos */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5 pb-4 border-b border-gray-100">
            Datos Cooperativos
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between"><span className="text-gray-500">Fecha de Ingreso:</span> <span className="text-gray-900 font-medium">{new Date(socio.fechaIngreso).toLocaleDateString()}</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-500">Categoría:</span> <span className="text-gray-900 font-medium">{socio.categoriaSocio}</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-500">Aporte Mensual:</span> <span className="text-gray-900 font-medium">Gs. {socio.aporteMensual.toLocaleString('es-PY')}</span></div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 mt-2">
              <span className="text-emerald-800 font-semibold">Saldo Aportes:</span> 
              <span className="text-emerald-700 font-bold text-lg">Gs. {socio.saldoAportes.toLocaleString('es-PY')}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
