#!/usr/bin/env node
import util from 'node:util';

import { z } from 'zod';

import { CLIInput, scaffold } from '../lib/get-aoc-input/commands';

const { values } = util.parseArgs({
  options: {
    day: { type: 'string', short: 'd' },
    year: { type: 'string', short: 'y' },
    session: { type: 'string', short: 's' },
    output: { type: 'string', short: 'o' },
  },
});

const args = CLIInput.safeParse(values);
if (!args.success) {
  console.error(z.prettifyError(args.error));
  process.exit(1);
}

void scaffold(args.data);
