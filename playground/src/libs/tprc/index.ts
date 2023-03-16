import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server";
import superjson from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      headers: () => {
        return {
          // Authorization: token,
        };
      },
      fetch: (url, options) => {
        return fetch(url, { ...options, credentials: "include" });
      },
    }),
  ],
  transformer: superjson,
});
