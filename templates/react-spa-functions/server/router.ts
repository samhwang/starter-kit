import { publicProcedure } from './orpc/builder';
import { userRouter } from './user/router';

export const appRouter = {
  greeting: publicProcedure.handler(() => 'Hello World'),
  user: userRouter,
};
