'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ClipboardList, Star, User, ArrowRight } from 'lucide-react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import PortalHeader from '@/components/portal/PortalHeader';

interface User {
  id: number;
  ci: string;
  nombre: string;
  rol: string;
  estado: string;
}

// ── Access cards ──────────────────────────────────────────────────────────────
const ACCESS_CARDS = [
  {
    id: 'documentos',
    title: 'Documentos',
    description: 'Reglamentos, estatutos y formularios disponibles para socios.',
    Icon: FileText,
    iconColor: '#2B9348',
    iconBg: '#F0FDF4',
    linkLabel: 'Ver documentos',
    linkColor: '#2B9348',
    href: '/documentos',
  },
  {
    id: 'solicitudes',
    title: 'Solicitudes',
    description: 'Consultá el estado de tus trámites y solicitudes activas.',
    Icon: ClipboardList,
    iconColor: '#2563EB',
    iconBg: '#EFF6FF',
    linkLabel: 'Ver solicitudes',
    linkColor: '#2563EB',
    href: '/credito/solicitud',
  },
  {
    id: 'beneficios',
    title: 'Beneficios',
    description: 'Conocé los convenios y beneficios exclusivos para socios.',
    Icon: Star,
    iconColor: '#D97706',
    iconBg: '#FFFBEB',
    linkLabel: 'Ver beneficios',
    linkColor: '#D97706',
    href: '/',
  },
  {
    id: 'perfil',
    title: 'Mi Perfil',
    description: 'Actualizá tus datos de contacto e información personal.',
    Icon: User,
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    linkLabel: 'Ver perfil',
    linkColor: '#7C3AED',
    href: '#',
  },
] as const;

// ── Shield illustration (inline SVG, no image files) ─────────────────────────
function InstitutionalIllustration() {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="70" cy="60" r="52" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Mid ring */}
      <circle cx="70" cy="60" r="36" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      {/* Shield */}
      <path
        d="M70 26L46 36v15c0 13.5 10.2 26.1 24 29.4C83.8 77.1 94 64.5 94 51V36L70 26z"
        fill="#F0FDF4"
        stroke="#2B9348"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Check inside shield */}
      <path
        d="M61 51l6 6 12-12"
        stroke="#2B9348"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative dots */}
      <circle cx="30" cy="38" r="3.5" fill="#E2E8F0" />
      <circle cx="110" cy="82" r="3.5" fill="#E2E8F0" />
      <circle cx="116" cy="34" r="2.5" fill="#BBF7D0" />
      <circle cx="24" cy="82" r="2.5" fill="#BBF7D0" />
      {/* Small lines */}
      <line x1="20" y1="58" x2="34" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="106" y1="58" x2="120" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Dashboard section ─────────────────────────────────────────────────────────
function DashboardContent({ user }: { user: User }) {
  const ROL_LABEL: Record<string, string> = {
    admin: 'Administrador', socio: 'Socio', empleado: 'Empleado',
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        {/* ── Hero de bienvenida ─────────────────────────── */}
        <section
          className="bg-white rounded-2xl border border-[#E2E8F0] px-10 py-9 flex items-center justify-between gap-6"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
        >
          <div className="flex-1 max-w-[520px]">
            <p className="text-[#2B9348] text-sm font-semibold mb-3">
              Portal del Socio
            </p>
            <h2 className="text-[#0F172A] text-2xl font-bold tracking-tight leading-snug mb-4">
              Bienvenido al Portal del Socio
            </h2>
            <p className="text-[#64748B] text-[14.5px] leading-relaxed">
              Bienvenido al Portal del Socio de la Cooperativa Vida &amp; Luz.
              Desde este espacio podrás gestionar tus documentos, consultar
              solicitudes, acceder a beneficios exclusivos y mantener actualizada
              tu información, todo en un entorno seguro y diseñado para nuestros
              socios.
            </p>
          </div>
          <div className="hidden md:block shrink-0 opacity-80">
            <InstitutionalIllustration />
          </div>
        </section>

        {/* ── Acceso rápido ──────────────────────────────── */}
        <section>
          <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.09em] mb-4">
            Acceso rápido
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {ACCESS_CARDS.map(({ id, title, description, Icon, iconColor, iconBg, linkLabel, linkColor, href }) => (
              <a
                key={id}
                href={href}
                className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col transition-all no-underline"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: iconBg }}
                >
                  <Icon size={20} color={iconColor} strokeWidth={1.8} />
                </div>
                <p className="text-[#0F172A] font-semibold text-[14px] mb-1.5">{title}</p>
                <p className="text-[#64748B] text-[12.5px] leading-relaxed flex-1">{description}</p>
                <div
                  className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold"
                  style={{ color: linkColor }}
                >
                  {linkLabel}
                  <ArrowRight size={12} strokeWidth={2.2} color={linkColor} />
                </div>
              </a>
            ))}
          </div>
        </section>


        {/* ── Resumen financiero ───────────────────── */}
        <section>
          <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.09em] mb-4">
            Resumen financiero
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <p className="text-sm text-[#64748B]">Ahorro acumulado</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-2">₲ 18.500.000</h3>
              <p className="text-xs text-[#94A3B8] mt-2">Actualizado este mes</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <p className="text-sm text-[#64748B]">Disponible</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-2">₲ 6.250.000</h3>
              <p className="text-xs text-[#94A3B8] mt-2">Saldo utilizable</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <p className="text-sm text-[#64748B]">Préstamo activo</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-2">₲ 12.000.000</h3>
              <p className="text-xs text-[#94A3B8] mt-2">Crédito vigente</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <p className="text-sm text-[#64748B]">Cuota pendiente</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-2">₲ 350.000</h3>
              <p className="text-xs text-[#94A3B8] mt-2">Vence 15/06/2026</p>
            </div>
          </div>
        </section>

        {/* ── Información de cuenta ─────────────────────── */}
        <section>
          <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.09em] mb-4">
            Mi cuenta
          </p>
          <div
            className="bg-white rounded-2xl border border-[#E2E8F0]"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
          >
            {[
              { key: 'Nombre completo',     value: user.nombre },
              { key: 'Cédula de Identidad', value: user.ci },
              {
                key: 'Estado de cuenta',
                value: user.estado,
                highlight: true,
              },
              { key: 'Categoría',           value: ROL_LABEL[user.rol] ?? user.rol },
              { key: 'Número de socio',      value: `#${String(user.id).padStart(5, '0')}` },
            ].map((row, i, arr) => (
              <div
                key={row.key}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none',
                }}
              >
                <span className="text-[#64748B] text-sm">{row.key}</span>
                {row.highlight ? (
                  <span
                    className="text-[12px] font-semibold px-3 py-1 rounded-full capitalize"
                    style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}
                  >
                    {row.value}
                  </span>
                ) : (
                  <span className="text-[#0F172A] text-sm font-semibold">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// ── Generic section placeholder ───────────────────────────────────────────────
function SectionPlaceholder({ title, body, linkLabel, href }: {
  title: string; body: string; linkLabel?: string; href?: string;
}) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-8 py-16 text-center">
        <h2 className="text-[#0F172A] font-bold text-xl mb-3">{title}</h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-6">{body}</p>
        {href && linkLabel && (
          <a
            href={href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: '#2B9348' }}
          >
            {linkLabel}
            <ArrowRight size={14} strokeWidth={2.2} />
          </a>
        )}
      </div>
    </main>
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
        if (!response.ok) { router.push('/login'); return; }
        const data = await response.json();
        setUser({
          id:     data.user.id,
          ci:     data.user.ci,
          nombre: data.user.nombre ?? 'Socio',
          rol:    data.user.rol,
          estado: data.user.estado ?? 'activo',
        });
      } catch {
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

  const handleNavigate = (section: string) => {
    if (section === 'logout') { handleLogout(); return; }
    setActiveSection(section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2b9348, #1a7a38)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="white" fillOpacity="0.95" />
            </svg>
          </div>
          <p className="text-[#94A3B8] text-sm">Cargando portal…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'documentos':
        return (
          <SectionPlaceholder
            title="Mis Documentos"
            body="Accedé a todos los documentos disponibles: reglamentos, estatutos y formularios."
            linkLabel="Ir a documentos"
            href="/documentos"
          />
        );
      case 'solicitudes':
        return (
          <SectionPlaceholder
            title="Mis Solicitudes"
            body="Consultá el estado de tus trámites activos y presentá nuevas solicitudes."
            linkLabel="Solicitar crédito"
            href="/credito/solicitud"
          />
        );
      case 'beneficios':
        return (
          <SectionPlaceholder
            title="Beneficios para Socios"
            body="Todos los convenios y beneficios exclusivos disponibles para socios activos."
          />
        );
      case 'perfil':
        return (
          <SectionPlaceholder
            title="Mi Perfil"
            body="Actualizá tus datos de contacto y preferencias de cuenta."
          />
        );
      case 'ayuda':
        return (
          <SectionPlaceholder
            title="Centro de Ayuda"
            body="Contactá con nuestro equipo de soporte vía WhatsApp o en nuestras oficinas."
          />
        );
      default:
        return <DashboardContent user={user} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <PortalSidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        userName={user.nombre}
        userRole={user.rol}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PortalHeader
          nombre={user.nombre}
          ci={user.ci}
          rol={user.rol}
          onLogout={handleLogout}
        />
        {renderSection()}
      </div>
    </div>
  );
}
