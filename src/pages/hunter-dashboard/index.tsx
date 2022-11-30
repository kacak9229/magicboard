import { useSession } from "next-auth/react";
import BountiesTable from "../../components/hunters/BountiesTable";
import EmptyBounties from "../../components/hunters/EmptyBounties";
import StatsCard from "../../components/hunters/StatsCard";
import Layout from "../../components/main/Layout";
import { trpc } from "../../utils/trpc";

export default function HunterDashboard() {
  const { data: session } = useSession();

  const bountiesQuery = trpc.hunter.list.useInfiniteQuery(
    {
      hunterId: session?.user!.hunterId,
      limit: 10,
    },
    {
      getNextPageParam(lastPage: any) {
        return lastPage?.nextCursor;
      },
      getPreviousPageParam: (firstPage: any, pages: any) =>
        firstPage.prevCursor,
    }
  );

  return (
    <Layout>
      <StatsCard />
      {bountiesQuery?.data ? (
        <BountiesTable bountiesQuery={bountiesQuery} />
      ) : (
        <EmptyBounties />
      )}
    </Layout>
  );
}
