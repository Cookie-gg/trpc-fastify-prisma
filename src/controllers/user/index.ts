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
  input: { param, body },
}: {
  input: UserInput.Update;
}): Promise<User> => {
  return userService.update(param.id, body);
};

const del = async ({
  input: { param },
}: {
  input: UserInput.Delete;
}): Promise<User> => {
  return userService.delete(param.id);
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
