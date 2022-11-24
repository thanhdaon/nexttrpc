import { createNextApiHandler } from "@trpc/server/adapters/next";
import { routers, AppRouter } from "~/server/routers";

export default createNextApiHandler<AppRouter>({
  router: routers,
  onError({ error }) {
    console.log("[error]", error);
  },
  batching: {
    enabled: true,
  },
});
