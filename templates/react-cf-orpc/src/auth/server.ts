import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { testUtils } from 'better-auth/plugins';

import { serverEnv } from '../config/lib/env.server';
import { getDbClient } from '../database/lib/client';

const db = getDbClient();
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [new URL(serverEnv.BETTER_AUTH_URL).origin],
  ...(process.env.VITEST ? { plugins: [testUtils()] } : {}),
  rateLimit: {
    storage: 'database',
    modelName: 'rateLimit',
  },
});
