import BountyList from "../../components/BountyList";
import Layout from "../../components/main/Layout";

export default function Bounties() {
  return (
    <Layout>
      <main>
        <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">
              Top Bounties that you can hunt
            </span>{" "}
            <span className="block text-indigo-600 xl:inline">right now</span>
          </h1>
        </div>
        <BountyList />
      </main>
    </Layout>
  );
}
