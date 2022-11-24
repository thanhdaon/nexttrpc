import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "~/prisma";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: "1045374138086342868",
      clientSecret: "dDSk5guAixZwo9nK5-neQebR3yn1EBxT",
    }),
  ],
  callbacks: {
    session({ session }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
