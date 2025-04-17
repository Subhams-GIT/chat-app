import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

let pgPool: Pool;

export const DbConnect = async () => {
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    });

    await pgPool.query('SELECT 1');
    console.log('📦 PostgreSQL connected');
  }

  return pgPool;
};

const SingletonPrismaClient = () => new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma ?? SingletonPrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🧹 Prisma disconnected');
  process.exit(0);
});

export default prisma;
