import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { procedure, router } from "~/server/trpc";

const numbers = procedure
  .input(z.object({ start: z.number() }))
  .subscription(({ input }) => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(input.start + Math.random());
      }, 500);

      return () => {
        clearInterval(int);
        console.log("[stop]", input.start);
      };
    });
  });

const users = procedure.query(async ({ ctx }) => {
  console.log("okokok");
  console.log(await ctx.prisma.user.findMany());
  return await ctx.prisma.user.findMany();
});

export const routers = router({
  hello: procedure.input(z.object({ text: z.string() })).query(({ input }) => {
    console.log("hello");
    return {
      greetinaaga: `hello ${input.text}`,
    };
  }),
  numbers,
  users,
});

export type AppRouter = typeof routers;
