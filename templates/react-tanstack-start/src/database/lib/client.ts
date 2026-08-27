import { drizzle } from 'drizzle-orm/postgres-js';

import { serverEnv } from '../../config/lib/env.server';
import { authRelations } from '../schema';

let db: ReturnType<typeof drizzle> | undefined;

export function getDbClient() {
  if (!db) {
    db = drizzle(serverEnv.DATABASE_URL, { relations: { ...authRelations } });
  }
  return db;
}
