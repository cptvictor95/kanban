import { router } from "../trpc";
import { authRouter } from "./auth";
import { cardRouter } from "./card";
import { columnRouter } from "./column";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  card: cardRouter,
  column: columnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
