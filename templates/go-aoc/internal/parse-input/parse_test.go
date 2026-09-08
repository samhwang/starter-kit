package parse

import (
	"os"
	"path/filepath"
	"testing"
)

func TestLines(t *testing.T) {
	tests := []struct {
		name    string
		content string
		want    []string
	}{
		{
			name:    "multiline input",
			content: "a\nb\nc\n",
			want:    []string{"a", "b", "c"},
		},
		{
			name:    "empty content",
			content: "",
			want:    []string{""},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			dir := t.TempDir()
			file := filepath.Join(dir, "input.txt")
			err := os.WriteFile(file, []byte(tt.content), 0o644)
			if err != nil {
				t.Fatalf("failed to write test file: %v", err)
			}

			got, err := Lines(file)
			if err != nil {
				t.Fatalf("Lines() error = %v", err)
			}

			if len(got) != len(tt.want) {
				t.Errorf("Lines() got %d elements, want %d", len(got), len(tt.want))
				return
			}

			for i := range got {
				if got[i] != tt.want[i] {
					t.Errorf("Lines()[%d] = %q, want %q", i, got[i], tt.want[i])
				}
			}
		})
	}
}
