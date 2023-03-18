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

const signin = async (
  email: string,
  password: string
): Promise<{ token: string; refreshToken: string } | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return null;
  }

  const token = f.jwt.sign({ id: user.id }, { expiresIn: 60 * 60 * 24 });
  const refreshToken = f.jwt.sign(
    { id: user.id },
    { expiresIn: 60 * 60 * 24 * 14 }
  );

  return { token, refreshToken };
};

export const userService = {
  create,
  get,
  getMany,
  update,
  delete: del,
  signin,
};
