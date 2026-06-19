'use client';

import { Wrench, CheckCircle } from 'lucide-react';

export default function AuditoriaPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Bitácora de Auditoría
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              En desarrollo
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Trazabilidad completa de operaciones del sistema</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <Wrench className="text-gray-400" size={32} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Módulo en Construcción</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
          Esta sección del sistema ERP está programada para la próxima fase de implementación técnica.
        </p>

        <div className="text-left bg-gray-50 p-6 rounded-xl border border-gray-100 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Funcionalidades Futuras
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Registro inmutable de acciones CREATE, UPDATE, DELETE.</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Filtro de eventos por Usuario, Fecha y Entidad.</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Captura de Deltas (Valor Anterior vs Valor Nuevo).</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Alertas de seguridad por accesos fuera de horario.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
