import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const AUDIT_LOG = path.join(DATA_DIR, 'auditoria.json');

export interface AuditEntry {
  id: string;
  usuarioId: string;
  usuarioEmail: string;
  accion: 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'LOGIN' | 'LOGOUT';
  entidad: string;
  entidadId: string;
  detalles: Record<string, unknown>;
  ip?: string;
  fecha: string;
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readAudit(): AuditEntry[] {
  ensureDir();
  if (!fs.existsSync(AUDIT_LOG)) return [];
  try {
    return JSON.parse(fs.readFileSync(AUDIT_LOG, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAudit(data: AuditEntry[]) {
  ensureDir();
  fs.writeFileSync(AUDIT_LOG, JSON.stringify(data, null, 2), 'utf-8');
}

export function logAudit(
  usuarioId: string,
  usuarioEmail: string,
  accion: AuditEntry['accion'],
  entidad: string,
  entidadId: string,
  detalles: Record<string, unknown> = {},
  ip?: string
): AuditEntry {
  const entries = readAudit();

  const entry: AuditEntry = {
    id: `AUDIT-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    usuarioId,
    usuarioEmail,
    accion,
    entidad,
    entidadId,
    detalles,
    ip,
    fecha: new Date().toISOString(),
  };

  entries.push(entry);
  writeAudit(entries);
  return entry;
}

export function getAuditLog(
  filter?: {
    usuarioId?: string;
    entidad?: string;
    accion?: string;
    desde?: string;
    hasta?: string;
  }
): AuditEntry[] {
  let entries = readAudit();

  if (filter?.usuarioId) {
    entries = entries.filter(e => e.usuarioId === filter.usuarioId);
  }
  if (filter?.entidad) {
    entries = entries.filter(e => e.entidad === filter.entidad);
  }
  if (filter?.accion) {
    entries = entries.filter(e => e.accion === filter.accion);
  }
  if (filter?.desde) {
    entries = entries.filter(e => new Date(e.fecha) >= new Date(filter.desde!));
  }
  if (filter?.hasta) {
    entries = entries.filter(e => new Date(e.fecha) <= new Date(filter.hasta!));
  }

  return entries.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}
