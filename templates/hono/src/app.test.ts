import { describe, expect, it } from 'vitest';

import app from './app';

describe('app', () => {
  it('GET /api/hello returns 200 with Hello, World!', async () => {
    const res = await app.request('/api/hello');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Hello, World!');
  });
});
