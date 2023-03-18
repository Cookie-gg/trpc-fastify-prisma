import superjson from "superjson";
import { AppRouter } from "@server";
import { FetchEsque } from "@trpc/client/dist/internals/types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

const fetcher: FetchEsque = (url, options) => {
  let token: string | undefined = "";
  let refreshToken: string | undefined = "";

  if (typeof window === "undefined") {
    const _requestAsyncStorage = require("next/dist/client/components/request-async-storage");
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (requestStore) {
      const cookies: RequestCookies = requestStore.cookies;
      token = cookies.get("token")?.value;
      refreshToken = cookies.get("refreshToken")?.value;
    }
  }

  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options?.headers,
      Authorization: token ? `bearer ${token}` : "",
      "x-refresh-token": refreshToken ? `bearer ${refreshToken}` : "",
    },
  });
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      fetch: fetcher,
    }),
  ],
  transformer: superjson,
});
