import BountiesTable from "../../components/hunters/BountiesTable";
import StatsCard from "../../components/hunters/StatsCard";
import Layout from "../../components/main/Layout";

export default function HunterDashboard() {
  return (
    <Layout>
      <StatsCard />
      <BountiesTable />
    </Layout>
  );
}
