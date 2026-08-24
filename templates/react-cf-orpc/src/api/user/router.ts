import { authenticatedMiddleware } from '../../auth/server/middleware';
import { publicProcedure } from '../lib/builder';

export const userRouter = {
  me: publicProcedure.use(authenticatedMiddleware).handler(async ({ context }) => {
    return {
      id: context.session.user.id,
      email: context.session.user.email,
      name: context.session.user.name,
    };
  }),
};
