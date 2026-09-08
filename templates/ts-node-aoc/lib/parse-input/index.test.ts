import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseInput } from './index';

describe('parseInput', () => {
  it('splits input into trimmed lines', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aoc-'));
    const file = path.join(dir, 'input.txt');
    fs.writeFileSync(file, 'a\nb\nc\n');

    expect(parseInput(file)).toEqual(['a', 'b', 'c']);
  });
});
