import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { testUtils } from 'better-auth/plugins';

import { getDbClient } from '../db';

const db = getDbClient();
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [],
  ...(process.env.VITEST ? { plugins: [testUtils()] } : {}),
});
