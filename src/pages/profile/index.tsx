import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import SpinningCircle from "../../components/SpinningCircle";
import Layout from "../../components/main/Layout";
import { trpc } from "../../utils/trpc";
import Router from "next/router";
import SuccessAlert from "../../components/SuccessAlert";

const jobs = [
  { id: 1, title: "Developer" },
  { id: 2, title: "Designer" },
  { id: 3, title: "Writer" },
];

export default function Profile() {
  const { register, watch, handleSubmit } = useForm();
  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();

  const userQuery = trpc.user?.profile.useQuery({
    userId: String(session?.user?.id),
  });

  const { data: user } = userQuery;

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const userUpdateProfile = trpc.user.updateProfile.useMutation();

  const onSubmit = async (data: any) => {
    const input = {
      name: data.name,
      title: "",
      githubLink: data.githubLink || "",
      designLink: data.designLink || "",
      paypalEmail: data.paypalEmail,
      websitePortfolio: data.websitePortfolio,
      userId: session?.user?.id,
      hunterId: session?.user?.hunterId,
    };

    try {
      await userUpdateProfile.mutateAsync(input);

      reloadSession();

      setShowAlert(true);
    } catch (err) {
      console.error({ err }, "Failed to update profile");
    }
  };

  return (
    <Layout>
      <div className="flex-1 xl:overflow-y-auto">
        <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
          {showAlert ? (
            <SuccessAlert title="Successfully updated profile" />
          ) : (
            <></>
          )}

          <h1 className="text-blue-gray-900 mt-5 text-3xl font-bold tracking-tight">
            Account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y"
          >
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-blue-gray-900 text-xl font-medium">
                  Profile
                </h2>
                <p className="text-blue-gray-500 mt-1 text-sm">
                  Update your information
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-blue-gray-900 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="first-name"
                  autoComplete="given-name"
                  className="border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder={String(user?.name)}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-blue-gray-900 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md bg-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder={String(user?.email)}
                  disabled
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="text-blue-gray-900 block text-sm font-medium"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <img
                    className="inline-block h-12 w-12 rounded-full"
                    src={String(user?.image)}
                    alt=""
                  />
                  {/* <div className="ml-4 flex">
                    <div className="border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                      <label
                        htmlFor="user-photo"
                        className="text-blue-gray-900 pointer-events-none relative text-sm font-medium"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:ring-offset-blue-gray-50 ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Remove
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            {user?.hunter ? (
              <div className="">
                <div className="mt-3 sm:col-span-6">
                  <h2 className="text-blue-gray-900 text-xl font-medium">
                    Hunter Information
                  </h2>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mt-5 block text-sm font-medium text-gray-700"
                  >
                    Your Job
                  </label>
                  <div>
                    <input
                      type="text"
                      id="mobile-or-email"
                      placeholder={String(user?.hunter.occupation)}
                      disabled
                      className="block w-full rounded-md border-gray-300 bg-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {user.hunter.occupation === "Developer" ? (
                  <div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Github Link{" "}
                      </label>
                      <input
                        type="text"
                        {...register("githubLink")}
                        id="mobile-or-email"
                        placeholder={String(user?.hunter.githubLink)}
                        disabled
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {user.hunter.occupation === "Designer" ? (
                  <div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Behance / Dribbble Link{" "}
                      </label>
                      <input
                        type="text"
                        {...register("designLink")}
                        id="mobile-or-email"
                        placeholder={String(user?.hunter.designLink)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div>
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Paypal Email{" "}
                      <span className="text-xs text-gray-500">
                        - How you get paid
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("paypalEmail")}
                      id="mobile-or-email"
                      placeholder={String(user?.hunter.paypalEmail)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Website Portfolio{" "}
                    </label>
                    <input
                      type="text"
                      {...register("websitePortfolio")}
                      id="mobile-or-email"
                      placeholder={String(user?.hunter.websitePortfolio)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* <p className="text-blue-gray-500 text-sm sm:col-span-6">
                  This account was created on{" "}
                  <time dateTime="2017-01-05T20:35:40">
                    January 5, 2017, 8:35:40 PM
                  </time>
                  .
                </p> */}
              </div>
            ) : (
              <></>
            )}

            <div className="flex justify-end pt-8">
              <button
                type="button"
                className="text-blue-gray-900 hover:bg-blue-gray-50 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {processing ? <SpinningCircle /> : <></>}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
