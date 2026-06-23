'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { CreditRequest, Socio } from '@/lib/db';

export default function ReportesPage() {
  const [creditos, setCreditos] = useState<CreditRequest[]>([]);
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/creditos').then(r => r.json()),
      fetch('/api/admin/socios').then(r => r.json()),
    ]).then(([c, s]) => {
      setCreditos(c);
      setSocios(s);
      setLoading(false);
    });
  }, []);

  const creditosActivos = creditos.filter(c => c.estado === 'aprobado').length;
  const creditosPendientes = creditos.filter(c => c.estado === 'pendiente').length;
  const totalSolicitado = creditos.reduce((sum, c) => sum + c.monto, 0);
  const fmt = (n: number) => new Intl.NumberFormat('es-PY').format(Math.round(n));

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes e Informes</h1>
          <p className="text-sm text-gray-500 mt-1">Inteligencia de negocios y extractos regulatorios</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Socios Totales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{socios.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Créditos Activos</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{creditosActivos}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Solicitudes Pendientes</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{creditosPendientes}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-gray-500 text-sm">Total Solicitado</p>
              <p className="text-lg font-bold text-gray-900 mt-2">Gs. {fmt(totalSolicitado)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Créditos por Estado</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pendientes</span>
                  <span className="font-bold text-amber-600">{creditosPendientes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Aprobados</span>
                  <span className="font-bold text-emerald-600">{creditosActivos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rechazados</span>
                  <span className="font-bold text-red-600">{creditos.filter(c => c.estado === 'rechazado').length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Socios por Estado</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Activos</span>
                  <span className="font-bold text-emerald-600">{socios.filter(s => s.estado === 'Activo').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pendientes</span>
                  <span className="font-bold text-amber-600">{socios.filter(s => s.estado === 'Pendiente').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Suspendidos</span>
                  <span className="font-bold text-red-600">{socios.filter(s => s.estado === 'Suspendido').length}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
