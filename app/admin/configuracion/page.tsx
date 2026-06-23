'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

interface ConfigItem {
  clave: string;
  valor: string;
  descripcion: string;
}

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<ConfigItem[]>([
    {
      clave: 'TASA_INTERES_ANUAL',
      valor: '15',
      descripcion: 'Tasa de interés anual por defecto (%)',
    },
    {
      clave: 'CUOTA_INGRESO',
      valor: '100000',
      descripcion: 'Cuota de ingreso para nuevos socios (Gs)',
    },
    {
      clave: 'APORTE_MINIMO_MENSUAL',
      valor: '50000',
      descripcion: 'Aporte mínimo mensual obligatorio (Gs)',
    },
    {
      clave: 'DIAS_MORA_CRITICA',
      valor: '90',
      descripcion: 'Días de atraso para considerar mora crítica',
    },
  ]);

  const [saved, setSaved] = useState(false);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...config];
    updated[index] = { ...updated[index], [field]: value };
    setConfig(updated);
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would post to an API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-sm text-gray-500 mt-1">Administración de usuarios, roles y parámetros globales</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-bold text-gray-900">Parámetros Globales del Sistema</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {config.map((item, idx) => (
            <div key={item.clave} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {item.clave}
                  </label>
                  <p className="text-xs text-gray-500">{item.descripcion}</p>
                </div>
                <div>
                  <input
                    type="text"
                    value={item.valor}
                    onChange={(e) => handleChange(idx, 'valor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            {saved && <p className="text-sm text-emerald-600 font-medium">✓ Cambios guardados</p>}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#006059] hover:bg-[#004C47] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            <Save size={16} />
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Gestión de Usuarios</h2>
          <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600 text-sm">
            <p>Módulo en desarrollo - Crear usuarios próximamente</p>
          </div>
        </div>
      </div>
    </>
  );
}
