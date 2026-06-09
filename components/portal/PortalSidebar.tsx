'use client';

import { Home, FileText, ClipboardList, Star, User, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  userName: string;
  userRole: string;
}

const NAV_MAIN = [
  { id: 'dashboard',   label: 'Inicio',       Icon: Home },
  { id: 'documentos',  label: 'Documentos',   Icon: FileText },
  { id: 'solicitudes', label: 'Solicitudes',  Icon: ClipboardList },
];

const NAV_ACCOUNT = [
  { id: 'perfil',  label: 'Mi Perfil',       Icon: User },
];

const ROL_LABEL: Record<string, string> = {
  admin:    'Administrador',
  socio:    'Socio activo',
  empleado: 'Empleado',
};

export default function PortalSidebar({ activeSection, onNavigate, userName, userRole }: SidebarProps) {
  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 min-h-screen bg-white border-r border-[#E2E8F0]">

      {/* ── Brand ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5 border-b border-[#F1F5F9]">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #2b9348, #1a7a38)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
              fill="white" fillOpacity="0.95" />
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[#0F172A] font-bold text-[13px] leading-none">Vida &amp; Luz</p>
          <p className="text-[#94A3B8] text-[10px] mt-1 uppercase tracking-[0.08em]">Cooperativa</p>
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">

        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.09em] px-2 mb-1.5">
            Principal
          </p>
          {NAV_MAIN.map(({ id, label, Icon }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="flex items-center gap-2.5 w-full px-2.5 py-2.5 rounded-xl text-left transition-colors text-[13.5px]"
                style={{
                  background:  active ? '#F0FDF4' : 'transparent',
                  color:       active ? '#15803D' : '#64748B',
                  fontWeight:  active ? 600 : 500,
                }}
              >
                <Icon size={16} strokeWidth={active ? 2.2 : 1.8}
                  color={active ? '#16A34A' : '#94A3B8'} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[0.09em] px-2 mb-1.5">
            Cuenta
          </p>
          {NAV_ACCOUNT.map(({ id, label, Icon }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="flex items-center gap-2.5 w-full px-2.5 py-2.5 rounded-xl text-left transition-colors text-[13.5px]"
                style={{
                  background:  active ? '#F0FDF4' : 'transparent',
                  color:       active ? '#15803D' : '#64748B',
                  fontWeight:  active ? 600 : 500,
                }}
              >
                <Icon size={16} strokeWidth={active ? 2.2 : 1.8}
                  color={active ? '#16A34A' : '#94A3B8'} />
                {label}
              </button>
            );
          })}
          <button
            onClick={() => onNavigate('logout')}
            className="flex items-center gap-2.5 w-full px-2.5 py-2.5 rounded-xl text-left transition-colors text-[13.5px] text-[#64748B] hover:text-red-600 hover:bg-red-50"
            style={{ fontWeight: 500 }}
          >
            <LogOut size={16} strokeWidth={1.8} />
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* ── User footer ───────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-t border-[#F1F5F9]">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
          style={{ background: 'linear-gradient(135deg, #2b9348, #1a7a38)' }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-[#0F172A] text-[12px] font-semibold truncate leading-none">{userName}</p>
          <p className="text-[#94A3B8] text-[11px] mt-1">{ROL_LABEL[userRole] ?? userRole}</p>
        </div>
      </div>

    </aside>
  );
}
