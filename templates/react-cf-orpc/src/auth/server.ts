import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth';
import { testUtils } from 'better-auth/plugins';

import { serverEnv } from '../config/lib/env.server';
import { getDbClient } from '../database/lib/client';
import * as authSchema from '../database/schema/auth';

const db = getDbClient();
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [new URL(serverEnv.BETTER_AUTH_URL).origin],
  rateLimit: {
    storage: 'database',
    modelName: 'rateLimit',
  },
  ...(process.env.VITEST ? { plugins: [testUtils()] } : {}),
});
