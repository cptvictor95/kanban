import { publicProcedure, router } from "../trpc";

export const cardRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany();
  }),
});
