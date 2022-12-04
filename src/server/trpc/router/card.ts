import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const cardRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        columnId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.card.create({
        data: {
          title: input.title,
          description: input.description,
          userId,
          columnId: input.columnId,
        },
      });
    }),
  getByColumn: protectedProcedure
    .input(z.object({ columnId: z.string() }))
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.card.findMany({
        where: { columnId: input.columnId, userId },
      });
    }),
});
