import { prisma } from "~/libs/prisma";
import { Prisma } from "@prisma/client";
import { User } from "~/domain/entities/user";
import { compare, hash } from "bcrypt";
import { f } from "~/main";

const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  const password = await hash(data.password, 10);
  return prisma.user.create({ data: { ...data, password } });
};

const get = async (
  id: Prisma.UserWhereUniqueInput["id"]
): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

const getMany = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

const update = async (
  id: Prisma.UserWhereUniqueInput["id"],
  data: Prisma.UserUpdateInput
): Promise<User> => {
  return prisma.user.update({ where: { id }, data });
};

const del = async (id: Prisma.UserWhereUniqueInput["id"]): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};

const signup = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return null;
  }

  return f.jwt.sign({ id: user.id }, { expiresIn: 60 * 60 * 24 });
};

export const userService = {
  create,
  get,
  getMany,
  update,
  delete: del,
  signup,
};
