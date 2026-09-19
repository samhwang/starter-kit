package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"time"

	aocinput "aoc/internal/get-aoc-input"
)

func main() {
	var day, year int
	var session, output string

	flag.IntVar(&day, "d", 0, "day to scaffold (1-25)")
	flag.IntVar(&day, "day", 0, "day to scaffold (1-25)")
	flag.IntVar(&year, "y", 0, "year to scaffold (default: current year)")
	flag.IntVar(&year, "year", 0, "year to scaffold (default: current year)")
	flag.StringVar(&session, "s", "", "AOC session cookie (default: SESSION_KEY env)")
	flag.StringVar(&session, "session", "", "AOC session cookie (default: SESSION_KEY env)")
	flag.StringVar(&output, "o", "", "output directory (default: ./tasks/dayN)")
	flag.StringVar(&output, "output", "", "output directory (default: ./tasks/dayN)")
	flag.Parse()

	if year == 0 {
		year = time.Now().Year()
	}
	if session == "" {
		session = os.Getenv("SESSION_KEY")
	}
	if output == "" {
		output = filepath.Join("tasks", fmt.Sprintf("day%d", day))
	}

	args := aocinput.CLIInput{
		Year:    year,
		Day:     day,
		Session: session,
		Output:  output,
	}

	validationErr := aocinput.ValidateArgs(args)
	if validationErr != nil {
		os.Exit(1)
	}

	aocinput.Scaffold(args)
}
