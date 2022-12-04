import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const columnRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        cards: z.array(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.column.create({
        data: {
          title: input.title,
          userId,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.column.findMany({ where: { userId: userId } });
  }),
});
