import { protectedProcedure } from '../orpc/builder';

export const userRouter = {
  me: protectedProcedure.handler(async ({ context }) => {
    return {
      id: context.session.user.id,
      email: context.session.user.email,
      name: context.session.user.name,
    };
  }),
};
