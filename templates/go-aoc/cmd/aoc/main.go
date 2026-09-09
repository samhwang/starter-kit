package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/go-playground/validator/v10"

	aocinput "aoc/internal/get-aoc-input"
)

// cliInput holds parsed flag values so validator can check them together,
// rather than a scattered if per flag.
type cliInput struct {
	Day     int    `validate:"gte=1,lte=25"`
	Session string `validate:"gt=1"`
	Output  string
	Year    int
}

var validationMessages = map[string]string{
	"Day":     "Invalid day. Must be a number between 1 and 25.",
	"Session": "Invalid session key. Must be longer than 1 character.",
}

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

	args := &cliInput{
		Year:    year,
		Day:     day,
		Session: session,
		Output:  output,
	}

	validationErr := validator.New().Struct(args)
	if validationErr != nil {
		for _, fe := range validationErr.(validator.ValidationErrors) {
			fmt.Fprintln(os.Stderr, validationMessages[fe.Field()])
		}
		os.Exit(1)
	}

	aocinput.Scaffold(args.Output, args.Year, args.Day, args.Session)
}
