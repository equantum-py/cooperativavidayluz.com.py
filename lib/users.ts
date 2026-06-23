import fs from 'fs';
import path from 'path';
import { hashPassword, comparePassword } from './password';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_USUARIOS = path.join(DATA_DIR, 'usuarios.json');

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  password: string; // Hashed
  rol: 'superadmin' | 'gerencia' | 'socio' | 'cajero' | 'tesorero';
  estado: 'activo' | 'inactivo' | 'suspendido';
  createdAt: string;
  updatedAt: string;
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readUsuarios(): Usuario[] {
  ensureDir();
  if (!fs.existsSync(DB_USUARIOS)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_USUARIOS, 'utf-8'));
  } catch {
    return [];
  }
}

function writeUsuarios(data: Usuario[]) {
  ensureDir();
  fs.writeFileSync(DB_USUARIOS, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getUserByEmail(email: string): Promise<Usuario | null> {
  const users = readUsuarios();
  return users.find(u => u.email === email) || null;
}

export async function getUserById(id: string): Promise<Usuario | null> {
  const users = readUsuarios();
  return users.find(u => u.id === id) || null;
}

export async function createUser(
  email: string,
  password: string,
  nombre: string,
  rol: Usuario['rol'] = 'socio'
): Promise<Usuario> {
  const users = readUsuarios();

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error(`El usuario con email ${email} ya existe`);
  }

  const hashedPassword = await hashPassword(password);
  const now = new Date().toISOString();

  const newUser: Usuario = {
    id: `USER-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    email,
    nombre,
    password: hashedPassword,
    rol,
    estado: 'activo',
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);
  writeUsuarios(users);
  return newUser;
}

export async function validateUserPassword(
  email: string,
  password: string
): Promise<Usuario | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await comparePassword(password, user.password);
  return isValid ? user : null;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<Usuario, 'id' | 'createdAt'>>
): Promise<Usuario | null> {
  const users = readUsuarios();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;

  const updated: Usuario = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  users[index] = updated;
  writeUsuarios(users);
  return updated;
}

export async function getAllUsers(): Promise<Usuario[]> {
  return readUsuarios();
}
