import fastify from "fastify";
import connectDB from "./libs/prisma";
import { appRouter } from "./routers/app";
import { createContext } from "./libs/trpc";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

export const f = fastify({ maxParamLength: 5000 });

f.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});
f.register(fastifyCookie);
f.register(fastifyJwt, { secret: process.env.JWT_SECRET });

(async () => {
  try {
    await connectDB();
    await f.register(fastifyCors, {
      origin: ["http://localhost:3000"],
      credentials: true,
    });
    await f.listen({ port: 5000 });
    console.log("💫 Server listening on port 5000...");
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
})();
