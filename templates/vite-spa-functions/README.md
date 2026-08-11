# Better Auth testing proj

Testing Better Auth running in a React SPA app, with backend by Hono + tRPC + Better Auth, hosting on Cloudflare Worker.

## Batteries included

### Runtime:

- [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org/) - The library for web and native user interfaces.
- [Tanstack Router](https://tanstack.com/router/) - To handle app client side routing.
- [Tanstack Form](https://tanstack.com/form/) - To handle form creation and validation.
- [Tanstack Query](https://) - To manage query states.
- [Better Auth](https://www.better-auth.com/) - To handle auth integrations.
- [Prisma ORM](https://prisma.io) - ORM, enough said.
- [Hono](https://hono.dev) backend server.
- [oRPC](https://orpc.unnoq.com/) - handling typesafe API operations.

### Dev tools:

- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager.
- [Biome](https://biomejs.dev/) for code linting and formatting.
- [Vite](https://vitejs.dev/) - The blazing fast frontend build tool.
- [Vitest](https://vitest.dev/) for running unit tests with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/),
using [msw](https://mswjs.io/) to fake a service worker request to intercept API calls during testing.

## Available Scripts

```shell
pnpm run dev
pnpm run test
pnpm run format
pnpm run build
```

## Deployment

This template is meant to be deployed on the [Cloudflare Workers](https://workers.cloudflare.com) platform.
