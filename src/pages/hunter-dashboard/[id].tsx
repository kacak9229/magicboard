import { useState } from "react";
import Layout from "../../components/main/Layout";
import HunterTabs from "../../components/hunters/HunterTabs";
import Timeline from "../../components/hunters/Timeline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { formatDate } from "../../utils/date";
import StatusBadge from "../../components/StatusBadge";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorPage from "../../components/main/404";
import Skeleton from "../../components/main/Skeleton";

export default function Bounty() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const hunterId = session?.user?.hunterId;

  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const missionQuery = trpc.hunter?.byMission.useQuery({
    hunterId: session?.user?.hunterId,
    bountyId: String(id),
  });

  const { data: mission, isLoading, isError } = missionQuery;

  const fileQuery = trpc.hunter?.byFiles.useQuery({
    hunterId: session?.user?.hunterId,
    missionId: String(mission?.id),
  });
  const { data: files } = fileQuery;

  const isHunter = mission?.hunterId === session?.user?.hunterId;

  const isPoster = mission?.bounty?.userId === session?.user?.id;

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Layout>
      <div className="min-h-full bg-gray-50">
        {showAlert ? (
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:py-5">
            <SuccessAlert title={"Successfully Delivered"} />
          </div>
        ) : null}

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
                  Dateline - {formatDate(mission?.bounty?.dateline)}
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
                setShowAlert={setShowAlert}
                processing={processing}
                setProcessing={setProcessing}
                hunterId={mission?.hunterId}
                mission={mission}
                isHunter={isHunter}
                isPoster={isPoster}
                files={files}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
