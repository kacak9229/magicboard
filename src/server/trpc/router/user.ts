import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { z } from "zod";

export const userRouter = router({
  profile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;

      const user = await prisma.user.findUnique({
        where: {
          id: userId!,
        },
        include: {
          hunter: true,
        },
      });

      return user;
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        githubLink: z.string(),
        designLink: z.string(),
        paypalEmail: z.string(),
        websitePortfolio: z.string(),
        userId: z.string().nullish(),
        hunterId: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        name,
        title,
        githubLink,
        designLink,
        paypalEmail,
        websitePortfolio,
        userId,
        hunterId,
      } = input;

      if (name) {
        await prisma.user.update({
          where: {
            id: userId!,
          },
          data: {
            name: name,
          },
        });
      }

      if (hunterId) {
        let data = {};

        if (title) {
          data = { title: title };
        }
        if (githubLink) {
          data = { ...data, githubLink: githubLink };
        }

        if (designLink) {
          data = { ...data, designLink: designLink };
        }

        if (paypalEmail) {
          data = { ...data, paypalEmail: paypalEmail };
        }

        if (websitePortfolio) {
          data = { ...data, websitePortfolio: websitePortfolio };
        }

        await prisma.hunter.update({
          where: {
            id: hunterId!,
          },
          data: data,
        });
      }

      return;
    }),
});
