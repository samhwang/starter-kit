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
  return get(`/${year}/day/${day}/input`, session);
}

export async function fetchTitle({ year, day, session }: FetchRequestInput): Promise<string> {
  const document = await get(`/${year}/day/${day}`, session);

  const titleRegex = /(---) (Day) (\d+): (.+) (---)/g;
  const fullTitle = document.match(titleRegex);
  if (!fullTitle) {
    return `Day ${day}: unknown title`;
  }

  return fullTitle[0].replaceAll('-', '').trim();
}
