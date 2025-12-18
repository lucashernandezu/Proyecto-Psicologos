import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Hashear contraseña
  const passwordHash = await bcrypt.hash('Admin123!', 10);

  // Crear primer admin
  const admin = await prisma.psicologo.create({
    data: {
      nombre: 'Admin',
      apellido_paterno: 'Sistema',
      apellido_materno: 'Principal',
      rut: '11111111-1',
      email: 'admin@psicologos.cl',
      password_hash: passwordHash,
      telefono: '+56912345678',
      perfil_profesional: 'Administrador del sistema',
      especialidad: 'Administración',
      es_administrador: true,
      activo: true,
    },
  });

  console.log('✅ Admin creado:', {
    id: admin.psicologo_id,
    nombre: admin.nombre,
    email: admin.email,
    es_admin: admin.es_administrador
  });
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
