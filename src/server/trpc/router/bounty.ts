import { router, publicProcedure } from "../trpc";
import { Prisma, PaymentStatus } from "@prisma/client";
import { prisma } from "../../db/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const bountyRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        category: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor, category } = input;

      let whereClause: any = { paymentStatus: PaymentStatus.PAID };

      console.log("Where clause", whereClause);

      if (category) {
        whereClause = { ...whereClause, categoryId: category };
      }

      console.log("Where clause after", whereClause);

      const bounties = await prisma.bounty.findMany({
        take: limit + 1,
        where: whereClause,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (bounties.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = bounties.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        bounties: bounties.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const bounty = await prisma.bounty.findUnique({
        where: { id },
        include: {
          hunters: {
            include: {
              user: true,
            },
          },
          category: true,
          user: true,
        },
      });

      if (!bounty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return bounty;
    }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(32),
        categoryId: z.string(),
        coverPhoto: z.string(),
        dateline: z.date(),
        price: z.number(),
        requirement: z.string(),
        maxHunters: z.number(),
        userId: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        title,
        coverPhoto,
        dateline,
        price,
        requirement,
        maxHunters,
        categoryId,
        userId,
      } = input;

      const bounty = await prisma.bounty.create({
        data: {
          title: title,
          coverPhoto: coverPhoto,
          dateline: dateline,
          price: price,
          requirement: requirement,
          maxHunters: maxHunters,
          category: {
            connect: {
              id: categoryId,
            },
          },
          user: {
            connect: {
              id: userId!,
            },
          },
        },
      });
      return bounty;
    }),
});
