#!/usr/bin/env bun
import util from 'node:util';

import { z } from 'zod';

import { CommandInputPayload, scaffoldCommand } from '../lib/get-aoc-input/commands';

const { values } = util.parseArgs({
  options: {
    day: { type: 'string', short: 'd' },
    year: { type: 'string', short: 'y' },
    session: { type: 'string', short: 's' },
    output: { type: 'string', short: 'o' },
  },
});

const args = CommandInputPayload.safeParse(values);
if (!args.success) {
  console.error(z.prettifyError(args.error));
  process.exit(1);
}

void scaffoldCommand(args.data);
