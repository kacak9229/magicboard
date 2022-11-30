import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import HeroSection from "../components/HeroSection";
import BountyList from "../components/BountyList";
import CompanyLogo from "../components/CompanyLogo";
import Testimonials from "../components/Testimonials";
import Footer from "../components/main/Footer";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const bountiesQuery = trpc.bounty.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage?.nextCursor;
      },
    }
  );
  return (
    <>
      <HeroSection />
      <BountyList homePage={true} bountiesQuery={bountiesQuery} />
      <CompanyLogo />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
