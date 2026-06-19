/**
 * Capa de persistencia JSON — reemplazable por Prisma + DB sin cambios en la API.
 * Los datos se guardan en .data/ (excluido de git).
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_CREDITOS = path.join(DATA_DIR, 'creditos.json');
const DB_ASOC = path.join(DATA_DIR, 'asociaciones.json');
const DB_SOCIOS = path.join(DATA_DIR, 'socios.json');

export type CreditStatus = 'pendiente' | 'revisado' | 'aprobado' | 'rechazado';
export type SocioStatus = 'Pendiente' | 'Activo' | 'Suspendido' | 'Inactivo' | 'Renunció' | 'Fallecido';

export type CreditRequest = {
  id: string;
  createdAt: string;
  nombre: string;
  ci: string;
  telefono: string;
  direccion: string;
  barrio: string;
  monto: number;
  tipoPrestamo: string;
  cuotas: number;
  destino: string;
  referencia?: string;
  estado: CreditStatus;
};

export type AsociacionRequest = {
  id: string;
  createdAt: string;
  nombre: string;
  ci: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  ciudad: string;
  direccion: string;
  ocupacion: string;
  observaciones?: string;
  estado: CreditStatus;
};

export type Socio = {
  id: string;
  // DATOS PERSONALES
  numeroSocio: string;
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  estadoCivil?: string;
  profesion?: string;
  empleador?: string;
  
  // ESTADO DEL SOCIO
  estado: SocioStatus;
  
  // DATOS COOPERATIVOS
  fechaIngreso: string;
  categoriaSocio: string;
  aporteMensual: number;
  saldoAportes: number;
  scoreCooperativo: number;
  
  // BENEFICIARIOS
  nombreBeneficiario?: string;
  parentesco?: string;
  telefonoBeneficiario?: string;
  
  // DOCUMENTOS
  cedulaAdjunta?: boolean;
  comprobanteIngreso?: boolean;
  otrosDocumentos?: boolean;
  
  // HISTORIAL
  createdAt: string;
  updatedAt: string;
  creadoPor: string;
  actualizadoPor: string;
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// --- CREDITOS ---
function readCreditos(): CreditRequest[] {
  ensureDir();
  if (!fs.existsSync(DB_CREDITOS)) return [];
  try { return JSON.parse(fs.readFileSync(DB_CREDITOS, 'utf-8')); } catch { return []; }
}

function writeCreditos(data: CreditRequest[]) {
  ensureDir();
  fs.writeFileSync(DB_CREDITOS, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllCreditos(): CreditRequest[] {
  return readCreditos().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createCredito(data: Omit<CreditRequest, 'id' | 'createdAt' | 'estado'>): CreditRequest {
  const records = readCreditos();
  const record: CreditRequest = {
    ...data,
    id: `CR-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    estado: 'pendiente',
  };
  records.push(record);
  writeCreditos(records);
  return record;
}

export function updateCreditoEstado(id: string, estado: CreditStatus): CreditRequest | null {
  const records = readCreditos();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx].estado = estado;
  writeCreditos(records);
  return records[idx];
}

// --- ASOCIACIONES ---
function readAsoc(): AsociacionRequest[] {
  ensureDir();
  if (!fs.existsSync(DB_ASOC)) return [];
  try { return JSON.parse(fs.readFileSync(DB_ASOC, 'utf-8')); } catch { return []; }
}

function writeAsoc(data: AsociacionRequest[]) {
  ensureDir();
  fs.writeFileSync(DB_ASOC, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllAsociaciones(): AsociacionRequest[] {
  return readAsoc().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAsociacionById(id: string): AsociacionRequest | null {
  return readAsoc().find(r => r.id === id) || null;
}

export function createAsociacion(data: Omit<AsociacionRequest, 'id' | 'createdAt' | 'estado'>): AsociacionRequest {
  const records = readAsoc();
  const record: AsociacionRequest = {
    ...data,
    id: `ASOC-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    estado: 'pendiente',
  };
  records.push(record);
  writeAsoc(records);
  return record;
}

export function updateAsociacionEstado(id: string, estado: CreditStatus): AsociacionRequest | null {
  const records = readAsoc();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx].estado = estado;
  writeAsoc(records);
  return records[idx];
}

// --- SOCIOS ---
function readSocios(): Socio[] {
  ensureDir();
  if (!fs.existsSync(DB_SOCIOS)) return [];
  try { return JSON.parse(fs.readFileSync(DB_SOCIOS, 'utf-8')); } catch { return []; }
}

function writeSocios(data: Socio[]) {
  ensureDir();
  fs.writeFileSync(DB_SOCIOS, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllSocios(): Socio[] {
  return readSocios().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getSocioById(id: string): Socio | null {
  return readSocios().find(s => s.id === id) || null;
}

export function getSocioByNumero(numeroSocio: string): Socio | null {
  return readSocios().find(s => s.numeroSocio === numeroSocio) || null;
}

export function createSocio(data: Omit<Socio, 'id' | 'createdAt' | 'updatedAt' | 'numeroSocio' | 'scoreCooperativo'>): Socio {
  const records = readSocios();
  const currentCount = records.length;
  const newNum = String(currentCount + 1).padStart(6, '0');
  
  const record: Socio = {
    ...data,
    id: `USER-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    numeroSocio: `SOC-${newNum}`,
    scoreCooperativo: 50, // Score inicial por defecto
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  records.push(record);
  writeSocios(records);
  return record;
}

// --- LOGICA DE APROBACION ---
export function approveSocioFromAsociacion(asocId: string, aprobadoPor: string): Socio | null {
  const asoc = getAsociacionById(asocId);
  if (!asoc || asoc.estado === 'aprobado') return null;

  // Actualizar estado de asociacion a aprobado
  updateAsociacionEstado(asocId, 'aprobado');

  // Separar nombre y apellido crudamente (para el mock)
  const parts = asoc.nombre.split(' ');
  const apellido = parts.length > 1 ? parts.slice(1).join(' ') : '';
  const nombre = parts[0];

  return createSocio({
    nombre,
    apellido,
    cedula: asoc.ci,
    fechaNacimiento: asoc.fechaNacimiento,
    telefono: asoc.telefono,
    email: asoc.email || '',
    direccion: asoc.direccion,
    ciudad: asoc.ciudad,
    profesion: asoc.ocupacion,
    estado: 'Activo',
    fechaIngreso: new Date().toISOString(),
    categoriaSocio: 'Regular',
    aporteMensual: 50000,
    saldoAportes: 0,
    creadoPor: aprobadoPor,
    actualizadoPor: aprobadoPor,
  });
}
