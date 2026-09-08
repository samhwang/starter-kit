package aocinput

import (
	"fmt"
	"os"
)

const errorPref = "ERROR SCAFFOLDING AOC INPUT: "

// Scaffold downloads the day's input and writes the task skeleton. Errors
// are printed here (not returned) since main is the only caller and has no
// use for a returned error beyond printing it anyway.
func Scaffold(output string, year, day int, session string) {
	fmt.Printf("SCAFFOLDING AOC INPUT FOR YEAR %d DAY %d...\n", year, day)

	if err := os.MkdirAll(output, 0o755); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	payload := FetchRequestPayload{Year: year, Day: day, Session: session}

	input, err := DownloadInput(payload)
	if err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}
	if err := WriteTaskInput(output, input); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	title, err := FetchTitle(payload)
	if err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}
	if err := WriteTemplate(output, year, day, title); err != nil {
		fmt.Fprintln(os.Stderr, errorPref+err.Error())
		return
	}

	fmt.Printf("AOC INPUT FOR YEAR %d DAY %d SCAFFOLDED SUCCESSFULLY!\n", year, day)
}
