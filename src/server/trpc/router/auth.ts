import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  // what can we do with these?
  getSecretMessage: protectedProcedure.query(() => {
    return "This is a protected route!";
  }),
});
