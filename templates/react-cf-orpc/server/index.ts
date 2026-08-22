import { RPCHandler } from '@orpc/server/fetch';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';

import { auth } from './auth/server';
import { appRouter } from './router';

const app = new Hono<{ Bindings: Cloudflare.Env }>().basePath('/api');

app.use(logger());
app.use('*', cors());
app.use('*', requestId());

const rpcHandler = new RPCHandler(appRouter);
app.use('/rpc/**', async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, {
    prefix: '/api/rpc',
    context: {
      env: c.env,
      headers: c.req.raw.headers,
    },
  });

  if (!matched) {
    return next();
  }

  return c.newResponse(response.body, response);
});

app.on(['POST', 'GET'], '/auth/**', (c) => {
  return auth.handler(c.req.raw);
});

export default app;
