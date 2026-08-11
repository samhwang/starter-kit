import { publicProcedure } from './builder';

export const appRouter = {
  greeting: publicProcedure.handler(() => 'Hello World'),
};
