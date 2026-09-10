package aocinput

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"
)

const (
	baseURL   = "https://adventofcode.com"
	userAgent = "https://github.com/samhwang/aoc by samhwang2112.dev@gmail.com"
)

type FetchRequestInput struct {
	Year    int
	Day     int
	Session string
}

func DownloadInput(p FetchRequestInput) (string, error) {
	return get(fmt.Sprintf("%s/%d/day/%d/input", baseURL, p.Year, p.Day), p.Session)
}

func FetchTitle(p FetchRequestInput) (string, error) {
	doc, err := get(fmt.Sprintf("%s/%d/day/%d", baseURL, p.Year, p.Day), p.Session)
	if err != nil {
		return "", err
	}
	re := regexp.MustCompile(`--- Day \d+: .+ ---`)
	m := re.FindString(doc)
	if m == "" {
		return fmt.Sprintf("Day %d: unknown title", p.Day), nil
	}
	return strings.TrimSpace(strings.Trim(m, "-")), nil
}

func get(url, session string) (string, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Cookie", "session="+session)
	req.Header.Set("User-Agent", userAgent)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}
