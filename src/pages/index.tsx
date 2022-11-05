import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import HeroSection from "../components/HeroSection";
import BountyList from "../components/BountyList";
import CompanyLogo from "../components/CompanyLogo";
import Testimonials from "../components/Testimonials";
import Footer from "../components/main/Footer";

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <BountyList homePage={true} />
      <CompanyLogo />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
