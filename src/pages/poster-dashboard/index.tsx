import BountiesTable from "../../components/posters/BountiesTable";
import Layout from "../../components/main/Layout";
import { trpc } from "../../utils/trpc";
import { useSession, signOut } from "next-auth/react";

export default function PosterDashboard() {
  const { data: session } = useSession();

  const posterBountiesQuery = trpc.posterBounty.list.useInfiniteQuery(
    {
      userId: session?.user!.id,
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
      <BountiesTable bountiesQuery={posterBountiesQuery} />
    </Layout>
  );
}
