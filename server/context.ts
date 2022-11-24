import ws from "ws";
import { IncomingMessage } from "http";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import prisma from "~/prisma";

export async function createContext(
  opts:
    | CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) {
  return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
