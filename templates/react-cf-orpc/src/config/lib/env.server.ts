import { z } from 'zod';

const ServerEnv = z.object({
  ENV: z.enum(['development', 'production']).default('development'),

  // DB
  DATABASE_URL: z.string(),

  // Auth
  BETTER_AUTH_SECRET: z.string().min(1, {
    error: 'Better Auth Secret must be at least 1 character long. If this is empty, generate one from running `pnpm run auth:secret`',
  }),
  BETTER_AUTH_URL: z.url(),
});
type ServerEnv = z.infer<typeof ServerEnv>;

export function loadServerEnv(): ServerEnv {
  return ServerEnv.parse(process.env);
}
export const serverEnv = loadServerEnv();
