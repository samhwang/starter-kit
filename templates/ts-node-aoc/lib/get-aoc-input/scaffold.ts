import fs from 'node:fs';
import path from 'node:path';

interface WriteTaskInputPayload {
  data: string;
  outputDir: string;
}
export function writeAOCTaskinput({ data, outputDir }: WriteTaskInputPayload): void {
  const taskInputPath = path.join(outputDir, 'input.txt');
  return fs.writeFileSync(taskInputPath, data);
}

interface ScaffoldTemplatePayload {
  year: number;
  day: number;
  outputDir: string;
  title: string;
}
export function scaffoldAOCTemplate({ year, day, outputDir, title }: ScaffoldTemplatePayload): void {
  const README_TEMPLATE = `[${title}](https://adventofcode.com/${year}/day/${day} "${title}")

\`\`\`shell
npx oxnode task.ts
\`\`\`
`;
  const readmePath = path.join(outputDir, 'README.md');
  fs.writeFileSync(readmePath, README_TEMPLATE);

  const TASK_TEMPLATE = `import { parseInput } from '../../lib/parse-input';

function part1(input: string[]) {}

function part2(input: string[]) {}

function go(): void {
  console.time('task');

  console.time('parse-input');
  const input = parseInput('./input.txt');
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

go();
`;
  const taskPath = path.join(outputDir, 'task.ts');
  fs.writeFileSync(taskPath, TASK_TEMPLATE);
}
