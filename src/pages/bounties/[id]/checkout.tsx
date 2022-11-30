import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/main/Layout";
import { trpc } from "../../../utils/trpc";
import SpinningCircle from "../../../components/SpinningCircle";

const PROCESSING_FEE = 0.03;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Checkout() {
  const [processing, setProcessing] = useState(false);
  const id = useRouter().query.id as string;
  const bountyQuery = trpc.bounty?.byId.useQuery({ id });
  const { data: bounty } = bountyQuery;

  const totalPrice =
    Number(bounty?.price) * PROCESSING_FEE + Number(bounty?.price);
  return (
    <Layout>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="text-2xl text-gray-600">Bounty Summary</h2>

            <div className="mt-10 flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                <li key={bounty?.id} className="flex space-x-6 py-6">
                  <img
                    src={bounty?.coverPhoto}
                    className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                  />
                  <div className="flex-auto">
                    <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                      <div className="flex-auto space-y-1 text-sm font-medium">
                        <h3 className="text-gray-900">
                          <a href="#">{bounty?.title}</a>
                        </h3>
                        <p className="text-gray-900">${bounty?.price}</p>
                        <p className="hidden text-gray-500 sm:block">
                          {bounty?.category?.title}
                        </p>
                      </div>
                      <div className="flex flex-none space-x-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">${bounty?.price}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Processing Fee</dt>
                <dd className="text-gray-900">
                  ${Number(bounty?.price) * 0.03}
                </dd>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${totalPrice}</dd>
              </div>
              <button
                onClick={() => {
                  setProcessing(true);
                  fetch("http://localhost:3000/api/create-checkout-session", {
                    method: "POST",
                    body: JSON.stringify({ bounty }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      window.location.href = data.session.url;
                    });
                }}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={processing}
              >
                {processing ? <SpinningCircle /> : <></>}
                <span>Pay with Stripe</span>
              </button>
            </dl>
          </div>
        </main>
      </div>
    </Layout>
  );
}
