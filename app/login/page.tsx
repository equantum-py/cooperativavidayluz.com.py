'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Shield, Lock, CreditCard, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginForm {
  ci: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({ ci: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Credenciales inválidas');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data.user));
      window.location.href = '/portal';
    } catch {
      setError('Ocurrió un error. Intentá nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* ─────────────────── LEFT — institutional panel ──────────────────── */}
      <div
        className="hidden lg:flex lg:w-[52%] flex-col justify-between border-r border-[#E2E8F0] px-14 py-12 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.82)), url('/images/login-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        {/* Very subtle radial tint — no glow, just ambient warmth */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[440px] h-[440px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(43,147,72,0.045) 0%, transparent 65%)' }} />
        <div className="pointer-events-none absolute -bottom-28 -left-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(43,147,72,0.03) 0%, transparent 65%)' }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #2B9348, #1a7a38)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="white" fillOpacity="0.95" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-[#0F172A] font-bold text-[17px] leading-none">Cooperativa Vida &amp; Luz</p>
            <p className="text-[#94A3B8] text-[11px] mt-1 tracking-[0.1em] uppercase">Juntos, construimos futuro</p>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative flex-1 flex flex-col justify-center py-16 max-w-[440px]">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 w-fit border"
            style={{ background: '#F0FDF4', borderColor: '#BBF7D0', color: '#15803D' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Portal del Socio
          </div>

          <h1 className="text-[42px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-5">
            Tu cooperativa,<br />
            siempre <span style={{ color: '#2B9348' }}>contigo.</span>
          </h1>

          <p className="text-[#64748B] text-[16.5px] leading-relaxed">
            Accedé a todos tus servicios y beneficios de forma segura. Gestioná
            tus documentos, solicitudes y más desde un solo lugar.
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { Icon: Shield, label: 'Conexión segura' },
              { Icon: Lock,   label: 'Datos encriptados' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium text-[#64748B]"
                style={{ background: '#F8FAFC', borderColor: '#E2E8F0' }}
              >
                <Icon size={14} color="#2B9348" strokeWidth={2} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[#CBD5E1] text-xs relative">
          © 2025 Cooperativa Vida &amp; Luz · Asunción, Paraguay
        </p>
      </div>

      {/* ─────────────────── RIGHT — login card ─────────────────────────── */}
      <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-12 bg-[#F8FAFC] relative">

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-7 left-6 flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2B9348, #1a7a38)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="white" fillOpacity="0.95" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#0F172A] font-bold text-sm">Vida &amp; Luz</p>
        </div>

        <div className="w-full max-w-md">
          <div
            className="bg-white rounded-3xl border border-[#E2E8F0] px-10 py-11"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07)' }}
          >
            {/* Card header */}
            <div className="mb-9">
              <h2 className="text-[26px] font-bold text-[#0F172A] tracking-tight mb-1.5">
                Iniciá sesión
              </h2>
              <p className="text-[#94A3B8] text-sm">Ingresá con tu Cédula de Identidad</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* CI */}
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.08em] mb-2">
                  Cédula de Identidad
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1]">
                    <CreditCard size={15} strokeWidth={1.8} />
                  </span>
                  <input
                    type="text"
                    name="ci"
                    value={formData.ci}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 1234567"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-[#CBD5E1] rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all focus:border-[#2B9348] focus:bg-white"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.08em] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1]">
                    <Lock size={15} strokeWidth={1.8} />
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Ingresá tu contraseña"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-[#CBD5E1] rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all focus:border-[#2B9348] focus:bg-white"
                    style={{ fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-[#94A3B8] transition-colors"
                  >
                    {showPw
                      ? <EyeOff size={15} strokeWidth={1.8} />
                      : <Eye    size={15} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] accent-[#2B9348]" />
                  Recordarme
                </label>
                <button type="button" className="text-sm font-medium" style={{ color: '#2B9348' }}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-2.5 rounded-xl px-4 py-3 border text-sm leading-snug"
                  style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#B91C1C' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" className="mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
                    <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                style={{ background: '#2B9348', boxShadow: '0 2px 8px rgba(43,147,72,0.25)' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Ingresando…
                  </>
                ) : (
                  <>
                    Ingresar al portal
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <div
              className="flex items-start gap-2.5 rounded-xl px-4 py-3 mt-5 border"
              style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}
            >
              <Shield size={14} color="#16A34A" strokeWidth={2} className="mt-0.5 shrink-0" />
              <p className="text-xs leading-snug" style={{ color: '#15803D' }}>
                Tus datos están protegidos con encriptación bancaria SSL/TLS.
              </p>
            </div>

            <div className="flex items-center gap-3 my-5">
              <hr className="flex-1 border-[#F1F5F9]" />
              <span className="text-[#CBD5E1] text-xs">o</span>
              <hr className="flex-1 border-[#F1F5F9]" />
            </div>

            <p className="text-center text-[#94A3B8] text-sm">
              ¿Problemas para ingresar?{' '}
              <a href="https://wa.me/595971000000" className="font-medium" style={{ color: '#2B9348' }}>
                Contactá soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
