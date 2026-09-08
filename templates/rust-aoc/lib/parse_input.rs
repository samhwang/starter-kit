use std::fs;

#[allow(dead_code)]
pub fn lines(path: &str) -> Vec<String> {
    let content = fs::read_to_string(path).unwrap_or_default();
    let trimmed = content.trim();
    if trimmed.is_empty() {
        vec![]
    } else {
        trimmed.split('\n').map(String::from).collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env::temp_dir;

    #[test]
    fn splits_input_into_trimmed_lines() {
        let dir = temp_dir().join("aoc_test");
        std::fs::create_dir_all(&dir).unwrap();
        let file = dir.join("input.txt");
        std::fs::write(&file, "a\nb\nc\n").unwrap();

        let result = lines(file.to_str().unwrap());
        assert_eq!(result, vec!["a", "b", "c"]);

        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn handles_empty_file() {
        let dir = temp_dir().join("aoc_test_empty");
        std::fs::create_dir_all(&dir).unwrap();
        let file = dir.join("input.txt");
        std::fs::write(&file, "").unwrap();

        let result = lines(file.to_str().unwrap());
        assert!(result.is_empty());

        std::fs::remove_dir_all(&dir).unwrap();
    }
}
