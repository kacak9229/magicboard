import { useState } from "react";
import { trpc } from "../../utils/trpc";
import BountyList from "../../components/BountyList";
import Layout from "../../components/main/Layout";

export default function Bounties() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const categoriesQuery = trpc.category.list.useQuery();
  const bountiesQuery = trpc.bounty.list.useInfiniteQuery(
    {
      limit: 10,
      category: categoryFilter,
    },
    {
      getNextPageParam(lastPage: any) {
        return lastPage?.nextCursor;
      },
      getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
    }
  );

  return (
    <Layout>
      <main>
        <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Hunt Bounties and</span>{" "}
            <span className="block text-indigo-600 xl:inline">Earn Money</span>{" "}
          </h1>
        </div>
        <BountyList
          bountiesQuery={bountiesQuery}
          setCategoryFilter={setCategoryFilter}
          categoryFilter={categoryFilter}
          categories={categoriesQuery.data}
        />
      </main>
    </Layout>
  );
}
