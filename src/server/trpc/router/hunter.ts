import { router, publicProcedure, protectedProcedure } from "../trpc";
import { MissionStatus, Prisma } from "@prisma/client";
import { prisma } from "../../db/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { EmailType, sendEmail } from "../../../utils/mail";

export const hunterRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        hunterId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor, hunterId } = input;

      const missions = await prisma.mission.findMany({
        take: limit + 1,
        where: { hunterId: hunterId },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          bounty: {
            include: {
              hunters: true,
              category: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (missions.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = missions.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        missions: missions.reverse(),
        nextCursor,
      };
    }),
  signup: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        occupation: z.string(),
        githubLink: z.string(),
        designLink: z.string(),
        paypalEmail: z.string(),
        websitePortfolio: z.string(),
        userId: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        occupation,
        githubLink,
        designLink,
        paypalEmail,
        websitePortfolio,
        userId,
      } = input;

      const foundHunter = await prisma.hunter.findFirst({
        where: {
          userId: userId,
        },
      });

      if (foundHunter) {
        return foundHunter;
      }

      const createdHunter = await prisma.hunter.create({
        data: {
          title: "",
          occupation: occupation,
          githubLink: githubLink,
          designLink: designLink,
          paypalEmail: paypalEmail,
          websitePortfolio: websitePortfolio,
          user: {
            connect: { id: userId! },
          },
        },
      });
      return createdHunter;
    }),
  huntBounty: protectedProcedure
    .input(
      z.object({
        bountyId: z.string().nullish(),
        hunterId: z.string().nullish(),
        userId: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const { bountyId, hunterId, userId } = input;

      const bountyOwner = await prisma.bounty.findFirst({
        where: {
          userId: userId,
        },
      });

      if (bountyOwner) {
        return {
          status: false,
          message: "You can't hunt your own bounty",
        };
      }

      const foundMission = await prisma.mission.findFirst({
        where: {
          bountyId: bountyId!,
          hunterId: hunterId!,
        },
      });

      if (foundMission) {
        return {
          status: false,
          message: "Already joined this bounty",
        };
      }

      const updateBounty = await prisma.bounty.update({
        where: {
          id: bountyId!,
        },
        data: {
          hunters: {
            connect: {
              id: hunterId!,
            },
          },
          mission: {
            create: {
              hunter: {
                connect: { id: hunterId! },
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      if (!updateBounty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Cant create mission with '${bountyId}'`,
        });
      }

      const foundHunter = await prisma.hunter.findUnique({
        where: {
          id: hunterId!,
        },
        include: {
          user: true,
        },
      });

      const bountyLink = `${process.env.NEXTAUTH_URL!}/poster-dashboard/${
        updateBounty?.id
      }/hunter/${foundHunter?.id}`;

      sendEmail(
        updateBounty.title,
        String(updateBounty.user?.name),
        String(updateBounty.user?.email),
        EmailType.JOIN_BOUNTY,
        String(foundHunter?.user?.name),
        bountyLink
      );

      return {
        status: true,
        updatedBounty: updateBounty,
      };
    }),
  byMission: protectedProcedure
    .input(
      z.object({
        hunterId: z.string().nullish(),
        bountyId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { hunterId, bountyId } = input;

      if (!hunterId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Cant find bounty`,
        });
      }

      const mission = await prisma.mission.findUnique({
        where: {
          id: bountyId!,
        },
        include: {
          bounty: {
            include: {
              category: true,
            },
          },
          file: true,
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
  byFiles: protectedProcedure
    .input(
      z.object({
        hunterId: z.string().nullish(),
        missionId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { hunterId, missionId } = input;

      if (hunterId) {
        const files = await prisma.file.findMany({
          where: {
            missionId: missionId!,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return files;
      }
    }),
  uploadFile: protectedProcedure
    .input(
      z.object({
        missionId: z.string().nullish(),
        hunterId: z.string().nullish(),
        fileName: z.string(),
        fileUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { missionId, hunterId, fileName, fileUrl } = input;

      if (hunterId) {
        const completedTransaction = await prisma.$transaction([
          prisma.file.create({
            data: {
              fileName: fileName,
              fileUrl: fileUrl,
              mission: {
                connect: {
                  id: missionId!,
                },
              },
            },
          }),
          prisma.mission.update({
            where: {
              id: missionId!,
            },
            data: {
              missionStatus: MissionStatus.DELIVERED,
            },
          }),
        ]);

        if (!completedTransaction) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Cant upload file`,
          });
        }

        const mission = await prisma.mission.findUnique({
          where: {
            id: missionId!,
          },
          include: {
            bounty: { include: { user: true } },
            hunter: { include: { user: true } },
          },
        });

        const bountyLink = `${process.env.NEXTAUTH_URL!}/poster-dashboard/${
          mission?.bounty?.id
        }/hunter/${mission?.hunter?.id}`;

        if (mission?.missionStatus === MissionStatus.DELIVERED) {
          sendEmail(
            mission?.bounty?.title,
            String(mission.bounty?.user?.name),
            String(mission?.bounty?.user?.email),
            EmailType.DELIVERY,
            String(mission?.hunter?.user?.name),
            bountyLink
          );
        }

        return {
          status: true,
          createFileByMission: completedTransaction,
        };
      }
    }),
});
