import { router } from "../trpc";
import { authRouter } from "./auth";
import { cardRouter } from "./card";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  card: cardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
