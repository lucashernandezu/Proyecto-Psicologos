import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (en orden correcto por las FKs)
  console.log('🗑️  Limpiando datos anteriores...');
  await prisma.webpay.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.fonasa.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.unregisteredPatient.deleteMany();
  await prisma.registeredPatient.deleteMany();
  await prisma.psychologist.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Datos anteriores eliminados');

  // Hash para contraseñas (todas serán "password123")
  const hashedPassword = await bcrypt.hash('password123', 10);

  // ========== CREAR USUARIOS ==========
  console.log('👥 Creando usuarios...');
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@psicologos.cl',
      password: hashedPassword,
      role: 'ADMIN',
      first_name: 'Admin',
      last_name: 'Sistema',
      phone: '+56912345678',
      rut: '11111111-1', // ✅ Válido
      is_active: true,
    },
  });

  const psychologist1User = await prisma.user.create({
    data: {
      email: 'maria.gonzalez@psicologos.cl',
      password: hashedPassword,
      role: 'PSYCHOLOGIST',
      first_name: 'María',
      last_name: 'González',
      phone: '+56987654321',
      rut: '22222222-2', // ✅ Válido
      is_active: true,
    },
  });

  const psychologist2User = await prisma.user.create({
    data: {
      email: 'pedro.silva@psicologos.cl',
      password: hashedPassword,
      role: 'PSYCHOLOGIST',
      first_name: 'Pedro',
      last_name: 'Silva',
      phone: '+56987654322',
      rut: '12345678-5', // ✅ Cambiado (55555555-5 es inválido)
      is_active: true,
    },
  });

  const patient1User = await prisma.user.create({
    data: {
      email: 'juan.perez@example.com',
      password: hashedPassword,
      role: 'PATIENT',
      first_name: 'Juan',
      last_name: 'Pérez',
      phone: '+56911111111',
      rut: '33333333-3', // ✅ Válido
      is_active: true,
    },
  });

  const patient2User = await prisma.user.create({
    data: {
      email: 'ana.torres@example.com',
      password: hashedPassword,
      role: 'PATIENT',
      first_name: 'Ana',
      last_name: 'Torres',
      phone: '+56911111112',
      rut: '7654321-6', // ✅ Cambiado (66666666-6 es inválido)
      is_active: true,
    },
  });

  console.log('✅ 5 usuarios creados');

  // ========== CREAR PSICÓLOGOS ==========
  console.log('🧠 Creando psicólogos...');

  const psychologist1 = await prisma.psychologist.create({
    data: {
      user_id: psychologist1User.id,
      specialization: 'Psicología Clínica y Terapia Cognitivo-Conductual',
      bio: 'Psicóloga con 10 años de experiencia en terapia cognitivo-conductual. Especializada en tratamiento de ansiedad y depresión.',
      photo_url: 'https://randomuser.me/api/portraits/women/44.jpg',
      fonasa_code: 'PSI001',
      fonasa_level: 'Nivel 3',
      is_active: true,
    },
  });

  const psychologist2 = await prisma.psychologist.create({
    data: {
      user_id: psychologist2User.id,
      specialization: 'Psicología Infantil y del Adolescente',
      bio: 'Psicólogo especializado en niños y adolescentes. 8 años de experiencia en terapia familiar.',
      photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
      fonasa_code: 'PSI002',
      fonasa_level: 'Nivel 2',
      is_active: true,
    },
  });

  console.log('✅ 2 psicólogos creados');

  // ========== CREAR PACIENTES REGISTRADOS ==========
  console.log('👤 Creando pacientes registrados...');

  const registeredPatient1 = await prisma.registeredPatient.create({
    data: {
      user_id: patient1User.id,
      needs_assistance: false,
      consent: true,
    },
  });

  const registeredPatient2 = await prisma.registeredPatient.create({
    data: {
      user_id: patient2User.id,
      needs_assistance: true,
      consent: true,
    },
  });

  console.log('✅ 2 pacientes registrados creados');

  // ========== CREAR PACIENTES NO REGISTRADOS ==========
  console.log('👥 Creando pacientes no registrados...');

  const unregisteredPatient1 = await prisma.unregisteredPatient.create({
    data: {
      email: 'carlos.silva@example.com',
      first_name: 'Carlos',
      last_name: 'Silva',
      phone: '+56922222222',
      rut: '44444444-4', // ✅ Válido
      consent: true,
    },
  });

  const unregisteredPatient2 = await prisma.unregisteredPatient.create({
    data: {
      email: 'lucia.morales@example.com',
      first_name: 'Lucía',
      last_name: 'Morales',
      phone: '+56922222223',
      rut: '99999999-9', // ✅ Cambiado (77777777-7 es inválido)
      consent: true,
    },
  });

  console.log('✅ 2 pacientes no registrados creados');

  // ========== CREAR DISPONIBILIDADES ==========
  console.log('📅 Creando disponibilidades...');

  await prisma.availability.createMany({
    data: [
      // Psicóloga María - Lunes a Viernes
      {
        psychologist_id: psychologist1.id,
        day_of_week: 'MONDAY',
        start_time: new Date('1970-01-01T09:00:00Z'),
        end_time: new Date('1970-01-01T13:00:00Z'),
        modality: 'PRESENCIAL',
        is_active: true,
      },
      {
        psychologist_id: psychologist1.id,
        day_of_week: 'MONDAY',
        start_time: new Date('1970-01-01T14:00:00Z'),
        end_time: new Date('1970-01-01T18:00:00Z'),
        modality: 'ONLINE',
        is_active: true,
      },
      {
        psychologist_id: psychologist1.id,
        day_of_week: 'WEDNESDAY',
        start_time: new Date('1970-01-01T10:00:00Z'),
        end_time: new Date('1970-01-01T14:00:00Z'),
        modality: 'PRESENCIAL',
        is_active: true,
      },
      {
        psychologist_id: psychologist1.id,
        day_of_week: 'FRIDAY',
        start_time: new Date('1970-01-01T09:00:00Z'),
        end_time: new Date('1970-01-01T12:00:00Z'),
        modality: 'ONLINE',
        is_active: true,
      },
      // Psicólogo Pedro - Martes y Jueves
      {
        psychologist_id: psychologist2.id,
        day_of_week: 'TUESDAY',
        start_time: new Date('1970-01-01T15:00:00Z'),
        end_time: new Date('1970-01-01T19:00:00Z'),
        modality: 'PRESENCIAL',
        is_active: true,
      },
      {
        psychologist_id: psychologist2.id,
        day_of_week: 'THURSDAY',
        start_time: new Date('1970-01-01T15:00:00Z'),
        end_time: new Date('1970-01-01T19:00:00Z'),
        modality: 'ONLINE',
        is_active: true,
      },
    ],
  });

  console.log('✅ 6 disponibilidades creadas');

  // ========== CREAR CITAS ==========
  console.log('📆 Creando citas de ejemplo...');

  // Cita 1: Paciente registrado + Confirmada + Presencial
  const appointment1 = await prisma.appointment.create({
    data: {
      psychologist_id: psychologist1.id,
      registered_patient_id: registeredPatient1.id,
      appointment_date: new Date('2026-01-20'), // Lunes futuro
      appointment_time: new Date('1970-01-01T10:00:00Z'),
      modality: 'PRESENCIAL',
      status: 'CONFIRMED',
      blocked_until: new Date('2026-01-20T09:45:00Z'),
      patient_confirmed_at: new Date(),
    },
  });

  // Cita 2: Paciente no registrado + Pendiente + Online
  const appointment2 = await prisma.appointment.create({
    data: {
      psychologist_id: psychologist1.id,
      unregistered_patient_id: unregisteredPatient1.id,
      appointment_date: new Date('2026-01-22'), // Miércoles futuro
      appointment_time: new Date('1970-01-01T15:00:00Z'),
      modality: 'ONLINE',
      status: 'PENDING',
      blocked_until: new Date('2026-01-22T14:45:00Z'),
    },
  });

  // Cita 3: Con Fonasa + Paciente registrado
  const appointment3 = await prisma.appointment.create({
    data: {
      psychologist_id: psychologist2.id,
      registered_patient_id: registeredPatient2.id,
      appointment_date: new Date('2026-01-21'), // Martes futuro
      appointment_time: new Date('1970-01-01T16:00:00Z'),
      modality: 'PRESENCIAL',
      status: 'PENDING',
      blocked_until: new Date('2026-01-21T15:45:00Z'),
    },
  });

  // Crear registro Fonasa para appointment3
  await prisma.fonasa.create({
    data: {
      appointment_id: appointment3.id,
      bono_pdf_url: 'https://example.com/bonos/bono_12345.pdf',
      validated_at: null,
      validated_by: null,
      validation_notes: null,
    },
  });

  // Cita 4: Con Payment + Webpay
  const appointment4 = await prisma.appointment.create({
    data: {
      psychologist_id: psychologist1.id,
      unregistered_patient_id: unregisteredPatient2.id,
      appointment_date: new Date('2026-01-24'), // Viernes futuro
      appointment_time: new Date('1970-01-01T10:30:00Z'),
      modality: 'ONLINE',
      status: 'CONFIRMED',
      blocked_until: new Date('2026-01-24T10:15:00Z'),
    },
  });

  // Crear Payment y Webpay para appointment4
  const payment1 = await prisma.payment.create({
    data: {
      appointment_id: appointment4.id,
      amount: 50000.00,
      status: 'COMPLETED',
    },
  });

  await prisma.webpay.create({
    data: {
      payment_id: payment1.id,
      token: 'tk_test_123456789',
      buy_order: 'ORD-2026-001',
      session_id: 'sess_abc123',
      authorization_code: '123456',
      transaction_date: new Date(),
    },
  });

  console.log('✅ 4 citas creadas (con Fonasa y Webpay de ejemplo)');

  console.log('\n🎉 ¡Seed completado exitosamente!\n');
  console.log('📝 Credenciales de prueba (todas con password: password123):');
  console.log('   Admin: admin@psicologos.cl');
  console.log('   Psicóloga: maria.gonzalez@psicologos.cl');
  console.log('   Psicólogo: pedro.silva@psicologos.cl');
  console.log('   Paciente 1: juan.perez@example.com');
  console.log('   Paciente 2: ana.torres@example.com\n');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
