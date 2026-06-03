/**
 * Capa de persistencia JSON — reemplazable por Prisma + DB sin cambios en la API.
 * Los datos se guardan en .data/creditos.json (excluido de git).
 *
 * Para migrar a Prisma:
 *  1. npx prisma init
 *  2. Definir el modelo CreditRequest en schema.prisma
 *  3. Reemplazar las funciones de este archivo por llamadas a prisma.*
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'creditos.json');

export type CreditStatus = 'pendiente' | 'revisado' | 'aprobado' | 'rechazado';

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

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function read(): CreditRequest[] {
  ensureDir();
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as CreditRequest[];
  } catch {
    return [];
  }
}

function write(data: CreditRequest[]) {
  ensureDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllCreditos(): CreditRequest[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createCredito(
  data: Omit<CreditRequest, 'id' | 'createdAt' | 'estado'>
): CreditRequest {
  const records = read();
  const record: CreditRequest = {
    ...data,
    id: `CR-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    estado: 'pendiente',
  };
  records.push(record);
  write(records);
  return record;
}

export function updateCreditoEstado(
  id: string,
  estado: CreditStatus
): CreditRequest | null {
  const records = read();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx].estado = estado;
  write(records);
  return records[idx];
}
