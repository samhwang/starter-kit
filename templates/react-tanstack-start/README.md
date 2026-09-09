# React TanStack Start Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/react-tanstack-start <your-repo>
cd <your-repo>
cp .env.sample .env
pnpm install
pnpm run auth:secret
docker compose up -d
pnpm run drizzle:migrate:dev
pnpm run dev
```

## Batteries included

### Runtime:

- [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org/) - The library for web and native user interfaces.
- [TanStack Start](https://tanstack.com/start) - Full-stack React framework with SSR, server functions and middleware.
- [TanStack Router](https://tanstack.com/router/) - Type-safe file-based routing.
- [TanStack Form](https://tanstack.com/form/) - Type-safe form handling with server form support.
- [TanStack Query](https://tanstack.com/query/) - To manage external server query state.
- [Better Auth](https://www.better-auth.com/) - Auth with email/password, admin plugin, database rate limiting.
- [Drizzle](https://orm.drizzle.team) ORM + PostgreSQL.
- [Nitro](https://nitro.unjs.io/) - Deployment-agnostic server output (node/vercel/netlify/cloudflare).

### Dev tools:

- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vite](https://vitejs.dev/) - The blazing fast frontend build tool.
- [Vitest](https://vitest.dev/) for unit tests with [Testcontainers](https://testcontainers.com/) spinning up a real PostgreSQL for integration tests.
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) + [lint-prepush](https://github.com/samhwang/lint-prepush) git hooks.

## Project Structure

```
├── src/
│   ├── auth/           # Better Auth server/client, form hooks
│   ├── config/         # Env validation (zod), site settings
│   ├── database/       # Drizzle schema + client
│   │   ├── lib/        #   Drizzle client
│   │   └── schema/     #   Drizzle schema (Better Auth models, generated via auth:generate)
│   ├── dashboard/      # Dashboard feature pages
│   ├── home/           # Home feature pages
│   └── routes/         # TanStack Start file-based routes (+ API routes under /api)
└── docker-compose.yml  # PostgreSQL for local dev
```

## Deployment

Build once, deploy anywhere:

- `DEPLOYMENT_ENV=node` (default) - `nitro` node-server preset, run with `pnpm start`
- `DEPLOYMENT_ENV=vercel` - vercel preset
- `DEPLOYMENT_ENV=netlify` - requires `netlify.toml`, see [@netlify/vite-plugin-tanstack-start](https://github.com/netlify/vite-plugin-tanstack-start)
- `DEPLOYMENT_ENV=cloudflare` - requires `wrangler.toml`, see `wrangler.toml.sample`
