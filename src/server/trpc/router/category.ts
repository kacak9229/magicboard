import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const categoryRouter = router({
  list: publicProcedure.query(async () => {
    const categories = await prisma.category.findMany({});

    return categories;
  }),
});
