import Layout from "./Layout";

function SkeletonCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border border-blue-100 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-200"></div>
              <div className="col-span-1 h-2 rounded bg-slate-200"></div>
            </div>
            <div className="h-2 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const twentySkeletonCards = [1, 2, 3, 4, 6, 7, 8, 9];

export default function Skeleton() {
  return (
    <Layout>
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-20 h-screen">
          <div className="grid grid-flow-col grid-rows-3 gap-4">
            {twentySkeletonCards.map((skel) => (
              <SkeletonCard key={skel} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
