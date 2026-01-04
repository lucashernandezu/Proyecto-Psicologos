import dotenv from 'dotenv';
import app from './app';
import prisma from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Prisma Studio: npx prisma studio`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('\n👋 Servidor cerrado');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
