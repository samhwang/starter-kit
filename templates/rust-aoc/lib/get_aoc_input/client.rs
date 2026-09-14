use regex::Regex;

const USER_AGENT: &str = "https://github.com/samhwang/aoc by samhwang2112.dev@gmail.com";

fn get(path: &str, session: &str) -> Result<String, ureq::Error> {
    Ok(ureq::get(&format!("https://adventofcode.com/{path}"))
        .header("Cookie", format!("session={session}"))
        .header("User-Agent", USER_AGENT)
        .call()?
        .body_mut()
        .read_to_string()?)
}

pub fn download_input(
    year: u32,
    day: u32,
    session: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    Ok(get(&format!("{year}/day/{day}/input"), session)?)
}

pub fn fetch_title(year: u32, day: u32, session: &str) -> String {
    let Ok(body) = get(&format!("{year}/day/{day}"), session) else {
        return format!("Day {day}: unknown title");
    };

    let re = Regex::new(r"(?s)--- Day \d+: (.+?) ---").unwrap();
    if let Some(caps) = re.captures(&body) {
        caps[1].to_string()
    } else {
        format!("Day {day}: unknown title")
    }
}
