'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface LoginForm {
  ci: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({ ci: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Credenciales inválidas');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/portal';
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-void overflow-hidden">
      {/* ── Left hero panel ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Aurora blobs */}
        <div
          className="pointer-events-none absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-30 animate-aurora-move"
          style={{ background: 'radial-gradient(circle, #007f5f 0%, #2b9348 45%, transparent 75%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full opacity-20 animate-aurora-move-2"
          style={{ background: 'radial-gradient(circle, #55a630 0%, #2b9348 50%, transparent 75%)' }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay" />

        {/* Logo / brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {/* SVG logo mark */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.9" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">Vida &amp; Luz</p>
              <p className="text-emerald-400 text-xs font-medium tracking-widest uppercase">Cooperativa</p>
            </div>
          </div>
        </div>

        {/* Central content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Tu futuro financiero
            <span className="block gradient-text-bright">comienza aquí.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">
            Accedé a tu cuenta, gestioná tus ahorros y aprovechá todos los beneficios de ser socio.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: '+2.400', desc: 'Socios activos' },
              { label: '30 años', desc: 'De trayectoria' },
              { label: '100%', desc: 'Digital' },
            ].map((s) => (
              <div key={s.label} className="glass-dark rounded-2xl px-4 py-3">
                <p className="text-emerald-400 font-bold text-base leading-none">{s.label}</p>
                <p className="text-white/50 text-xs mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card mockup */}
        <div className="relative z-10 animate-float">
          <div className="glass-dark rounded-3xl p-5 max-w-xs">
            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider">Saldo disponible</p>
                <p className="text-white font-bold text-2xl mt-0.5">₲ 4.250.000</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(43,147,72,0.25)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="#2b9348" strokeWidth="2"/>
                  <path d="M2 10h20" stroke="#2b9348" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            {/* Mini transaction list */}
            {[
              { icon: '↑', label: 'Depósito mensual', amount: '+₲ 800.000', color: '#2b9348' },
              { icon: '↓', label: 'Cuota crédito', amount: '-₲ 350.000', color: '#ef4444' },
              { icon: '↑', label: 'Intereses', amount: '+₲ 24.500', color: '#2b9348' },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold w-4" style={{ color: t.color }}>{t.icon}</span>
                  <span className="text-white/70 text-xs">{t.label}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: t.color }}>{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right login panel ───────────────────────────────── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 lg:p-12 relative">
        {/* Subtle bg glow for mobile */}
        <div
          className="lg:hidden pointer-events-none absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, #2b9348 0%, transparent 70%)' }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.9" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">Vida &amp; Luz</p>
              <p className="text-emerald-400 text-xs font-medium tracking-widest uppercase">Cooperativa</p>
            </div>
          </div>

          {/* Glass card */}
          <div className="glass-dark rounded-3xl p-8 lg:p-10" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,127,95,0.2)' }}>
            <h2 className="text-2xl font-bold text-white mb-1">Bienvenido de vuelta</h2>
            <p className="text-white/50 text-sm mb-8">Ingresá con tu Cédula de Identidad</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* CI field */}
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Cédula de Identidad
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M13 10h4M13 14h4M5 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="ci"
                    value={formData.ci}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 1234567"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Ingresá tu contraseña"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-2xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-400 mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Ingresando...
                  </span>
                ) : (
                  'Ingresar al portal'
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-white/30 text-xs mt-6">
              ¿Problemas para ingresar?{' '}
              <a href="https://wa.me/595971000000" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                Contactá soporte
              </a>
            </p>
          </div>

          {/* Below card */}
          <p className="text-center text-white/20 text-xs mt-6">
            © 2025 Cooperativa Vida &amp; Luz · Paraguay
          </p>
        </div>
      </div>
    </div>
  );
}
