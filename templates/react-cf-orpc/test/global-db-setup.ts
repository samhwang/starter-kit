import childProcess from 'node:child_process';

import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';

function pushSchema(databaseUrl: string) {
  console.log('Running Drizzle Push');
  process.env.DATABASE_URL = databaseUrl;
  childProcess.execSync(`pnpm run drizzle:push`, {
    env: { ...process.env, DATABASE_URL: databaseUrl },
  });
  console.log('Drizzle Push complete');
}

export async function setup() {
  console.log('Starting PostgreSQL container...');
  const db: StartedPostgreSqlContainer = await new PostgreSqlContainer('postgres:17-alpine').start();
  const databaseUrl = db.getConnectionUri();
  console.log(`PostgreSQL running at ${databaseUrl}`);

  pushSchema(databaseUrl);

  process.env.DATABASE_URL = databaseUrl;
  process.env.ENV = 'development';
  process.env.BETTER_AUTH_SECRET = 'test-secret-that-is-at-least-32-characters-long!!';
  process.env.BETTER_AUTH_URL = 'http://localhost:5173';

  return async function teardown() {
    console.log('Stopping containers...');
    await db.stop();
    console.log('Containers stopped');
  };
}
