import fs from 'node:fs';
import path from 'node:path';

import { downloadAOCInput, fetchTitle } from './aoc-client';
import { scaffoldAOCTemplate, writeAOCTaskinput } from './scaffold';

export type CommandInputPayload = {
  year: string;
  day: string;
  session: string;
  output?: string;
};

export async function fetchCommand({ year, day, session, output }: CommandInputPayload) {
  try {
    console.log(`RETRIEVING AOC INPUT FOR YEAR ${year} DAY ${day}...`);
    const outputDir = output ?? path.join(process.cwd(), 'tasks', `day${day}`);
    fs.mkdirSync(outputDir);

    const taskInput = await downloadAOCInput({ year, day, session });
    writeAOCTaskinput({ data: taskInput, outputDir });
    console.log(`AOC INPUT FOR YEAR ${year} DAY ${day} RETRIEVED SUCCESSFULLY!`);
  } catch (error) {
    console.error('ERROR RETRIEVING AOC INPUT: ', error);
  }
}

export async function scaffoldCommand({ year, day, session, output }: CommandInputPayload): Promise<void> {
  try {
    console.log(`SCAFFOLDING AOC INPUT FOR YEAR ${year} DAY ${day}...`);
    const outputDir = output ?? path.join(process.cwd(), 'tasks', `day${day}`);
    fs.mkdirSync(outputDir);

    const taskInput = await downloadAOCInput({ year, day, session });
    writeAOCTaskinput({ data: taskInput, outputDir });

    const title = await fetchTitle({ year, day, session });
    scaffoldAOCTemplate({ year, day, outputDir, title });
    console.log(`AOC INPUT FOR YEAR ${year} DAY ${day} SCAFFOLDED SUCCESSFULLY!`);
  } catch (error) {
    console.error('ERROR SCAFFOLDING AOC INPUT: ', error);
  }
}
