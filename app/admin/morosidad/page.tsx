'use client';

export default function MorosidadPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Mora</h1>
          <p className="text-sm text-gray-500 mt-1">Recuperación de cartera y alertas de atraso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <p className="text-gray-500 text-sm">Cuentas en Mora</p>
          <p className="text-3xl font-bold text-red-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <p className="text-gray-500 text-sm">Capital Moroso</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">Gs. 0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <p className="text-gray-500 text-sm">Tasa de Mora</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">0 %</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-500">No hay cuentas en mora registradas actualmente</p>
      </div>
    </>
  );
}
