import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { BountyStatus, MissionStatus } from "@prisma/client";
import { sendEmail, EmailType } from "../../../utils/mail";

export const posterBountyRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        userId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor, userId } = input;

      const bounties = await prisma.bounty.findMany({
        take: limit + 1,
        where: { userId },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "asc",
        },
        include: {
          category: true,
          hunters: true,
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
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { id, userId } = input;
      const bounty = await prisma.bounty.findFirst({
        where: { id: id, userId: userId },
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
  byMission: protectedProcedure
    .input(
      z.object({
        hunterId: z.string().nullish(),
        bountyId: z.string().nullish(),
        userId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { hunterId, bountyId, userId } = input;

      const mission = await prisma.mission.findFirst({
        where: {
          bountyId: bountyId!,
          hunterId: hunterId!,
          bounty: {
            userId: userId!,
          },
        },
        include: {
          bounty: {
            include: {
              category: true,
            },
          },
          file: true,
          hunter: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!mission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Cant find bounty`,
        });
      }
      return mission;
    }),
  acceptBounty: protectedProcedure
    .input(
      z.object({
        bountyId: z.string(),
        missionId: z.string(),
        hunterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { bountyId, missionId, hunterId } = input;

      const completedTransaction = await prisma.$transaction([
        prisma.mission.updateMany({
          where: {
            bountyId: bountyId,
            NOT: {
              id: missionId,
              hunterId: hunterId,
            },
          },
          data: {
            missionStatus: MissionStatus.DECLINED,
          },
        }),
        prisma.mission.update({
          where: {
            id: missionId,
          },
          data: {
            missionStatus: MissionStatus.ACCEPTED,
          },
        }),
        prisma.bounty.update({
          where: {
            id: bountyId,
          },
          data: {
            bountyStatus: BountyStatus.COMPLETED,
          },
        }),
      ]);

      if (!completedTransaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Some issues with accepting bounty`,
        });
      }

      //TODO: can optimize further by using rabbit mq or redis in the future
      const missions = await prisma.mission.findMany({
        where: {
          bountyId: bountyId,
        },
        include: { hunter: { include: { user: true } }, bounty: true },
      });

      for (let i = 0; i < missions.length; i++) {
        const mission = missions[i];
        const bountyTitle = mission?.bounty?.title;
        const hunterEmail = String(mission?.hunter?.user?.email);
        const username = String(mission?.hunter?.user?.name);
        const bountyLink = `${process.env.NEXTAUTH_URL!}/hunter-dashboard/${
          mission?.id
        }`;

        if (mission?.missionStatus === MissionStatus.ACCEPTED) {
          sendEmail(
            bountyTitle,
            username,
            hunterEmail,
            EmailType.ACCEPTED,
            bountyLink
          );
        } else if (mission?.missionStatus === MissionStatus.DECLINED) {
          sendEmail(
            bountyTitle,
            username,
            hunterEmail,
            EmailType.DECLINED,
            bountyLink
          );
        }
      }

      return {
        status: true,
        message: "Successfully accepted this bounty",
      };
    }),
});
