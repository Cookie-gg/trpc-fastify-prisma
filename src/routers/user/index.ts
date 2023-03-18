import { protectedProcedure, t } from "~/libs/trpc";
import { userInput } from "~/domain/inputs/user";
import { userController } from "~/controllers/user";

const router = t.router

export const userRouter = router({
  create: t.procedure
    .input(userInput.create)
    .mutation(({ input }) => userController.create({ input })),
  get: protectedProcedure.query(({ ctx }) => userController.get({ ctx })),
  getMany: t.procedure.query(() => userController.getMany()),
  update: t.procedure
    .input(userInput.update)
    .mutation(({ input, ctx }) => userController.update({ input, ctx })),
  delete: t.procedure.mutation(({ ctx }) => userController.delete({ ctx })),
  signin: t.procedure
    .input(userInput.signin)
    .mutation(({ input }) => userController.signin({ input })),
});
