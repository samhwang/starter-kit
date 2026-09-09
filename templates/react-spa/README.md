# React - Vite SPA Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/react-spa <your-repo>
cd <your-repo>
pnpm install
pnpm run dev
```

## Batteries included

### Runtime:

- [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org/) - The library for web and native user interfaces.
- [Tanstack Router](https://tanstack.com/router/) - To handle app client side routing
- [Tanstack Form](https://tanstack.com/form/) - To handle form creation and validation
- [Tanstack Query](https://tanstack.com/query/) - To handle external server query state

### Dev tools:

- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vite](https://vitejs.dev/) - The blazing fast frontend build tool.
- [Vitest](https://vitest.dev/) for running unit tests with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/),
  using [msw](https://mswjs.io/) to fake a service worker request to intercept API calls during testing.

## Project Structure

```
├── src/
│   ├── home/       # Home feature pages
│   ├── routes/     # TanStack Router file-based routes
│   ├── app.tsx     # Root app component
│   └── router.tsx  # Router setup
└── index.html
```
