import { t } from "~/libs/trpc";
import { userInput } from "~/domain/inputs/user";
import { userController } from "~/controllers/user";

export const userRouter = t.router({
  create: t.procedure
    .input(userInput.create)
    .mutation(({ input }) => userController.create({ input })),
  get: t.procedure.query(({ ctx }) => userController.get({ ctx })),
  getMany: t.procedure.query(() => userController.getMany()),
  update: t.procedure
    .input(userInput.update)
    .mutation(({ input }) => userController.update({ input })),
  delete: t.procedure
    .input(userInput.delete)
    .mutation(({ input }) => userController.delete({ input })),
  signin: t.procedure
    .input(userInput.signin)
    .mutation(({ input }) => userController.signin({ input })),
});
