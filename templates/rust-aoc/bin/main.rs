use std::collections::HashMap;
use std::env;
use std::process;

use garde::Validate;

use aoc_cli::get_aoc_input::command;

fn current_year() -> u32 {
    time::OffsetDateTime::now_utc().year() as u32
}

// Bounds live as tags on the struct so garde checks them together, rather
// than a scattered if per field.
#[derive(Validate)]
struct CliInput {
    #[garde(range(min = 1, max = 25))]
    day: u32,
    #[garde(length(min = 2))]
    session: String,
    #[garde(skip)]
    year: u32,
    #[garde(skip)]
    output: String,
}

fn validation_messages() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("day", "Invalid day. Must be a number between 1 and 25."),
        (
            "session",
            "Invalid session key. Must be longer than 1 character.",
        ),
    ])
}

fn main() {
    let mut args = pico_args::Arguments::from_env();

    let day: u32 = args.value_from_str(["-d", "--day"]).unwrap_or(0);
    let year: Option<u32> = args.opt_value_from_str(["-y", "--year"]).ok().flatten();
    let session: Option<String> = args.opt_value_from_str(["-s", "--session"]).ok().flatten();
    let output: Option<String> = args.opt_value_from_str(["-o", "--output"]).ok().flatten();

    let remaining = args.finish();
    if !remaining.is_empty() {
        let unknown: Vec<String> = remaining
            .iter()
            .map(|s| s.to_string_lossy().into_owned())
            .collect();
        eprintln!("Unknown option: {}", unknown.join(" "));
        process::exit(1);
    }

    let year = year.unwrap_or_else(current_year);
    let session = session
        .filter(|s| !s.is_empty())
        .or_else(|| env::var("SESSION_KEY").ok())
        .unwrap_or_default();
    let output = output.unwrap_or_else(|| format!("./tasks/day{day}"));

    let input = CliInput {
        day,
        session,
        year,
        output,
    };
    if let Err(report) = input.validate() {
        let messages = validation_messages();
        for (path, _) in report.iter() {
            eprintln!("{}", messages[path.to_string().as_str()]);
        }
        process::exit(1);
    }

    command::scaffold_day(input.day, input.year, &input.session, &input.output);
}
