import wretch from 'wretch';

function verifySessionKey(session?: string): boolean {
  if (!session) {
    return false;
  }

  if (session.length === 0) {
    return false;
  }

  return true;
}

function getAocClient(session: string) {
  if (!verifySessionKey(session)) {
    throw new Error('ERROR: Invalid session key.');
  }

  return wretch('https://adventofcode.com')
    .options({ credentials: 'same-origin' })
    .headers({
      Cookie: `session=${session}`,
      'User-Agent': 'https://github.com/samhwang/aoc-template by samhwang2112.dev@gmail.com',
    });
}

interface FetchRequestPayload {
  year: string;
  day: string;
  session: string;
}

export async function downloadAOCInput({ year, day, session }: FetchRequestPayload): Promise<string> {
  return getAocClient(session).url(`/${year}/day/${day}/input`).get().text();
}

export async function fetchTitle({ year, day, session }: FetchRequestPayload): Promise<string> {
  const document = await getAocClient(session).url(`/${year}/day/${day}`).get().text();

  const titleRegex = /(---) (Day) (\d+): (.+) (---)/g;
  const fullTitle = document.match(titleRegex);
  if (!fullTitle) {
    return `Day ${day}: unknown title`;
  }

  return fullTitle[0].replaceAll('-', '').trim();
}
