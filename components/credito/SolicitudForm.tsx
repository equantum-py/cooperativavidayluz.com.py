'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  CreditCard,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

/* ─── Tipos ──────────────────────────────────────────────────────────── */

type FormData = {
  nombre: string;
  ci: string;
  telefono: string;
  direccion: string;
  barrio: string;
  monto: string;
  tipoPrestamo: string;
  cuotas: string;
  destino: string;
  referencia: string;
  consentimiento: boolean;
};

type Errors = Partial<Record<keyof FormData, string>>;

/* ─── Constantes ─────────────────────────────────────────────────────── */

const TIPOS = ['Consumo', 'Emergencia', 'Educativo', 'Emprendimiento', 'Otro'];
const CUOTAS = [6, 12, 18, 24, 36];
const MONTO_MIN = 500_000;
const MONTO_MAX = 200_000_000;

const INITIAL: FormData = {
  nombre: '',
  ci: '',
  telefono: '',
  direccion: '',
  barrio: '',
  monto: '',
  tipoPrestamo: '',
  cuotas: '',
  destino: '',
  referencia: '',
  consentimiento: false,
};

/* ─── Validación ─────────────────────────────────────────────────────── */

function validate(f: FormData): Errors {
  const e: Errors = {};

  if (!f.nombre.trim()) e.nombre = 'El nombre y apellido es requerido';
  else if (f.nombre.trim().split(' ').filter(Boolean).length < 2)
    e.nombre = 'Ingresá nombre y apellido completos';

  const ciNum = f.ci.replace(/\D/g, '');
  if (!ciNum) e.ci = 'La cédula es requerida';
  else if (!/^\d{5,8}$/.test(ciNum)) e.ci = 'La cédula debe tener entre 5 y 8 dígitos';

  const tel = f.telefono.replace(/[\s\-\(\)]/g, '');
  if (!tel) e.telefono = 'El teléfono es requerido';
  else if (!/^(\+?595|0)9\d{7,9}$/.test(tel))
    e.telefono = 'Formato válido: 0981 123456 o +595 981 123456';

  if (!f.direccion.trim()) e.direccion = 'La dirección es requerida';
  if (!f.barrio.trim()) e.barrio = 'El barrio o ciudad es requerido';

  if (!f.monto) e.monto = 'El monto es requerido';
  else if (Number(f.monto) < MONTO_MIN)
    e.monto = `El monto mínimo es Gs. ${MONTO_MIN.toLocaleString('es-PY')}`;
  else if (Number(f.monto) > MONTO_MAX)
    e.monto = `El monto máximo es Gs. ${MONTO_MAX.toLocaleString('es-PY')}`;

  if (!f.tipoPrestamo) e.tipoPrestamo = 'Seleccioná el tipo de préstamo';
  if (!f.cuotas) e.cuotas = 'Seleccioná el número de cuotas';

  if (!f.destino.trim()) e.destino = 'Describí el destino del crédito';
  else if (f.destino.trim().length < 10)
    e.destino = 'La descripción debe tener al menos 10 caracteres';

  if (!f.consentimiento)
    e.consentimiento = 'Debés aceptar los términos para enviar la solicitud';

  return e;
}

/* ─── Sub-componentes ────────────────────────────────────────────────── */

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-[12px] text-red-500 mt-1"
        >
          <AlertCircle size={11} className="flex-shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputBase =
  'w-full px-4 py-2.5 rounded-xl border text-[15px] text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors duration-150 disabled:opacity-50';
const inputNormal = `${inputBase} border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20`;
const inputError = `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-500/15`;

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-card"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-emerald-700" strokeWidth={1.75} />
        </div>
        <h2 className="text-[16px] font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </motion.div>
  );
}

function SuccessView({ id }: { id: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, type: 'spring', stiffness: 100 }}
      className="bg-white border border-gray-100 rounded-2xl p-10 shadow-card text-center max-w-lg mx-auto"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} className="text-emerald-600" />
      </div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-3">
        ¡Solicitud recibida con éxito!
      </h2>
      <p className="text-[16px] text-gray-500 leading-relaxed mb-5">
        Tu solicitud fue recibida y será evaluada por la cooperativa. Nos comunicaremos
        contigo a la brevedad al número de teléfono que proporcionaste.
      </p>
      <div className="inline-block bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-2.5 mb-6">
        <p className="text-[12px] text-emerald-600 uppercase tracking-widest font-bold mb-0.5">
          Número de solicitud
        </p>
        <p className="text-[18px] font-bold text-emerald-700 font-mono">{id}</p>
      </div>
      <p className="text-[13px] text-gray-400 leading-relaxed">
        Guardá este número para hacer seguimiento de tu solicitud.
        <br />
        Estado actual: <span className="text-amber-600 font-semibold">Pendiente de revisión</span>
      </p>
      <a
        href="/"
        className="inline-block mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[14px] font-semibold rounded-xl transition-colors"
      >
        Volver al inicio
      </a>
    </motion.div>
  );
}

/* ─── Formulario principal ───────────────────────────────────────────── */

export default function SolicitudForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [solicitudId, setSolicitudId] = useState('');
  const [apiError, setApiError] = useState('');

  function change(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function blur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  function montoPreview() {
    const n = Number(form.monto);
    if (!n || isNaN(n)) return null;
    return `Gs. ${n.toLocaleString('es-PY')}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('loading');
    setApiError('');

    try {
      const res = await fetch('/api/credito/solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, monto: Number(form.monto) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? 'Ocurrió un error. Intentá de nuevo.');
        setStatus('error');
        return;
      }

      setSolicitudId(data.id);
      setStatus('success');
    } catch {
      setApiError('No se pudo conectar con el servidor. Verificá tu conexión.');
      setStatus('error');
    }
  }

  if (status === 'success') return <SuccessView id={solicitudId} />;

  const loading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── 1. Datos personales ── */}
      <SectionCard icon={User} title="Datos personales">
        {/* Nombre */}
        <div id="field-nombre">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Nombre y Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => change('nombre', e.target.value)}
            onBlur={() => blur('nombre')}
            disabled={loading}
            placeholder="Ej: Juan Carlos García"
            className={errors.nombre ? inputError : inputNormal}
          />
          <FieldError msg={errors.nombre} />
        </div>

        {/* CI */}
        <div id="field-ci">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Cédula de Identidad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={form.ci}
            onChange={(e) => change('ci', e.target.value.replace(/\D/g, ''))}
            onBlur={() => blur('ci')}
            disabled={loading}
            placeholder="Ej: 4567890"
            maxLength={8}
            className={errors.ci ? inputError : inputNormal}
          />
          <FieldError msg={errors.ci} />
        </div>

        {/* Teléfono */}
        <div id="field-telefono">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Teléfono celular <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => change('telefono', e.target.value)}
            onBlur={() => blur('telefono')}
            disabled={loading}
            placeholder="Ej: 0981 123 456"
            className={errors.telefono ? inputError : inputNormal}
          />
          <FieldError msg={errors.telefono} />
        </div>

        {/* Dirección y Barrio en grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div id="field-direccion">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Dirección <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.direccion}
              onChange={(e) => change('direccion', e.target.value)}
              onBlur={() => blur('direccion')}
              disabled={loading}
              placeholder="Ej: Av. España 1234"
              className={errors.direccion ? inputError : inputNormal}
            />
            <FieldError msg={errors.direccion} />
          </div>
          <div id="field-barrio">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Barrio / Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.barrio}
              onChange={(e) => change('barrio', e.target.value)}
              onBlur={() => blur('barrio')}
              disabled={loading}
              placeholder="Ej: San Lorenzo"
              className={errors.barrio ? inputError : inputNormal}
            />
            <FieldError msg={errors.barrio} />
          </div>
        </div>
      </SectionCard>

      {/* ── 2. Datos del crédito ── */}
      <SectionCard icon={CreditCard} title="Datos del crédito">
        {/* Monto */}
        <div id="field-monto">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Monto solicitado (Gs.) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] font-medium select-none pointer-events-none">
              Gs.
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={form.monto}
              onChange={(e) => change('monto', e.target.value.replace(/\D/g, ''))}
              onBlur={() => blur('monto')}
              disabled={loading}
              placeholder="1.000.000"
              className={`pl-12 ${errors.monto ? inputError : inputNormal}`}
            />
          </div>
          {montoPreview() && !errors.monto && (
            <p className="text-[12px] text-emerald-600 mt-1 font-medium">{montoPreview()}</p>
          )}
          <FieldError msg={errors.monto} />
          <p className="text-[11.5px] text-gray-400 mt-1">
            Mínimo Gs. 500.000 — Máximo Gs. 200.000.000
          </p>
        </div>

        {/* Tipo y Cuotas en grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div id="field-tipoPrestamo">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Tipo de préstamo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.tipoPrestamo}
                onChange={(e) => change('tipoPrestamo', e.target.value)}
                onBlur={() => blur('tipoPrestamo')}
                disabled={loading}
                className={`appearance-none pr-10 ${errors.tipoPrestamo ? inputError : inputNormal}`}
              >
                <option value="">Seleccioná una opción</option>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <FieldError msg={errors.tipoPrestamo} />
          </div>

          <div id="field-cuotas">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Número de cuotas <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.cuotas}
                onChange={(e) => change('cuotas', e.target.value)}
                onBlur={() => blur('cuotas')}
                disabled={loading}
                className={`appearance-none pr-10 ${errors.cuotas ? inputError : inputNormal}`}
              >
                <option value="">Seleccioná cuotas</option>
                {CUOTAS.map((c) => (
                  <option key={c} value={c}>{c} cuotas</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <FieldError msg={errors.cuotas} />
          </div>
        </div>
      </SectionCard>

      {/* ── 3. Información adicional ── */}
      <SectionCard icon={FileText} title="Información adicional">
        <div id="field-destino">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Destino del crédito <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.destino}
            onChange={(e) => change('destino', e.target.value)}
            onBlur={() => blur('destino')}
            disabled={loading}
            rows={3}
            placeholder="Describe brevemente para qué usarás el crédito (ej: compra de materiales para mi negocio de confecciones)"
            className={`resize-none ${errors.destino ? inputError : inputNormal}`}
          />
          <FieldError msg={errors.destino} />
        </div>

        <div id="field-referencia">
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            Referencia de domicilio{' '}
            <span className="text-[11px] text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            value={form.referencia}
            onChange={(e) => change('referencia', e.target.value)}
            disabled={loading}
            rows={2}
            placeholder="Ej: Casa de color verde, al lado de la farmacia Central"
            className={inputNormal}
          />
        </div>
      </SectionCard>

      {/* ── 4. Autorización legal ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className={`rounded-2xl p-6 md:p-8 border transition-colors ${
          errors.consentimiento
            ? 'bg-red-50 border-red-200'
            : 'bg-emerald-50 border-emerald-100'
        }`}
        id="field-consentimiento"
      >
        <div className="flex items-center gap-3 mb-5">
          <ShieldCheck size={20} className="text-emerald-700 flex-shrink-0" />
          <h2 className="text-[16px] font-bold text-gray-900">Autorización y consentimiento</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 text-[13px] text-gray-600 leading-relaxed space-y-2.5">
          {[
            'Autorizo a Cooperativa Vida & Luz a evaluar mi capacidad crediticia mediante consulta a centrales de riesgo.',
            'Declaro que los datos proporcionados son verídicos y asumo responsabilidad por su veracidad.',
            'Acepto que, en caso de mora, mis datos podrán ser reportados a INFORMCONF u otras centrales de información crediticia.',
            'Autorizo la verificación de datos ante organismos públicos o privados que la cooperativa considere necesarios.',
            'Acepto las condiciones generales de otorgamiento de créditos de Cooperativa Vida & Luz.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentimiento}
            onChange={(e) => {
              change('consentimiento', e.target.checked);
              blur('consentimiento');
            }}
            disabled={loading}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30 flex-shrink-0 cursor-pointer"
          />
          <span className="text-[13.5px] text-gray-700 leading-snug">
            He leído y acepto todas las condiciones anteriores.{' '}
            <strong>
              Entiendo que esta solicitud no constituye aprobación de crédito.
            </strong>
          </span>
        </label>
        <FieldError msg={errors.consentimiento} />
      </motion.div>

      {/* ── Error de API ── */}
      <AnimatePresence>
        {status === 'error' && apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-[14px]"
          >
            <AlertCircle size={16} className="flex-shrink-0" />
            {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/70 text-white py-4 rounded-2xl text-[16px] font-bold transition-all shadow-sm hover:shadow-glow-sm hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando solicitud...
          </>
        ) : (
          'Enviar solicitud de crédito'
        )}
      </button>

      <p className="text-center text-[12px] text-gray-400 pb-4">
        Al enviar, recibirás una confirmación. Tu solicitud será evaluada en 24–48 horas hábiles.
      </p>
    </form>
  );
}
