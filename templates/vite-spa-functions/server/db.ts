import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { loadEnv } from './env';
import { PrismaClient } from './generated/prisma/client';

export function getDbClient(): PrismaClient {
  const env = loadEnv();
  const connectionString = env.DATABASE_URL;
  const adapter = env.ENV === 'development' ? new PrismaPg({ connectionString }) : new PrismaNeon({ connectionString });
  const db = new PrismaClient({ adapter });

  return db;
}
