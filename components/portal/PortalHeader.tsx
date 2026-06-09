'use client';

interface PortalHeaderProps {
  nombre: string;
  ci: string;
  rol: string;
  onLogout: () => void;
}

const ROL_LABEL: Record<string, string> = {
  admin:    'Administrador',
  socio:    'Socio',
  empleado: 'Empleado',
};

const STATUS_LABEL: Record<string, string> = {
  activo:   'Activo',
  inactivo: 'Inactivo',
  pendiente:'Pendiente',
};

export default function PortalHeader({ nombre, ci, rol }: PortalHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E2E8F0] shrink-0">

      {/* Left — page title */}
      <div>
        <h1 className="text-[#0F172A] font-bold text-[17px] leading-none tracking-tight">
          Portal del Socio
        </h1>
        <p className="text-[#94A3B8] text-xs mt-1.5 capitalize">
          {new Date().toLocaleDateString('es-PY', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Right — user identity, no fake notifications */}
      <div className="flex items-center gap-6">
        {/* Estado badge */}
        <div className="hidden md:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-[#64748B] text-xs font-medium">Cuenta activa</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-[#E2E8F0]" />

        {/* User block */}
        <div className="text-right">
          <p className="text-[#0F172A] text-[13px] font-semibold leading-none">{nombre}</p>
          <p className="text-[#94A3B8] text-[11px] mt-1">
            CI {ci} &nbsp;·&nbsp; {ROL_LABEL[rol] ?? rol}
          </p>
        </div>
      </div>
    </header>
  );
}
