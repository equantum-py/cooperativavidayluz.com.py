#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_USUARIOS = path.join(DATA_DIR, 'usuarios.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsuarios() {
  ensureDir();
  if (!fs.existsSync(DB_USUARIOS)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_USUARIOS, 'utf-8'));
  } catch {
    return [];
  }
}

function writeUsuarios(data) {
  ensureDir();
  fs.writeFileSync(DB_USUARIOS, JSON.stringify(data, null, 2), 'utf-8');
}

async function seedAdmin() {
  try {
    const users = readUsuarios();

    // Check if admin already exists
    const adminExists = users.find(u => u.email === 'admin@cooperativa.com');
    if (adminExists) {
      console.log('✓ Usuario admin ya existe: admin@cooperativa.com');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const now = new Date().toISOString();

    const adminUser = {
      id: `USER-${Date.now()}-ADMIN001`,
      email: 'admin@cooperativa.com',
      nombre: 'Administrador del Sistema',
      password: hashedPassword,
      rol: 'superadmin',
      estado: 'activo',
      createdAt: now,
      updatedAt: now,
    };

    users.push(adminUser);
    writeUsuarios(users);

    console.log('✓ Usuario admin creado exitosamente');
    console.log('  Email: admin@cooperativa.com');
    console.log('  Contraseña: admin123');
    console.log('  Rol: superadmin');
  } catch (error) {
    console.error('✗ Error al crear usuario admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();
