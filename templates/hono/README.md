# Hono Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/hono <your-repo>
cd <your-repo>
pnpm install
cp .env.sample .env
pnpm start # http://localhost:3000/api/hello
```

## Batteries included

- [Hono](https://hono.dev/) with [@hono/node-server](https://github.com/honojs/node-server) for the HTTP server.
- [TypeScript](https://www.typescriptlang.org/) - The core of this template.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vitest](https://vitest.dev/) for running unit tests.
- [oxnode](https://oxc.rs) for running the script locally.
- [tsdown](https://tsdown.dev/) for bundling the project.
- [Docker](https://docs.docker.com/) multi-stage, non-root image. Run with `docker compose up --build`.
- [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL. `docker compose up -d db`, then add a schema under `src/database/schema/` and run `pnpm drizzle:migrate:dev`.

## Project Structure

```
├── bin/
│   └── index.ts       # Server entry point (run via `pnpm start`, built by tsdown)
├── src/
│   ├── app.ts         # Hono app, imported by bin/index.ts
│   ├── app.test.ts    # Unit tests
│   └── database/
│       ├── lib.ts     # Database client
│       └── schema/    # Drizzle schema definitions
```
