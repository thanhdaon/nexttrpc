import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import { NextPageContext } from "next";
import type { AppRouter } from "~/server/routers";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

function getWsUrl() {
  return `ws://localhost:${process.env.PORT ?? 3001}`;
}

function getEndingLink(ctx: NextPageContext | undefined) {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        if (ctx?.req) {
          const { connection, ...headers } = ctx.req.headers;
          return {
            ...headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
    });
  }

  const client = createWSClient({
    url: getWsUrl(),
  });

  return wsLink<AppRouter>({ client });
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [getEndingLink(ctx)],
    };
  },
  ssr: true,
});
