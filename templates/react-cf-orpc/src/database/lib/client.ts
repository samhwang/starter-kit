import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { serverEnv } from '../../config/lib/env.server';
import { authRelations } from '../schema/auth';

let db: ReturnType<typeof drizzlePg> | ReturnType<typeof drizzleNeon> | undefined;

export function getDbClient() {
  if (!db) {
    const connectionString = serverEnv.DATABASE_URL;
    if (serverEnv.ENV === 'development') {
      db = drizzlePg({
        client: new Pool({ connectionString }),
        relations: { ...authRelations },
      });
    } else {
      db = drizzleNeon({
        client: neon(connectionString),
        relations: { ...authRelations },
      });
    }
  }

  return db;
}
