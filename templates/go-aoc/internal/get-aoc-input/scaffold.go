package aocinput

import (
	"fmt"
	"os"
	"path/filepath"
)

const (
	taskFile = "main.go"
	taskGo   = `package main

import (
	"fmt"
	"time"

	"aoc/internal/parse-input"
)

func Part1(lines []string) int {
	// TODO: implement
	return 0
}

func Part2(lines []string) int {
	// TODO: implement
	return 0
}

func main() {
	start := time.Now()

	input, err := parse.Lines("./input.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println("PART 1: ", Part1(input))
	fmt.Println("PART 2: ", Part2(input))
	fmt.Printf("completed in %s\n", time.Since(start))
}
`
	readmeGo = `[%[2]s](https://adventofcode.com/%[1]d/day/%[3]d "%[2]s")

` + "```shell\n" + `go run ./tasks/day%[3]d
` + "```\n"
)

func WriteTaskInput(outputDir, data string) error {
	return os.WriteFile(filepath.Join(outputDir, "input.txt"), []byte(data), 0o644)
}

func WriteTemplate(outputDir string, year, day int, title string) error {
	if err := os.WriteFile(filepath.Join(outputDir, "README.md"), fmt.Appendf(nil, readmeGo, year, title, day), 0o644); err != nil {
		return err
	}
	return os.WriteFile(filepath.Join(outputDir, taskFile), []byte(taskGo), 0o644)
}
