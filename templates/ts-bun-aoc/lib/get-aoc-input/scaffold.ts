import path from 'node:path';

interface WriteTaskInput {
  data: string;
  outputDir: string;
}
export async function writeTask({ data, outputDir }: WriteTaskInput): Promise<void> {
  const taskInputPath = path.join(outputDir, 'input.txt');
  await Bun.write(taskInputPath, data);
}

interface WriteTemplateInput {
  year: number;
  day: number;
  outputDir: string;
  title: string;
}
export async function writeTemplate({ year, day, outputDir, title }: WriteTemplateInput): Promise<void> {
  const README_TEMPLATE = `[${title}](https://adventofcode.com/${year}/day/${day} "${title}")

\`\`\`shell
bun run task.ts
\`\`\`
`;
  const readmePath = path.join(outputDir, 'README.md');
  await Bun.write(readmePath, README_TEMPLATE);

  const TASK_TEMPLATE = `import { parseInput } from '../../lib/parse-input';

function part1(input: string[]) {}

function part2(input: string[]) {}

async function go(): Promise<void> {
  console.time('task');

  console.time('parse-input');
  const input = await parseInput('./input.txt');
  console.timeEnd('parse-input');

  console.time('part 1');
  const res1 = part1(input);
  console.log('PART 1: ', res1);
  console.timeEnd('part 1');

  console.time('part 2');
  const res2 = part2(input);
  console.log('PART 2: ', res2);
  console.timeEnd('part 2');

  console.timeEnd('task');
}

void go();
`;
  const taskPath = path.join(outputDir, 'task.ts');
  await Bun.write(taskPath, TASK_TEMPLATE);
}
