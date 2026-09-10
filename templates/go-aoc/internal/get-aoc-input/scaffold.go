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

type WriteTaskInput struct {
	OutputDir string
	Data      string
}

func WriteTask(in WriteTaskInput) error {
	return os.WriteFile(filepath.Join(in.OutputDir, "input.txt"), []byte(in.Data), 0o644)
}

type WriteTemplateInput struct {
	OutputDir string
	Year      int
	Day       int
	Title     string
}

func WriteTemplate(in WriteTemplateInput) error {
	if err := os.WriteFile(filepath.Join(in.OutputDir, "README.md"), fmt.Appendf(nil, readmeGo, in.Year, in.Title, in.Day), 0o644); err != nil {
		return err
	}
	return os.WriteFile(filepath.Join(in.OutputDir, taskFile), []byte(taskGo), 0o644)
}
