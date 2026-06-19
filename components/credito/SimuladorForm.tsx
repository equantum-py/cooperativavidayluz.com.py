'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DEFAULT_INTEREST_RATE = 18; // 18% anual

export default function SimuladorForm() {
  const router = useRouter();
  const [monto, setMonto] = useState('5000000');
  const [plazo, setPlazo] = useState('12');
  const [destino, setDestino] = useState('Consumo');

  const cuota = useMemo(() => {
    const P = Number(monto);
    const n = Number(plazo);
    if (!P || !n) return 0;
    const r = (DEFAULT_INTEREST_RATE / 100) / 12; // tasa mensual
    const c = (P * r) / (1 - Math.pow(1 + r, -n));
    return c;
  }, [monto, plazo]);

  const totalPagar = cuota * Number(plazo);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/credito/solicitud?monto=${monto}&plazo=${plazo}&destino=${encodeURIComponent(destino)}`);
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
          <Calculator size={18} className="text-emerald-700" />
        </div>
        <h2 className="text-[16px] font-bold text-gray-900">Simulador de Crédito</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Monto (Gs.)</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20"
            min="500000"
            step="100000"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Plazo (cuotas mensuales)</label>
          <select
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20"
          >
            {[6, 12, 18, 24, 36].map(p => (
              <option key={p} value={p}>{p} cuotas</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Destino del crédito</label>
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20"
          >
            {['Consumo', 'Emergencia', 'Educativo', 'Emprendimiento', 'Otro'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[13px] text-gray-600 font-medium">Tasa referencial anual</span>
            <span className="text-[14px] font-bold text-gray-900">{DEFAULT_INTEREST_RATE}%</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-emerald-200">
            <span className="text-[13px] text-gray-600 font-medium">Total a pagar estimado</span>
            <span className="text-[14px] font-bold text-gray-900">Gs. {Math.round(totalPagar).toLocaleString('es-PY')}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[12px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Cuota mensual estimada</span>
            <span className="text-[32px] font-extrabold text-emerald-700 tracking-tight">Gs. {Math.round(cuota).toLocaleString('es-PY')}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-[16px] font-bold transition-all shadow-sm hover:-translate-y-0.5"
        >
          Solicitar este crédito
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
