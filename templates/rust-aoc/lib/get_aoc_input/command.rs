use std::fs;
use std::process;

use super::client;
use super::scaffold;

pub struct CLIInput {
    pub day: u32,
    pub year: u32,
    pub session: String,
    pub output: String,
}

/// Downloads the day's input and writes the task skeleton. Errors are printed
/// here (not returned) since main is the only caller and has no use for a
/// returned error beyond printing it anyway.
pub fn scaffold(input: CLIInput) {
    let CLIInput {
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

    let payload = client::FetchRequestInput {
        year,
        day,
        session: &session,
    };

    match client::download_input(payload) {
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

    let title = client::fetch_title(payload);
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
