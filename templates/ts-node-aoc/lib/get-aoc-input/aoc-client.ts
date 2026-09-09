import wretch from 'wretch';

function getClient(session: string) {
  return wretch('https://adventofcode.com')
    .options({ credentials: 'same-origin' })
    .headers({
      Cookie: `session=${session}`,
      'User-Agent': 'https://github.com/samhwang/aoc-template by samhwang2112.dev@gmail.com',
    });
}

interface FetchRequestPayload {
  year: number;
  day: number;
  session: string;
}

export async function downloadInput({ year, day, session }: FetchRequestPayload): Promise<string> {
  return getClient(session).url(`/${year}/day/${day}/input`).get().text();
}

export async function fetchTitle({ year, day, session }: FetchRequestPayload): Promise<string> {
  const document = await getClient(session).url(`/${year}/day/${day}`).get().text();

  const titleRegex = /(---) (Day) (\d+): (.+) (---)/g;
  const fullTitle = document.match(titleRegex);
  if (!fullTitle) {
    return `Day ${day}: unknown title`;
  }

  return fullTitle[0].replaceAll('-', '').trim();
}
