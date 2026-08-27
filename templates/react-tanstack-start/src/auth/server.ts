import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth';
import { admin, testUtils } from 'better-auth/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

import { serverEnv } from '../config/lib/env.server';
import { getDbClient } from '../database/lib/client';
import * as authSchema from '../database/schema/auth';
import { UserRole } from './types';

const isTestEnv = !!process.env.VITEST || process.env.E2E_TEST_UTILS === 'true';

const db = getDbClient();

export const auth = betterAuth({
  trustedOrigins: serverEnv.TRUSTED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: { enabled: true },
  plugins: [
    admin({
      defaultRole: UserRole.enum.user,
      adminRoles: [UserRole.enum.admin],
    }),
    tanstackStartCookies(),
    ...(isTestEnv ? [testUtils()] : []),
  ],
  advanced: {
    database: {
      generateId: false,
    },
  },
  rateLimit: {
    storage: 'database',
    modelName: 'rateLimit',
  },
});
