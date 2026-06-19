export type AdminRole = 
  | 'SuperAdmin' 
  | 'Gerencia' 
  | 'Créditos' 
  | 'Tesorería' 
  | 'AtenciónSocio' 
  | 'Consulta';

export interface AdminUser {
  id: string;
  nombre: string;
  email: string;
  rol: AdminRole;
}

// Mock user for UI demonstration
export const currentAdminUser: AdminUser = {
  id: 'USR-001',
  nombre: 'Carlos Gerente',
  email: 'carlos@vidayluz.com.py',
  rol: 'SuperAdmin'
};
