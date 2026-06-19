import { PrismaClient } from '@prisma/client';
import * as db from '../lib/db';

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Iniciando migración de datos (JSON -> PostgreSQL)...');

  // 1. Roles y Usuarios iniciales (Para poder hacer tracking de creadoPor)
  const superAdminRole = await prisma.rol.upsert({
    where: { nombre: 'SuperAdmin' },
    update: {},
    create: {
      nombre: 'SuperAdmin',
      permisos: ['ALL']
    }
  });

  const adminUser = await prisma.usuario.upsert({
    where: { email: 'admin@vidayluz.com.py' },
    update: {},
    create: {
      email: 'admin@vidayluz.com.py',
      password: 'hashed_default_password', // Mock para el seeder
      nombre: 'Administrador Sistema',
      rolId: superAdminRole.id
    }
  });

  // 2. Migrar Socios
  const sociosJson = db.getAllSocios();
  console.log(`Encontrados ${sociosJson.length} socios en JSON.`);
  
  for (const s of sociosJson) {
    await prisma.socio.upsert({
      where: { numeroSocio: s.numeroSocio },
      update: {},
      create: {
        id: s.id, // Mantenemos el ID original para no romper referencias
        numeroSocio: s.numeroSocio,
        nombre: s.nombre,
        apellido: s.apellido,
        cedula: s.cedula,
        fechaNacimiento: new Date(s.fechaNacimiento),
        telefono: s.telefono,
        email: s.email || null,
        direccion: s.direccion,
        ciudad: s.ciudad,
        profesion: s.profesion || null,
        estadoCivil: s.estadoCivil || null,
        empleador: s.empleador || null,
        estado: s.estado,
        fechaIngreso: new Date(s.fechaIngreso),
        categoriaSocio: s.categoriaSocio,
        aporteMensual: s.aporteMensual,
        saldoAportes: s.saldoAportes,
        creadoPorId: adminUser.id,
        createdAt: new Date(s.createdAt),
      }
    });
    
    // Crear Score asociado
    await prisma.scoreCrediticio.create({
      data: {
        socioId: s.id,
        puntaje: s.scoreCooperativo,
        nivelRiesgo: s.scoreCooperativo >= 80 ? 'Bajo' : s.scoreCooperativo >= 50 ? 'Medio' : 'Alto',
        limiteSugerido: 5000000,
        ultimaEval: new Date()
      }
    });
  }

  // 3. Migrar Solicitudes de Crédito
  const creditosJson = db.getAllCreditos();
  console.log(`Encontrados ${creditosJson.length} créditos en JSON.`);
  
  for (const c of creditosJson) {
    // Buscamos si existe un socio con esa cédula para atarlo
    const socioOwner = await prisma.socio.findUnique({ where: { cedula: c.ci }});
    
    if (socioOwner) {
      await prisma.credito.create({
        data: {
          id: c.id,
          socioId: socioOwner.id,
          montoOriginal: c.monto,
          saldoPendiente: c.estado === 'aprobado' ? c.monto : 0,
          tasaInteresAnual: 18.00,
          plazoMeses: c.cuotas,
          destino: c.destino,
          estado: c.estado === 'pendiente' ? 'Pendiente' : c.estado === 'aprobado' ? 'Activo' : 'Rechazado',
          createdAt: new Date(c.createdAt)
        }
      });
    } else {
      console.warn(`Crédito ${c.id} ignorado por no encontrar Socio asociado (CI: ${c.ci}).`);
    }
  }

  console.log('✅ Migración completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error en seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
