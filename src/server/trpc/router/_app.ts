// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { bountyRouter } from "./bounty";
import { categoryRouter } from "./category";
import { hunterRouter } from "./hunter";
import { posterBountyRouter } from "./poster-bounty";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  bounty: bountyRouter,
  hunter: hunterRouter,
  category: categoryRouter,
  posterBounty: posterBountyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
