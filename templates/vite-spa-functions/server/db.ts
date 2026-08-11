import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { loadEnv } from './env';
import { PrismaClient } from './generated/prisma/client';

export function getDbClient(connectionString: string): PrismaClient {
  const env = loadEnv();
  const adapter = env.ENV === 'development' ? new PrismaPg({ connectionString }) : new PrismaNeon({ connectionString });
  const db = new PrismaClient({ adapter });

  return db;
}

export function buildConnectionString({
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_NAME: dbName,
}: Cloudflare.Env): string {
  return `postgresql://${user}:${password}@${host}:${port}/${dbName}?sslmode=require`;
}
