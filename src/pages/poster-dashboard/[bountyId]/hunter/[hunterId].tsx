import Layout from "../../../../components/main/Layout";
import HunterTabs from "../../../../components/hunters/HunterTabs";
import Timeline from "../../../../components/hunters/Timeline";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { formatDate } from "../../../../utils/date";
import StatusBadge from "../../../../components/StatusBadge";
import Skeleton from "../../../../components/main/Skeleton";
import ErrorPage from "../../../../components/main/404";

export default function Bounty() {
  const { data: session } = useSession();
  const { bountyId, hunterId } = useRouter().query;

  const missionQuery = trpc.posterBounty?.byMission.useQuery({
    hunterId: String(hunterId),
    bountyId: String(bountyId),
    userId: session?.user?.id,
  });
  const { data: mission, isError, isLoading } = missionQuery;

  const acceptBounty = trpc.posterBounty.acceptBounty.useMutation();

  const isHunter = mission?.hunterId === session?.user?.hunterId;

  const isPoster = mission?.bounty?.userId === session?.user?.id;

  const onAcceptBounty = async () => {
    const acceptedBounty = await acceptBounty.mutateAsync({
      bountyId: String(bountyId),
      missionId: String(mission?.id),
      hunterId: String(hunterId),
    });

    if (acceptedBounty.status) {
      Router.push("/poster-dashboard");
    }
  };

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Layout>
      <div className="min-h-full bg-gray-50">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src="https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg"
                    alt=""
                  />
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {mission?.bounty?.title}
                  <span className="pl-1">
                    <StatusBadge
                      status={mission?.missionStatus}
                      statusType="mission"
                    />
                  </span>
                </h1>{" "}
                <p className="text-sm font-medium text-gray-500">
                  Dateline -{" "}
                  <time dateTime="2020-08-25">
                    {" "}
                    <a href="#" className="text-gray-900">
                      {formatDate(mission?.bounty?.dateline)}
                    </a>
                  </time>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <HunterTabs mission={mission} />
            </div>
            <div className="mt-20">
              <Timeline
                files={mission?.file}
                mission={mission}
                hunterName={String(mission?.hunter?.user?.name)}
                isHunter={isHunter}
                isPoster={isPoster}
                onAcceptBounty={() => onAcceptBounty()}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
