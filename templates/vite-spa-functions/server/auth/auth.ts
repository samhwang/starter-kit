import { getDbClient } from '../db';
import { createAuth } from './server';

const db = getDbClient();
export const auth = createAuth(db);
