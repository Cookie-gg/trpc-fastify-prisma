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

const signup = async ({
  input: { body },
  ctx,
}: {
  input: UserInput.Signup;
  ctx: Context;
}) => {
  const token = await userService.signup(body.email, body.password);

  if (!token) {
    throw new Error("Invalid credentials");
  }

  ctx.res.setCookie("token", token, {
    httpOnly: false,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    path: "/",
    sameSite: "none",
  });

  return { token };
};

export const userController = {
  create,
  get,
  getMany,
  update,
  delete: del,
  signup,
};
