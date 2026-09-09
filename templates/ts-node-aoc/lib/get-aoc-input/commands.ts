import fs from 'node:fs';
import path from 'node:path';

import { z } from 'zod';

import { downloadInput, fetchTitle } from './aoc-client';
import { scaffoldTemplate, writeTaskInput } from './scaffold';

const START_OF_MONTH = 1;
const END_OF_MONTH = 25; // Historically, AOC only lasts for 25 days.

export const CommandInputPayload = z.object({
  day: z.coerce
    .number({
      error: `Invalid day. Must be a number between ${START_OF_MONTH} and ${END_OF_MONTH}.`,
    })
    .gte(START_OF_MONTH)
    .lte(END_OF_MONTH),
  session: z
    .string()
    .default(process.env.SESSION_KEY ?? '')
    .refine((v) => v.length > 0, {
      error: 'Invalid session key. Must be longer than 1 character.',
    }),
  year: z.coerce.number().default(new Date().getFullYear()),
  output: z.string().optional(),
});
type CommandInputPayload = z.infer<typeof CommandInputPayload>;

export async function scaffoldCommand({ year, day, session, output }: CommandInputPayload): Promise<void> {
  try {
    console.log(`SCAFFOLDING AOC INPUT FOR YEAR ${year} DAY ${day}...`);
    const outputDir = output ?? path.join(process.cwd(), 'tasks', `day${day}`);
    fs.mkdirSync(outputDir, { recursive: true });

    const taskInput = await downloadInput({ year, day, session });
    writeTaskInput({ data: taskInput, outputDir });

    const title = await fetchTitle({ year, day, session });
    scaffoldTemplate({ year, day, outputDir, title });
    console.log(`AOC INPUT FOR YEAR ${year} DAY ${day} SCAFFOLDED SUCCESSFULLY!`);
  } catch (error) {
    console.error('ERROR SCAFFOLDING AOC INPUT: ', error);
  }
}
