'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortalSidebar from '@/components/portal/PortalSidebar';
import PortalHeader from '@/components/portal/PortalHeader';

interface User {
  id: number;
  ci: string;
  nombre: string;
  rol: string;
  estado: string;
}

// ── Small icon components ─────────────────────────────────────────────────────
function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function PiggyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 11V7a4 4 0 00-8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="15" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── Dashboard content section ─────────────────────────────────────────────────
function DashboardSection({ user }: { user: User }) {
  const quickActions = [
    { icon: <PlusIcon />, label: 'Nuevo depósito', color: '#2b9348' },
    { icon: <SendIcon />, label: 'Transferir', color: '#007f5f' },
    { icon: <DownloadIcon />, label: 'Extracto', color: '#55a630' },
    { icon: <HelpIcon />, label: 'Soporte', color: '#80b918' },
  ];

  const transactions = [
    { type: 'in', label: 'Depósito mensual', date: '05 Jun 2025', amount: '+₲ 800.000' },
    { type: 'out', label: 'Cuota crédito #2031', date: '03 Jun 2025', amount: '-₲ 350.000' },
    { type: 'in', label: 'Intereses acumulados', date: '01 Jun 2025', amount: '+₲ 24.500' },
    { type: 'out', label: 'Seguro de vida', date: '28 May 2025', amount: '-₲ 45.000' },
    { type: 'in', label: 'Depósito mensual', date: '05 May 2025', amount: '+₲ 800.000' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome banner */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 md:p-8"
        style={{ background: 'linear-gradient(135deg, #0C1C17 0%, #1A3428 100%)', border: '1px solid rgba(0,127,95,0.2)' }}
      >
        {/* Aurora */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-25 animate-aurora-move"
          style={{ background: 'radial-gradient(circle, #2b9348 0%, transparent 70%)' }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/50 text-sm mb-1">Bienvenido de vuelta,</p>
            <h2 className="text-white font-bold text-2xl">{user.nombre}</h2>
            <p className="text-white/40 text-sm mt-1">CI {user.ci} · Socio {user.estado}</p>
          </div>
          <div
            className="flex items-center gap-2 self-start sm:self-auto rounded-2xl px-4 py-2"
            style={{ background: 'rgba(43,147,72,0.2)', border: '1px solid rgba(43,147,72,0.3)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2b9348' }} />
            <span className="text-white/70 text-xs font-medium">Cuenta activa</span>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'Saldo en ahorros',
            value: '₲ 4.250.000',
            delta: '+3.2% este mes',
            positive: true,
            icon: <PiggyIcon />,
            grad: 'linear-gradient(135deg, rgba(43,147,72,0.18), rgba(0,127,95,0.08))',
            accent: '#2b9348',
          },
          {
            label: 'Crédito disponible',
            value: '₲ 12.000.000',
            delta: 'Cuota: ₲ 350.000',
            positive: null,
            icon: <CardIcon />,
            grad: 'linear-gradient(135deg, rgba(0,127,95,0.18), rgba(12,28,23,0.5))',
            accent: '#007f5f',
          },
          {
            label: 'Puntos de beneficios',
            value: '1.840 pts',
            delta: '+120 este mes',
            positive: true,
            icon: <StarIcon />,
            grad: 'linear-gradient(135deg, rgba(128,185,24,0.15), rgba(12,28,23,0.5))',
            accent: '#80b918',
          },
          {
            label: 'Rendimiento anual',
            value: '8,5 %',
            delta: 'Sobre ahorro total',
            positive: true,
            icon: <TrendUpIcon />,
            grad: 'linear-gradient(135deg, rgba(85,166,48,0.18), rgba(12,28,23,0.5))',
            accent: '#55a630',
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl p-5"
            style={{ background: card.grad, border: '1px solid rgba(0,127,95,0.18)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/50 text-xs font-medium leading-tight">{card.label}</p>
              <span style={{ color: card.accent }}>{card.icon}</span>
            </div>
            <p className="text-white font-bold text-xl mb-1">{card.value}</p>
            <div className="flex items-center gap-1">
              {card.positive === true && <TrendUpIcon />}
              <p className="text-xs" style={{ color: card.positive === true ? '#2b9348' : card.positive === false ? '#ef4444' : 'rgba(255,255,255,0.35)' }}>
                {card.delta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Acciones rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 rounded-2xl py-4 px-3 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(0,127,95,0.10)', border: '1px solid rgba(0,127,95,0.18)' }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${action.color}22`, color: action.color }}
              >
                {action.icon}
              </span>
              <p className="text-white/70 text-xs font-medium text-center leading-tight">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom grid: transactions + member card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Transactions */}
        <div
          className="lg:col-span-2 rounded-3xl p-5"
          style={{ background: 'rgba(0,127,95,0.06)', border: '1px solid rgba(0,127,95,0.15)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Últimos movimientos</h3>
            <button className="text-xs font-medium px-3 py-1 rounded-lg transition-colors" style={{ color: '#2b9348', background: 'rgba(43,147,72,0.12)' }}>
              Ver todos
            </button>
          </div>
          <div className="space-y-1">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
                style={{ borderColor: 'rgba(0,127,95,0.12)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: tx.type === 'in' ? 'rgba(43,147,72,0.18)' : 'rgba(239,68,68,0.12)',
                      color: tx.type === 'in' ? '#2b9348' : '#ef4444',
                    }}
                  >
                    {tx.type === 'in' ? '↑' : '↓'}
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{tx.label}</p>
                    <p className="text-white/30 text-xs">{tx.date}</p>
                  </div>
                </div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: tx.type === 'in' ? '#2b9348' : '#ef4444' }}
                >
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Member card */}
        <div
          className="rounded-3xl p-5 flex flex-col"
          style={{ background: 'linear-gradient(145deg, #122218, #0C1C17)', border: '1px solid rgba(0,127,95,0.2)' }}
        >
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Tu tarjeta de socio</p>

          {/* Virtual card */}
          <div
            className="relative rounded-2xl p-5 flex-1 overflow-hidden mb-4"
            style={{ background: 'linear-gradient(135deg, #007f5f 0%, #2b9348 50%, #55a630 100%)', minHeight: '160px' }}
          >
            {/* Pattern */}
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">Cooperativa</p>
                  <p className="text-white font-bold text-sm">Vida &amp; Luz</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.8"/>
                </svg>
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1">CI</p>
                <p className="text-white font-mono font-bold text-sm tracking-widest">{user.ci}</p>
                <p className="text-white font-semibold text-sm mt-2">{user.nombre}</p>
              </div>
            </div>
          </div>

          {/* Member info */}
          <div className="space-y-2">
            {[
              { label: 'Estado', value: user.estado, color: '#2b9348' },
              { label: 'Rol', value: user.rol === 'socio' ? 'Socio activo' : user.rol },
              { label: 'Nro. socio', value: `#${String(user.id).padStart(5, '0')}` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <p className="text-white/40 text-xs">{row.label}</p>
                <p className="text-xs font-semibold capitalize" style={{ color: row.color ?? 'rgba(255,255,255,0.8)' }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser({
          id: data.user.id,
          ci: data.user.ci,
          nombre: data.user.nombre ?? 'Socio',
          rol: data.user.rol,
          estado: data.user.estado ?? 'activo',
        });
      } catch (error) {
        console.error('Error validating token:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0C1C17' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
            style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <p className="text-white/40 text-sm">Cargando tu portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'creditos':
        return (
          <div className="p-6">
            <div className="rounded-3xl p-8 text-center" style={{ background: 'rgba(0,127,95,0.06)', border: '1px solid rgba(0,127,95,0.15)' }}>
              <p className="text-white font-bold text-xl mb-2">Mis Créditos</p>
              <p className="text-white/40 text-sm mb-6">Gestioná tus créditos activos y solicitá nuevos préstamos.</p>
              <a
                href="/credito/solicitud"
                className="inline-block px-6 py-3 rounded-2xl text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
              >
                Solicitar crédito
              </a>
            </div>
          </div>
        );
      case 'documentos':
        return (
          <div className="p-6">
            <div className="rounded-3xl p-8 text-center" style={{ background: 'rgba(0,127,95,0.06)', border: '1px solid rgba(0,127,95,0.15)' }}>
              <p className="text-white font-bold text-xl mb-2">Documentos</p>
              <p className="text-white/40 text-sm mb-6">Accedé a todos tus documentos y reglamentos.</p>
              <a
                href="/documentos"
                className="inline-block px-6 py-3 rounded-2xl text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
              >
                Ver documentos
              </a>
            </div>
          </div>
        );
      default:
        return <DashboardSection user={user} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A1810' }}>
      {/* Sidebar */}
      <PortalSidebar activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PortalHeader
          nombre={user.nombre}
          ci={user.ci}
          rol={user.rol}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto" style={{ background: '#0A1810' }}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
