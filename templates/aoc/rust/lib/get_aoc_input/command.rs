use std::collections::HashMap;
use std::fs;
use std::process;

use garde::Validate;

use super::client;
use super::scaffold;

// Bounds live as tags on the struct so garde checks them together, rather                                                                ║
// than a scattered if per field.
#[derive(Validate)]
pub struct CliInput {
    #[garde(range(min = 1, max = 25))]
    pub day: u32,
    #[garde(length(min = 2))]
    pub session: String,
    #[garde(skip)]
    pub year: u32,
    #[garde(skip)]
    pub output: String,
}

pub fn validation_messages() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("day", "Invalid day. Must be a number between 1 and 25."),
        (
            "session",
            "Invalid session key. Must be longer than 1 character.",
        ),
    ])
}

/// Downloads the day's input and writes the task skeleton. Errors are printed
/// here (not returned) since main is the only caller and has no use for a
/// returned error beyond printing it anyway.
pub fn scaffold(input: CliInput) {
    let CliInput {
        day,
        year,
        session,
        output,
    } = input;
    eprintln!("SCAFFOLDING AOC INPUT FOR YEAR {year} DAY {day}...");

    if let Err(e) = fs::create_dir_all(&output) {
        eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
        process::exit(0);
    }

    match client::download_input(year, day, &session) {
        Ok(task_input) => {
            if let Err(e) = scaffold::write_task(scaffold::WriteTaskInput {
                output_dir: &output,
                data: &task_input,
            }) {
                eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
                process::exit(0);
            }
        }
        Err(e) => {
            eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
            process::exit(0);
        }
    }

    let title = client::fetch_title(year, day, &session);
    if let Err(e) = scaffold::write_template(scaffold::WriteTemplateInput {
        output_dir: &output,
        year,
        day,
        title: &title,
    }) {
        eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
        process::exit(0);
    }

    if let Err(e) = scaffold::register_bin(day) {
        eprintln!("ERROR REGISTERING BINARY: {e}");
        process::exit(0);
    }

    eprintln!("AOC INPUT FOR YEAR {year} DAY {day} SCAFFOLDED SUCCESSFULLY!");
}
