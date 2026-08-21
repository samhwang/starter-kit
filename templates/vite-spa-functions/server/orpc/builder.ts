import { ORPCError, os } from '@orpc/server';

import { auth } from '../auth/server';
import type { HonoContext } from '../context';

const o = os.$context<HonoContext>();

export const publicProcedure = o;

export const protectedProcedure = o.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session) {
    throw new ORPCError('UNAUTHORIZED');
  }

  return next({ context: { ...context, session } });
});
