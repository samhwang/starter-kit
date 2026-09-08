#!/usr/bin/env node
import { Command } from 'commander';

import { CommandInputPayload, fetchCommand, scaffoldCommand } from '../lib/get-aoc-input/commands';

const program = new Command();

program.name('get-aoc-input').description('CLI for fetching and scaffolding AOC inputs').version('1.0.0');

program
  .command('fetch')
  .description('Fetch an AOC input for the day')
  .requiredOption('-d, --day <day>', 'The day to scaffold')
  .option('-y, --year <year>', 'The year to scaffold', new Date().getFullYear().toString())
  .option('-s, --session <session>', 'The session cookie to use', process.env.SESSION_KEY)
  .option('-o, --output <output>', 'The output directory to use (default is the day from dayOption `day3`, `day4`...)')
  .action((input: CommandInputPayload) => fetchCommand(input));

program
  .command('scaffold')
  .description('Scaffold an AOC input for the day')
  .requiredOption('-d, --day <day>', 'The day to scaffold')
  .option('-y, --year <year>', 'The year to scaffold')
  .option('-s, --session <session>', 'The session cookie to use', process.env.SESSION_KEY)
  .option('-o, --output <output>', 'The output directory to use (default is the day from dayOption `day3`, `day4`...)')
  .action((input: CommandInputPayload) => scaffoldCommand(input));

program.parse(process.argv);
