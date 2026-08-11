import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';

import { serverEnv } from './env';
import { PrismaClient } from './generated/prisma/client';

let db: PrismaClient | undefined;

export function getDbClient(): PrismaClient {
  if (!db) {
    const connectionString = serverEnv.DATABASE_URL;
    const adapter = serverEnv.ENV === 'development' ? new PrismaPg({ connectionString }) : new PrismaNeon({ connectionString });
    db = new PrismaClient({ adapter });
  }

  return db;
}
