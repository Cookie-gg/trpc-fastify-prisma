import { t, testT } from "~/libs/trpc";
import { userRouter } from "../user";

export const appRouter = t.router({
  user: userRouter,
});

export const testRouter = testT.router({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
