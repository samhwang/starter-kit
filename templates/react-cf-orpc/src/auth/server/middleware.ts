import { ORPCError, os } from '@orpc/server';

import { auth } from '../server';

const o = os.$context<{ headers: Headers }>();

export const authenticatedMiddleware = o.middleware(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session) {
    throw new ORPCError('UNAUTHORIZED');
  }

  return next({ context: { ...context, session } });
});
