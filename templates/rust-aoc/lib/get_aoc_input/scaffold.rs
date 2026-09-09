use std::fs;

pub fn write_task_input(output: &str, input: &str) -> std::io::Result<()> {
    fs::write(format!("{output}/input.txt"), input)
}

pub fn write_template(output: &str, year: u32, day: u32, title: &str) -> std::io::Result<()> {
    let url = format!("https://adventofcode.com/{year}/day/{day}");
    let readme =
        format!("[{title}]({url} \"{title}\")\n\n```shell\ncargo run --bin day{day}\n```\n");
    fs::write(format!("{output}/README.md"), readme)?;

    let skeleton = "use std::time::Instant;\n\n\
         fn part1(_lines: &[String]) -> i32 {\n\
         \t0\n\
         }\n\n\
         fn part2(_lines: &[String]) -> i32 {\n\
         \t0\n\
         }\n\n\
         fn main() {\n\
         \tlet start = Instant::now();\n\
         \tlet lines = aoc_cli::parse_input::lines(\"./input.txt\");\n\
         \tlet p1 = part1(&lines);\n\
         \tprintln!(\"PART 1: {p1}\");\n\
         \tlet p2 = part2(&lines);\n\
         \tprintln!(\"PART 2: {p2}\");\n\
         \tprintln!(\"Elapsed: {:?}\", start.elapsed());\n\
         }\n";
    fs::create_dir_all(format!("{output}/src/bin"))?;
    fs::write(format!("{output}/src/bin/day{day}.rs"), skeleton)
}

pub fn register_bin(day: u32) -> std::io::Result<()> {
    let entry = format!(
        "\n[[bin]]\nname = \"day{day}\"\npath = \"tasks/day{day}/src/bin/day{day}.rs\"\n"
    );
    fs::OpenOptions::new()
        .append(true)
        .open("Cargo.toml")
        .and_then(|mut f| std::io::Write::write_all(&mut f, entry.as_bytes()))
}
