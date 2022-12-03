import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      if (input?.id) {
        return ctx.prisma.user.findFirst({
          where: {
            id: input.id,
          },
        });
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
