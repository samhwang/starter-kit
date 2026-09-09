export async function parseInput(inputPath: string): Promise<string[]> {
  const input = await Bun.file(inputPath).text();
  return input.trim().split('\n');
}
