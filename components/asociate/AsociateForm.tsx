'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

type FormData = {
  nombre: string;
  ci: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  ciudad: string;
  direccion: string;
  ocupacion: string;
  observaciones: string;
};

const INITIAL: FormData = {
  nombre: '',
  ci: '',
  fechaNacimiento: '',
  telefono: '',
  email: '',
  ciudad: '',
  direccion: '',
  ocupacion: '',
  observaciones: '',
};

export default function AsociateForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/asociacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm text-center max-w-lg mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h2 className="text-[22px] font-bold text-gray-900 mb-3">
          ¡Solicitud recibida!
        </h2>
        <p className="text-[16px] text-gray-500 leading-relaxed mb-6">
          Tu solicitud fue recibida correctamente. Un asesor se pondrá en contacto contigo a la brevedad para completar la asociación.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-[#006059] hover:bg-[#004C47] text-white text-[14px] font-semibold rounded-xl transition-colors"
        >
          Volver al inicio
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
          <UserPlus size={18} className="text-[#006059]" />
        </div>
        <h2 className="text-[16px] font-bold text-gray-900">Formulario de Asociación</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Nombre y Apellido *</label>
            <input required type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Cédula de Identidad *</label>
            <input required type="text" value={form.ci} onChange={e => setForm({...form, ci: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Fecha de Nacimiento *</label>
            <input required type="date" value={form.fechaNacimiento} onChange={e => setForm({...form, fechaNacimiento: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Teléfono *</label>
            <input required type="tel" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Ciudad *</label>
            <input required type="text" value={form.ciudad} onChange={e => setForm({...form, ciudad: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Ocupación *</label>
            <input required type="text" value={form.ocupacion} onChange={e => setForm({...form, ocupacion: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Dirección *</label>
            <input required type="text" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Observaciones</label>
            <textarea value={form.observaciones} onChange={e => setForm({...form, observaciones: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20 resize-none"></textarea>
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle size={16} /> Error al enviar solicitud. Intenta nuevamente.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2.5 bg-[#006059] hover:bg-[#004C47] text-white py-4 rounded-xl text-[16px] font-bold transition-all shadow-sm"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Enviar solicitud de asociación'}
        </button>
      </form>
    </div>
  );
}
