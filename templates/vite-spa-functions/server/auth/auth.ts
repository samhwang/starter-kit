import { getDbClient } from '../db';
import { loadEnv } from '../env';
import { createAuth } from './server';

const env = loadEnv();
const db = getDbClient(env.DATABASE_URL);
export const auth = createAuth(db);
