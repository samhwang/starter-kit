#!/usr/bin/env node
import { serve } from '@hono/node-server';

import app from '../src/app';

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT ?? 3000),
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  }
);
