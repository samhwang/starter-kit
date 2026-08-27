# Migrate Prisma → Drizzle ORM (Both react-cf-orpc & react-tanstack-start)

## Status

**Draft** — awaiting revision

## Scope

Two templates affected:

- `templates/react-cf-orpc` — Cloudflare Workers + edge runtime
- `templates/react-tanstack-start` — Node.js SSR (TanStack Start)

Both currently use: Prisma ORM + Better Auth + PostgreSQL

---

## Phase 0: Drizzle Config + Schema Directory Structure

**For each template, create:**

```
drizzle.config.ts          # drizzle-kit config
src/database/schema/       # NEW directory replacing prisma/
  ├── index.ts             # re-exports all tables + relations
  ├── auth.ts              # Better Auth generated schema (user, session, account, verification, rateLimit)
  └── [app-tables].ts      # future app-specific tables (none currently)
```

**drizzle.config.ts** pattern:

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/**/*",
  out: "./drizzle/migrations",
});
```

**Replaces:** `prisma.config.ts`, `prisma/schema.prisma`, `prisma/migrations/`

---

## Phase 1: Generic DB Client Export

**Goal:** `getDbClient()` returns a Drizzle `PostgresJsDatabase` instance, not a Prisma-specific type. Consumers use the same `getDbClient()` call — just the return type changes.

### react-tanstack-start (`src/database/lib/client.ts`)

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "../../config/lib/env.server";
import * as schema from "../schema";

let db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDbClient() {
  if (!db) {
    const client = postgres(serverEnv.DATABASE_URL);
    db = drizzle(client, { schema });
  }
  return db;
}
```

- Driver: `postgres` (postgres.js) — standard Node.js
- Exports the typed Drizzle instance with schema relations for joins

### react-cf-orpc (`src/database/lib/client.ts`)

```ts
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";
import { serverEnv } from "../../config/lib/env.server";
import * as schema from "../schema";

let db: ReturnType<typeof drizzleNeon<typeof schema>> | undefined;

export function getDbClient() {
  if (!db) {
    if (serverEnv.ENV === "development") {
      const pool = new Pool({ connectionString: serverEnv.DATABASE_URL });
      db = drizzlePg(pool, { schema }) as any;
    } else {
      const sql = neon(serverEnv.DATABASE_URL);
      db = drizzleNeon(sql, { schema });
    }
  }
  return db;
}
```

- Dev: `node-postgres` Pool (full transaction support)
- Prod: `@neondatabase/serverless` via `drizzle-orm/neon-http` (edge-compatible, HTTP-based)

---

## Phase 2: Better Auth Integration

**For each template, update `src/auth/server.ts`:**

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { getDbClient } from "../database/lib/client";

const db = getDbClient();
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  // ... rest of config unchanged
});
```

**Change:** `prismaAdapter(db, { provider: 'postgresql' })` → `drizzleAdapter(db, { provider: 'pg' })`

**Schema generation:** Run `better-auth generate --adapter drizzle --dialect postgresql` to produce the Drizzle schema files in `src/database/schema/auth.ts`.

**react-tanstack-start specifics:**

- Pass `usePlural: true` to the adapter (tables are `users`, `sessions`, etc.)
- `src/auth/types.ts`: Remove the Prisma enum import. Zod `UserRole` stays self-contained — delete the compile-time Prisma sync check.
- `admin` plugin config: `UserRole.enum.user` / `UserRole.enum.admin` unchanged (pure Zod)

---

## Phase 3: Drizzle Schema Translation

**Tables to create:**

| Table        | react-cf-orpc                | react-tanstack-start         |
| ------------ | ---------------------------- | ---------------------------- |
| User         | `user` (singular, camelCase) | `users` (plural, snake_case) |
| Session      | `session`                    | `sessions`                   |
| Account      | `account`                    | `accounts`                   |
| Verification | `verification`               | `verifications`              |
| RateLimit    | `rateLimit`                  | `rateLimit`                  |

**Relationships:**

- `session.user` → `user.id` (CASCADE)
- `account.user` → `user.id` (CASCADE)

**react-tanstack-start extras:**

- `UserRole` pgEnum: `admin`, `user`
- User fields: `role`, `timeZone`, `banned`, `banReason`, `banExpires`
- Session field: `impersonatedBy`

---

## Phase 4: Migration Files

**For each template:**

1. Delete `prisma/` directory entirely (schema + migrations + lock file)
2. Delete `prisma.config.ts`
3. Run `drizzle-kit generate` to create `drizzle/migrations/0000_init.sql`
4. Verify the generated SQL matches the existing Prisma migration output

**Migration workflow change in package.json scripts:**

| Old (Prisma)          | New (Drizzle)                                 |
| --------------------- | --------------------------------------------- |
| `prisma:generate`     | Remove (Drizzle doesn't need codegen)         |
| `prisma:push`         | `drizzle-kit push`                            |
| `prisma:migrate:dev`  | `drizzle-kit generate && drizzle-kit migrate` |
| `prisma:migrate:prod` | `drizzle-kit migrate`                         |
| `prisma:format`       | Remove                                        |
| `prisma:studio`       | `drizzle-kit studio`                          |

---

## Phase 5: Package Dependency Changes

### Remove (both templates)

- `@prisma/client`
- `@prisma/adapter-pg`
- `prisma` (dev)
- `prisma.config.ts`

### react-cf-orpc also removes

- `@prisma/adapter-neon`

### react-tanstack-start also removes

- `@better-auth/prisma-adapter`

### Add (both templates)

- `drizzle-orm`
- `drizzle-kit` (dev)
- `@better-auth/drizzle-adapter`

### react-tanstack-start also adds

- `postgres` (postgres.js driver)

### react-cf-orpc also adds

- `@neondatabase/serverless` (replaces `@prisma/adapter-neon`)

---

## Phase 6: Test Infrastructure

### `test/globalSetup.ts` changes

| Old                                     | New                                        |
| --------------------------------------- | ------------------------------------------ |
| `prisma db push` / `prisma migrate dev` | `drizzle-kit push` (faster for test setup) |

### `test/per-file-db.ts` changes

```ts
// OLD
const { getDbClient } = await import("../src/database/lib/client");
await getDbClient().$disconnect();

// NEW
const { getDbClient } = await import("../src/database/lib/client");
await getDbClient().$client.end();
```

**Note:** The `pg.Client` usage in `per-file-db.ts` for CREATE/DROP DATABASE stays — it's raw SQL for test isolation, not ORM-specific.

---

## Phase 7: Linting & Config Cleanup

- `.lintstagedrc.json`: Remove `"*.prisma": ["prisma format"]` line
- `package.json` build scripts: Remove `prisma:generate` from build pipeline
- `wrangler.toml` / `wrangler.toml.sample`: No changes needed (DATABASE_URL binding stays)

---

## Phase 8: Verification

For each template:

1. `pnpm install` — clean install with new deps
2. `drizzle-kit generate` — produces migration SQL
3. `drizzle-kit push` — applies to local DB
4. `pnpm run build` — ensures build succeeds
5. `pnpm run test` — auth tests pass (user creation, session readback)
6. `pnpm run lint && pnpm run typecheck` — no regressions
7. Manual: `drizzle-kit studio` — verify tables look correct

---

## Files Changed Per Template

### react-cf-orpc

| Action | File                               |
| ------ | ---------------------------------- |
| Modify | `src/database/lib/client.ts`       |
| Modify | `src/auth/server.ts`               |
| Modify | `package.json`                     |
| Modify | `.lintstagedrc.json`               |
| Modify | `test/globalSetup.ts`              |
| Modify | `test/per-file-db.ts`              |
| Create | `drizzle.config.ts`                |
| Create | `src/database/schema/index.ts`     |
| Create | `src/database/schema/auth.ts`      |
| Create | `drizzle/migrations/0000_init.sql` |
| Delete | `prisma/schema.prisma`             |
| Delete | `prisma.config.ts`                 |
| Delete | `prisma/migrations/*`              |

### react-tanstack-start

| Action | File                               |
| ------ | ---------------------------------- |
| Modify | `src/database/lib/client.ts`       |
| Modify | `src/auth/server.ts`               |
| Modify | `src/auth/types.ts`                |
| Modify | `package.json`                     |
| Modify | `.lintstagedrc.json`               |
| Modify | `test/globalSetup.ts`              |
| Modify | `test/per-file-db.ts`              |
| Create | `drizzle.config.ts`                |
| Create | `src/database/schema/index.ts`     |
| Create | `src/database/schema/auth.ts`      |
| Create | `drizzle/migrations/0000_init.sql` |
| Delete | `prisma/schema.prisma`             |
| Delete | `prisma.config.ts`                 |
| Delete | `prisma/migrations/*`              |
| Delete | `src/database/generated/prisma/*`  |

---

## Reusability Assessment

| What                              | Reusable? | Notes                                             |
| --------------------------------- | --------- | ------------------------------------------------- |
| Table structures (columns, types) | Yes       | Same columns, just different syntax               |
| Indexes & constraints             | Yes       | Identical SQL output                              |
| Foreign key relationships         | Yes       | Drizzle `relations()` API mirrors Prisma          |
| Migration SQL                     | Partially | Can diff existing SQL to verify correctness       |
| `per-file-db.ts` test infra       | Mostly    | Just `$disconnect()` → `$client.end()` change     |
| `globalSetup.ts`                  | Mostly    | Just CLI command swap                             |
| Better Auth config                | Mostly    | Just adapter import swap                          |
| Auth types (UserRole Zod)         | Yes       | Already ORM-independent except compile-time check |

### What Must Be New

- `drizzle.config.ts`
- `src/database/schema/auth.ts` (Better Auth generates this)
- `src/database/schema/index.ts` (barrel export)
- `drizzle/migrations/` directory with generated SQL
- Drizzle `relations()` definitions for joins (if using `advanced.database.joins: true`)
