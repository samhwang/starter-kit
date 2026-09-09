# TS Lib Template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/ts-lib <your-repo>
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
└── src/
    ├── index.ts       # Public entry point (exported from package.json)
    └── index.test.ts  # Unit tests
```
