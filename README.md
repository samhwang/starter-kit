# Sam's Starter Kit

This repo houses my commonly used, batteries included, opinionated templates.
You can view them under the [`templates`](./templates) folders.

| Templates             | `templates/` path                                                    | Use case                                    |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| TanStack Start        | [`templates/react-tanstack-start`](./templates/react-tanstack-start) | SSR app with Better Auth + Drizzle          |
| React SPA + CF/oRPC   | [`templates/react-cf-orpc`](./templates/react-cf-orpc)               | Vite React SPA + Cloudflare Workers backend |
| React SPA             | [`templates/react-spa`](./templates/react-spa)                       | Vite React SPA                              |
| TS App                | [`templates/ts-app`](./templates/ts-app)                             | TS App, Command lines, server,...           |
| TS Lib                | [`templates/ts-lib`](./templates/ts-lib)                             | TS Library for publishing                   |
| Advent of Code - Node | [`templates/aoc/ts-node`](./templates/aoc/ts-node)                   | Advent of Code with Node                    |
| Advent of Code - Bun  | [`templates/aoc/ts-bun`](./templates/aoc/ts-bun)                     | Advent of Code with Bun                     |
| Advent of Code - Go   | [`templates/aoc/go`](./templates/aoc/go)                             | Advent of Code with Go                      |
| Advent of Code - Rust | [`templates/aoc/rust`](./templates/aoc/rust)                         | Advent of Code with Rust                    |

To scaffold a template, use `npx degit samhwang/starter-kit/templates/<template-name> <project-name>`. For example:
`npx degit samhwang/starter-kit/templates/aoc/go aoc-go`.
