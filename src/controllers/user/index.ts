import { User } from "~/domain/entities/user";
import { userService } from "~/services/user";
import { UserInput } from "~/domain/inputs/user";
import { Context } from "~/libs/trpc";

const create = async ({
  input: { body },
}: {
  input: UserInput.Create;
}): Promise<User> => {
  return userService.create(body);
};

const get = async ({ ctx }: { ctx: Context }) => {
  return ctx.user;
};

const getMany = async (): Promise<User[]> => {
  return userService.getMany();
};

const update = async ({
  input: { body },
  ctx,
}: {
  input: UserInput.Update;
  ctx: Context;
}): Promise<User> => {
  return userService.update(ctx.user?.id, body);
};

const del = async ({ ctx }: { ctx: Context }): Promise<User> => {
  return userService.delete(ctx.user?.id);
};

const signin = async ({ input: { body } }: { input: UserInput.Signup }) => {
  const res = await userService.signin(body.email, body.password);
  if (!res) throw new Error("Invalid credentials");

  return res;
};

export const userController = {
  create,
  get,
  getMany,
  update,
  delete: del,
  signin,
};
