import Layout from "../../../../components/main/Layout";
import HunterTabs from "../../../../components/hunters/HunterTabs";
import Timeline from "../../../../components/hunters/Timeline";

export default function Bounty() {
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
                  Create an Uber clone logo
                  <span className="m-1 inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
                    In Progress
                  </span>
                </h1>{" "}
                <p className="text-sm font-medium text-gray-500">
                  Dateline -{" "}
                  <time dateTime="2020-08-25">
                    {" "}
                    <a href="#" className="text-gray-900">
                      August 25, 2020{" "}
                    </a>
                  </time>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <HunterTabs />
            </div>
            <div className="mt-20">
              <Timeline />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
