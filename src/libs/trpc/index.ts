import superjson from "superjson";
import { User } from "~/domain/entities/user";
import { userService } from "~/services/user";
import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const JWT_REFRESH_HEADER_NAME = "x-refresh-token";
const JWT_HEADER_NAME = "authorization";

export const createContext = async ({
  req,
  res,
}: CreateFastifyContextOptions) => {
  try {
    const { id } = await req.jwtVerify<Pick<User, "id">>();
    const user = await userService.get(id);

    if (!user) throw new Error("User not found");
    return { req, res, user };
  } catch {}
  try {
    // If the user is not authenticated, try to authenticate with the refresh token
    req.headers[JWT_HEADER_NAME] = [
      req.headers[JWT_REFRESH_HEADER_NAME],
    ].flat()[0];

    const { id } = await req.jwtVerify<Pick<User, "id">>();
    const user = await userService.get(id);

    if (!user) throw new Error("User not found");

    return { req, res, user };
  } catch (err) {
    return { req, res, err };
  }
};

export async function createContextInner() {
  return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type InnerContext = inferAsyncReturnType<typeof createContextInner>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const testT = initTRPC.context<InnerContext>().create({
  transformer: superjson,
});

const middleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ctx.err instanceof Error ? ctx.err.message : undefined,
    });

  return next();
});

export const protectedProcedure = t.procedure.use(middleware);
