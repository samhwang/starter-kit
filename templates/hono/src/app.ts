import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';

const app = new Hono().basePath('/api');

app.use(logger());
app.use('*', cors());
app.use('*', requestId());

app.get('/hello', (c) => {
  return c.text('Hello, World!');
});

export default app;
