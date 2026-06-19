'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/landing/Navbar';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck, Loader2 } from 'lucide-react';
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
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 flex justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
      </div>
    );
  }

  if (!socio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 px-6 text-center text-gray-500">Socio no encontrado.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-28 px-6 pb-12 max-w-5xl mx-auto">
        <Link href="/admin/socios" className="text-emerald-700 font-semibold hover:underline mb-6 inline-block">
          ← Volver a Socios
        </Link>
        
        {/* Header Ficha */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <User size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{socio.nombre} {socio.apellido}</h1>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                  socio.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {socio.estado}
                </span>
              </div>
              <p className="text-gray-500 font-mono">N° Socio: {socio.numeroSocio} | CI: {socio.cedula}</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 min-w-[160px] text-center">
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">Score Cooperativo</p>
            <p className="text-3xl font-extrabold text-emerald-700">{socio.scoreCooperativo}<span className="text-sm font-medium text-emerald-600/70">/100</span></p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Datos Personales */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#006059] mb-5 flex items-center gap-2">
              <User size={18} /> Datos Personales
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3"><Mail className="text-gray-400" size={16} /> <span className="text-gray-500 w-24">Email:</span> <span className="text-gray-900 font-medium">{socio.email || '-'}</span></div>
              <div className="flex items-center gap-3"><Phone className="text-gray-400" size={16} /> <span className="text-gray-500 w-24">Teléfono:</span> <span className="text-gray-900 font-medium">{socio.telefono}</span></div>
              <div className="flex items-center gap-3"><MapPin className="text-gray-400" size={16} /> <span className="text-gray-500 w-24">Dirección:</span> <span className="text-gray-900 font-medium">{socio.direccion}, {socio.ciudad}</span></div>
              <div className="flex items-center gap-3"><Calendar className="text-gray-400" size={16} /> <span className="text-gray-500 w-24">Nacimiento:</span> <span className="text-gray-900 font-medium">{socio.fechaNacimiento}</span></div>
              <div className="flex items-center gap-3"><Briefcase className="text-gray-400" size={16} /> <span className="text-gray-500 w-24">Profesión:</span> <span className="text-gray-900 font-medium">{socio.profesion || '-'}</span></div>
            </div>
          </section>

          {/* Datos Cooperativos */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#006059] mb-5 flex items-center gap-2">
              <ShieldCheck size={18} /> Datos Cooperativos
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3"><span className="text-gray-500 w-32">Fecha de Ingreso:</span> <span className="text-gray-900 font-medium">{new Date(socio.fechaIngreso).toLocaleDateString()}</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 w-32">Categoría:</span> <span className="text-gray-900 font-medium">{socio.categoriaSocio}</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 w-32">Aporte Mensual:</span> <span className="text-gray-900 font-medium">Gs. {socio.aporteMensual.toLocaleString('es-PY')}</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 w-32">Saldo Aportes:</span> <span className="text-gray-900 font-medium text-emerald-600 font-bold">Gs. {socio.saldoAportes.toLocaleString('es-PY')}</span></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
