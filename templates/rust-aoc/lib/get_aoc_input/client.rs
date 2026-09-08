use regex::Regex;

const USER_AGENT: &str = "https://github.com/samhwang/aoc by samhwang2112.dev@gmail.com";

#[derive(Clone, Copy)]
pub struct FetchRequestPayload<'a> {
    pub year: u32,
    pub day: u32,
    pub session: &'a str,
}

pub fn download_input(p: FetchRequestPayload) -> Result<String, Box<dyn std::error::Error>> {
    let url = format!("https://adventofcode.com/{}/day/{}/input", p.year, p.day);
    let body: String = ureq::get(&url)
        .header("Cookie", format!("session={}", p.session))
        .header("User-Agent", USER_AGENT)
        .call()?
        .body_mut()
        .read_to_string()?;
    Ok(body)
}

pub fn fetch_title(p: FetchRequestPayload) -> String {
    let url = format!("https://adventofcode.com/{}/day/{}", p.year, p.day);
    let Ok(body) = ureq::get(&url)
        .header("Cookie", format!("session={}", p.session))
        .header("User-Agent", USER_AGENT)
        .call()
        .and_then(|mut r| r.body_mut().read_to_string())
    else {
        return format!("Day {}: unknown title", p.day);
    };

    let re = Regex::new(r"(?s)--- Day \d+: (.+?) ---").unwrap();
    if let Some(caps) = re.captures(&body) {
        caps[1].to_string()
    } else {
        format!("Day {}: unknown title", p.day)
    }
}
