import { prisma } from "~/libs/prisma";
import { Prisma } from "@prisma/client";
import { User } from "~/domain/entities/user";

const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data });
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

export const userService = {
  create,
  get,
  getMany,
  update,
  delete: del,
};
