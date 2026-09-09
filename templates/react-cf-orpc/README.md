# React + Hono/oRPC + CloudFlare Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/react-cf-orpc <your-repo>
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
- [Tanstack Router](https://tanstack.com/router/) - To handle app client side routing.
- [Tanstack Form](https://tanstack.com/form/) - To handle form creation and validation.
- [Tanstack Query](https://tanstack.com/query/) - To manage query states.
- [Better Auth](https://www.better-auth.com/) - To handle auth integrations.
- [Drizzle](https://orm.drizzle.team) ORM + PostgreSQL.
- [Hono](https://hono.dev) backend server.
- [oRPC](https://orpc.unnoq.com/) - handling typesafe API operations.

### Dev tools:

- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vite](https://vitejs.dev/) - The blazing fast frontend build tool.
- [Vitest](https://vitest.dev/) for running unit tests with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/),
  using [msw](https://mswjs.io/) to fake a service worker request to intercept API calls during testing.

## Project Structure

```
├── src/
│   ├── api/            # oRPC router, procedures, generated wrangler types
│   │   ├── lib/        #   shared context + procedure builder
│   │   ├── user/       #   user procedures
│   │   └── generated/  #   wrangler types (gitignored)
│   ├── auth/           # Better Auth server/client + auth middleware
│   ├── config/         # Env validation (zod)
│   ├── database/       # Drizzle schema + client
│   │   ├── lib/        #   Drizzle client
│   │   └── schema/     #   Drizzle schema (Better Auth models, generated via auth:generate)
│   ├── dashboard/      # Dashboard feature pages
│   ├── home/           # Home feature pages
│   ├── routes/         # TanStack Router file-based routes
│   └── server.ts       # Hono entry: /api/rpc (oRPC) + /api/auth (Better Auth)
└── docker-compose.yml  # PostgreSQL for local dev
```

## Deployment

This template is meant to be deployed on the [Cloudflare Workers](https://workers.cloudflare.com) platform.
