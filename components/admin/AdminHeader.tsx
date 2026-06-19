'use client';

import { Bell, LogOut, User as UserIcon } from 'lucide-react';
import { currentAdminUser } from '@/lib/roles';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-emerald-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="w-px h-6 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <UserIcon size={18} />
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-900 leading-tight">{currentAdminUser.nombre}</p>
            <p className="text-[11px] font-medium text-emerald-600">{currentAdminUser.rol}</p>
          </div>
        </div>

        {/* Logout */}
        <button className="text-gray-400 hover:text-red-600 transition-colors ml-2" title="Cerrar sesión">
          <LogOut size={18} />
        </button>

      </div>
    </header>
  );
}
