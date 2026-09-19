import wretch from 'wretch';

function get(url: string, session: string) {
  return wretch('https://adventofcode.com')
    .options({ credentials: 'same-origin' })
    .headers({
      Cookie: `session=${session}`,
      'User-Agent': 'https://github.com/samhwang/aoc by samhwang2112.dev@gmail.com',
    })
    .url(url)
    .get()
    .text();
}

interface FetchRequestInput {
  year: number;
  day: number;
  session: string;
}

export async function downloadInput({ year, day, session }: FetchRequestInput): Promise<string> {
  return get(session, `/${year}/day/${day}/input`);
}

export async function fetchTitle({ year, day, session }: FetchRequestInput): Promise<string> {
  const document = await get(session, `/${year}/day/${day}`);

  const titleRegex = /(---) (Day) (\d+): (.+) (---)/g;
  const fullTitle = document.match(titleRegex);
  if (!fullTitle) {
    return `Day ${day}: unknown title`;
  }

  return fullTitle[0].replaceAll('-', '').trim();
}
