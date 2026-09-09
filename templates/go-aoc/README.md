# Advent of Code - Go template

## Quick start

```shell
npx degit samhwang/starter-kit/templates/go-aoc <your-repo>
cd <your-repo>
go mod tidy
```

## Grabbing the session key

To use the scaffolding script below, you'd need to first grab the session key. Do as follows.

- First, login to [Advent of Code](https://adventofcode.com 'Advent of Code website').
- Then, go to a puzzle day, and click on the link to grab a puzzle input.
- On the newly opened tab, open Browser Devtools (usually defaults to `F12`, check your browser keybinds), then open the `Network` tab.
- Check the request headers of the input request, you should be able to see the Cookie header with the value `session=YOUR-KEY-HERE`.
- Create an `.env` file from the sample, and fill in with the `YOUR-KEY-HERE` value.

## Scaffolding

```shell
go tool task get-aoc-input -- -d <day>
```

Additional flags:

- `-y`/`--year`: Year (default: current year).
- `-s`/`--session`: Override session key (default: reads `.env` via `SESSION_KEY`).
- `-o`/`--output`: Output directory (default: `./tasks/dayN`).

## Project Structure

```
├── cmd/
│   └── aoc/
│       └── main.go           # CLI entry point (flags, dispatch)
├── internal/
│   ├── get-aoc-input/        # AoC client, scaffolding, orchestration
│   └── parse-input/          # Puzzle input parsing helpers (tested)
└── tasks/                    # Scaffolded day1, day2, ... solutions
```
