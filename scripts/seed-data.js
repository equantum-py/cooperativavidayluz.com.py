#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), '.data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function generateSocios() {
  const nombres = ['Juan García', 'María López', 'Carlos Rodríguez', 'Ana Martínez', 'Pedro Sánchez'];
  const ciudades = ['Asunción', 'Ciudad del Este', 'Encarnación', 'Villarrica', 'Coronel Oviedo'];

  return nombres.map((nombre, i) => {
    const partes = nombre.split(' ');
    return {
      id: `USER-${Date.now() + i}-${Math.random().toString(36).slice(2, 9)}`,
      numeroSocio: `SOC-${String(i + 1).padStart(6, '0')}`,
      nombre: partes[0],
      apellido: partes[1],
      cedula: String(1000000 + i),
      fechaNacimiento: '1980-01-15',
      telefono: '59835000000',
      email: `socio${i + 1}@ejemplo.com`,
      direccion: `Calle ${i + 1} #123`,
      ciudad: ciudades[i % ciudades.length],
      estado: i === 0 ? 'Activo' : 'Pendiente',
      fechaIngreso: new Date().toISOString(),
      categoriaSocio: 'Regular',
      aporteMensual: 500000,
      saldoAportes: 500000 * (i + 1),
      scoreCooperativo: 50 + i * 10,
      creadoPor: 'Sistema',
      actualizadoPor: 'Sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

function generateAsociaciones() {
  const nombres = ['Laura Fernández', 'Diego Morales', 'Sofia Ramírez'];
  const ciudades = ['Asunción', 'Ciudad del Este', 'Encarnación'];

  return nombres.map((nombre, i) => ({
    id: `ASOC-${Date.now() + i}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date(Date.now() - 1000000 * i).toISOString(),
    nombre,
    ci: String(2000000 + i),
    fechaNacimiento: '1985-03-20',
    telefono: '59835000001',
    email: `solicitud${i + 1}@ejemplo.com`,
    ciudad: ciudades[i],
    direccion: `Avenida Principal #${i + 100}`,
    ocupacion: 'Profesional',
    estado: 'pendiente',
  }));
}

function generateCreditos() {
  const destinos = ['Vivienda', 'Negocio', 'Auto', 'Educación', 'Consumo'];

  return Array.from({ length: 3 }, (_, i) => ({
    id: `CR-${Date.now() + i}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date(Date.now() - 2000000 * i).toISOString(),
    nombre: `Solicitante ${i + 1}`,
    ci: String(3000000 + i),
    telefono: '59835000002',
    direccion: `Dirección ${i + 1}`,
    barrio: 'Centro',
    monto: 1000000 + i * 500000,
    tipoPrestamo: 'Personal',
    cuotas: 12 + i * 6,
    destino: destinos[i % destinos.length],
    estado: ['pendiente', 'revisado', 'aprobado'][i % 3],
  }));
}

function seedData() {
  try {
    ensureDir();

    // Socios
    const socios = generateSocios();
    fs.writeFileSync(
      path.join(DATA_DIR, 'socios.json'),
      JSON.stringify(socios, null, 2)
    );
    console.log(`✓ ${socios.length} socios creados`);

    // Asociaciones
    const asociaciones = generateAsociaciones();
    fs.writeFileSync(
      path.join(DATA_DIR, 'asociaciones.json'),
      JSON.stringify(asociaciones, null, 2)
    );
    console.log(`✓ ${asociaciones.length} solicitudes de asociación creadas`);

    // Créditos
    const creditos = generateCreditos();
    fs.writeFileSync(
      path.join(DATA_DIR, 'creditos.json'),
      JSON.stringify(creditos, null, 2)
    );
    console.log(`✓ ${creditos.length} solicitudes de crédito creadas`);

    console.log('\n✓ Datos de prueba inicializados exitosamente');
  } catch (error) {
    console.error('✗ Error al generar datos:', error.message);
    process.exit(1);
  }
}

seedData();
