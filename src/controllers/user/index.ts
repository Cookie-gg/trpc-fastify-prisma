import { User } from "~/domain/entities/user";
import { userService } from "~/services/user";
import { UserInput } from "~/domain/inputs/user";

const create = async ({
  input: { body },
}: {
  input: UserInput.Create;
}): Promise<User> => {
  return userService.create(body);
};

const get = async ({
  input: { param },
}: {
  input: UserInput.Get;
}): Promise<User | null> => {
  return userService.get(param.id);
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

export const userController = {
  create,
  get,
  getMany,
  update,
  delete: del,
};
