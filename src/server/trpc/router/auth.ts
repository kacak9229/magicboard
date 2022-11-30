import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const userResponse = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return userResponse;
  }),
});
