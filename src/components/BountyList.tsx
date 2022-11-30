import { Bounty } from "@prisma/client";
import BountyCard from "./BountyCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./main/Pagination";

interface Props {
  homePage?: boolean;
  bountiesQuery: any;
  setCategoryFilter?: any;
  categoryFilter?: string;
  categories?: any;
}

export default function BountyList({
  homePage = false,
  bountiesQuery,
  setCategoryFilter,
  categoryFilter,
  categories,
}: Props) {
  const pages = bountiesQuery.data?.pages;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {homePage ? (
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-2xl font-medium text-gray-900">Hot Bounties</h2>
            <a
              href="/bounties"
              className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        ) : (
          <CategoryFilter
            setCategoryFilter={setCategoryFilter}
            categoryFilter={categoryFilter}
            categories={categories}
          />
        )}
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {pages?.map((page: any, index: any) => (
            <>
              {page.bounties.map((bounty: any) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </>
          ))}
        </div>
        <div className="mt-10">
          <Pagination
            nextPage={() => bountiesQuery.fetchNextPage()}
            previousPage={() => bountiesQuery.fetchPreviousPage()}
          />
        </div>
      </div>
    </div>
  );
}
