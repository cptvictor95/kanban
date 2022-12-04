import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const cardRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.card.create({
        data: {
          title: input.title,
          description: input.description,
          userId,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany();
  }),
});
