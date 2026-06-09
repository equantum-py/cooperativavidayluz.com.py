'use client';

interface PortalHeaderProps {
  nombre: string;
  ci: string;
  rol: string;
  onLogout: () => void;
  onMenuOpen?: () => void;
}

export default function PortalHeader({ nombre, ci, rol, onLogout, onMenuOpen }: PortalHeaderProps) {
  const initials = nombre
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const rolLabel: Record<string, string> = {
    admin: 'Administrador',
    socio: 'Socio',
    empleado: 'Empleado',
  };

  return (
    <header
      className="flex items-center justify-between px-6 py-4 shrink-0"
      style={{ background: '#0C1C17', borderBottom: '1px solid rgba(0,127,95,0.15)' }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden text-white/50 hover:text-white transition-colors mr-4"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-white font-bold text-lg leading-none">Portal del Socio</h1>
        <p className="text-white/40 text-xs mt-0.5">Panel de control · {new Date().toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative text-white/40 hover:text-white/70 transition-colors p-2 rounded-xl hover:bg-white/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#2b9348' }} />
        </button>

        {/* User chip */}
        <div
          className="flex items-center gap-3 rounded-2xl px-3 py-2 cursor-default"
          style={{ background: 'rgba(43,147,72,0.12)', border: '1px solid rgba(43,147,72,0.2)' }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
            style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
          >
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-semibold leading-none">{nombre}</p>
            <p className="text-white/40 text-xs mt-0.5">CI: {ci} · {rolLabel[rol] ?? rol}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="text-white/40 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10"
          title="Cerrar sesión"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
