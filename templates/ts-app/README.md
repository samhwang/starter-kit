# TS App Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/ts-app <your-repo>
cd <your-repo>
pnpm install
```

## Batteries included

- [TypeScript](https://www.typescriptlang.org/) - The core of this template.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vitest](https://vitest.dev/) for running unit tests.
- [oxnode](https://oxc.rs) for running the script locally.
- [tsdown](https://tsdown.dev/) for bundling the project.

## Project Structure

```
├── bin/
│   └── index.ts       # CLI entry point (run via `pnpm start`, built by tsdown)
└── src/
    ├── index.ts       # Implementation, imported by bin/index.ts
    └── index.test.ts  # Unit tests
```
