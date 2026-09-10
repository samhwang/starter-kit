package aocinput

import (
	"fmt"
	"os"
)

const errorPref = "ERROR SCAFFOLDING AOC INPUT: "

type CLIInput struct {
	Output  string
	Year    int
	Day     int
	Session string
}

// Scaffold downloads the day's input and writes the task skeleton. Errors
// are printed here (not returned) since main is the only caller and has no
// use for a returned error beyond printing it anyway.
func Scaffold(in CLIInput) {
	fmt.Printf("SCAFFOLDING AOC INPUT FOR YEAR %d DAY %d...\n", in.Year, in.Day)

	if err := os.MkdirAll(in.Output, 0o755); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	payload := FetchRequestInput{Year: in.Year, Day: in.Day, Session: in.Session}

	input, err := DownloadInput(payload)
	if err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}
	if err := WriteTask(WriteTaskInput{OutputDir: in.Output, Data: input}); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	title, err := FetchTitle(payload)
	if err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}
	if err := WriteTemplate(WriteTemplateInput{OutputDir: in.Output, Year: in.Year, Day: in.Day, Title: title}); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	fmt.Printf("AOC INPUT FOR YEAR %d DAY %d SCAFFOLDED SUCCESSFULLY!\n", in.Year, in.Day)
}
