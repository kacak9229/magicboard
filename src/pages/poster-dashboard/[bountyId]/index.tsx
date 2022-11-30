import Link from "next/link";
import Layout from "../../../components/main/Layout";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";
import { formatDate } from "../../../utils/date";
import Skeleton from "../../../components/main/Skeleton";
import ErrorPage from "../../../components/main/404";

export default function Bounty() {
  const { data: session } = useSession();
  const id = useRouter().query.bountyId as string;
  const bountyQuery = trpc.posterBounty?.byId.useQuery({
    id: id,
    userId: session?.user!.id,
  });
  const { data: bounty, isError, isLoading } = bountyQuery;

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {bounty?.title}
                </h1>
                <span className="text-3xl tracking-tight text-gray-900">
                  ${bounty?.price}
                </span>
                <p className="mt-8 text-sm font-medium text-gray-500">
                  Dateline -{" "}
                  <time dateTime="2020-08-25">
                    {" "}
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                      {formatDate(bounty?.dateline)}
                    </span>
                  </time>
                </p>
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3"
            >
              {bounty?.hunters.map((hunter) => (
                <Link
                  href={`${bounty.id}/hunter/${hunter?.id}`}
                  key={bounty.id}
                >
                  <a>
                    <li key={hunter?.id}>
                      <div className="space-y-6">
                        <img
                          className="h-30 w-30 xl:h-30 xl:w-30 mx-auto rounded-full"
                          src={hunter?.user?.image || ""}
                          alt=""
                        />
                        <div className="space-y-2">
                          <div className="space-y-1 text-lg font-medium leading-6">
                            <h3>{hunter?.user!.name}</h3>
                            <p className="text-indigo-600">
                              {hunter?.occupation}
                            </p>
                          </div>
                          <ul
                            role="list"
                            className="flex justify-center space-x-5"
                          >
                            <li>
                              <a
                                href={hunter!.githubLink || "#"}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Github</span>
                                <svg
                                  className="h-10 w-10"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
