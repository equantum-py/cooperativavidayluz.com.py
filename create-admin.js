const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.create({
    data: {
      ci: '1234567',
      nombre: 'Administrador',
      email: 'admin@cooperativavidayluz.com.py',
      password,
      rol: 'admin',
      estado: 'activo'
    }
  });

  console.log('Usuario creado:');
  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
