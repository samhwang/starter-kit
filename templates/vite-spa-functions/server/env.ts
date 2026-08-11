import { z } from 'zod';

const Env = z
  .object({
    ENV: z.enum(['development', 'production']),

    // DB
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z
      .string()
      .min(1)
      .max(5)
      .transform((v) => Number.parseInt(v, 10)),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_NAME: z.string(),

    // Auth
    BETTER_AUTH_SECRET: z.string().min(1, {
      error: 'Better Auth Secret must be at least 1 character long. If this is empty, generate one from https://better-auth.com/docs/installation',
    }),
    BETTER_AUTH_URL: z.url(),
  });

declare global {
  namespace Cloudflare {
    interface Env extends z.infer<typeof Env> {}
  }
}

export function loadEnv() {
  return Env.parse(process.env);
}
