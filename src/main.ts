import fastify from "fastify";
import connectDB from "./libs/prisma";
import { appRouter } from "./routers/app";
import { createContext } from "./libs/trpc";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastifyCors from "@fastify/cors";

const server = fastify({ maxParamLength: 5000 });

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

server.register(fastifyCors, { origin: "*" });

(async () => {
  try {
    await connectDB();
    await server.listen({ port: 5000 });
    console.log("✨ Server listening on port 5000...");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
