use std::fs;
use std::process;

use super::client;
use super::scaffold;

/// Downloads the day's input and writes the task skeleton. Errors are printed
/// here (not returned) since main is the only caller and has no use for a
/// returned error beyond printing it anyway.
pub fn scaffold_day(day: u32, year: u32, session: &str, output: &str) {
    eprintln!("SCAFFOLDING AOC INPUT FOR YEAR {year} DAY {day}...");

    if let Err(e) = fs::create_dir_all(output) {
        eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
        process::exit(0);
    }

    let payload = client::FetchRequestPayload { year, day, session };

    match client::download_input(payload) {
        Ok(input) => {
            if let Err(e) = scaffold::write_task_input(output, &input) {
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
    if let Err(e) = scaffold::write_template(output, year, day, &title) {
        eprintln!("ERROR SCAFFOLDING AOC INPUT: {e}");
        process::exit(0);
    }

    if let Err(e) = scaffold::register_bin(day) {
        eprintln!("ERROR REGISTERING BINARY: {e}");
        process::exit(0);
    }

    eprintln!("AOC INPUT FOR YEAR {year} DAY {day} SCAFFOLDED SUCCESSFULLY!");
}
