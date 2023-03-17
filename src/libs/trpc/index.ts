import superjson from "superjson";
import { User } from "~/domain/entities/user";
import { userService } from "~/services/user";
import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = async ({
  req,
  res,
}: CreateFastifyContextOptions) => {
  try {
    const { id } = await req.jwtVerify<User>();
    const user = await userService.get(id);

    if (!user) throw new Error("User not found");

    return { req, res, user };
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: err instanceof Error ? err.message : undefined,
    });
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const middleware = t.middleware(async ({ next }) => {
  return next();
});

export const protectedProcedure = t.procedure.use(middleware);
