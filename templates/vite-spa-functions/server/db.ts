import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';

import { serverEnv } from './env';
import { PrismaClient } from './generated/prisma/client';

export function getDbClient(): PrismaClient {
  const connectionString = serverEnv.DATABASE_URL;
  const adapter = serverEnv.ENV === 'development' ? new PrismaPg({ connectionString }) : new PrismaNeon({ connectionString });
  const db = new PrismaClient({ adapter });

  return db;
}
